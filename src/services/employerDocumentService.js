import api from "./api";

const MAX_SIZE_MB = 10;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

function validateFile(file) {
  if (!file) throw new Error("No file selected");
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Use a PDF, JPEG, PNG, or WebP file");
  }
  if (file.size > MAX_BYTES) {
    throw new Error(`File too large. Max ${MAX_SIZE_MB}MB`);
  }
}

export const employerDocumentService = {
  getPresign: async (docType, fileName, contentType, fileSize) => {
    const { data } = await api.post("/employer/company/documents/presign", {
      docType,
      fileName,
      contentType,
      fileSize,
    });
    return data;
  },

  uploadToS3: async (uploadUrl, file) => {
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
  },

  confirm: async (docType, key, url, size, contentType, fileName) => {
    const { data } = await api.post("/employer/company/documents/confirm", {
      docType,
      key,
      url,
      size,
      contentType,
      fileName,
    });
    return data;
  },

  uploadDirect: async (docType, file) => {
    const formData = new FormData();
    formData.append("document", file);
    const { data } = await api.post(`/employer/company/documents/${docType}/upload`, formData, {
      headers: { "Content-Type": false },
    });
    return data;
  },

  uploadDocument: async (docType, file) => {
    validateFile(file);
    try {
      const presignRes = await employerDocumentService.getPresign(
        docType,
        file.name,
        file.type,
        file.size
      );
      if (presignRes?.useDirectUpload || presignRes?.success === false) {
        throw new Error("USE_DIRECT");
      }
      const { uploadUrl, key, url } = presignRes;
      await employerDocumentService.uploadToS3(uploadUrl, file);
      return employerDocumentService.confirm(docType, key, url, file.size, file.type, file.name);
    } catch (err) {
      if (
        err.response?.status === 503 ||
        err.response?.data?.useDirectUpload ||
        err.message === "USE_DIRECT"
      ) {
        return employerDocumentService.uploadDirect(docType, file);
      }
      throw err;
    }
  },
};
