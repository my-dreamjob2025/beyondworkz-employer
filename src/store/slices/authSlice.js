import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, {
  setAccessToken,
  setRefreshToken,
  clearTokens,
  getRefreshToken,
} from "../../services/api";

const initialState = {
  user: null,
  loading: true,
};

export const initAuth = createAsyncThunk("auth/init", async (_, { rejectWithValue }) => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      return null;
    }

    const { data } = await api.post("/auth/refresh", {
      refreshToken,
      panel: "employer",
    });

    if (data.success && data.accessToken) {
      setAccessToken(data.accessToken);
      let user = data.user;
      if (user?.role === "employer") {
        try {
          const me = await api.get("/employer/me");
          if (me.data.success && me.data.user) {
            user = { ...me.data.user, companyProfile: me.data.companyProfile };
          }
        } catch {
          // keep refresh payload if /me fails
        }
      }
      return user;
    }

    clearTokens();
    return null;
  } catch {
    clearTokens();
    return rejectWithValue();
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const refreshToken = getRefreshToken();
    await api.post("/auth/logout", {
      refreshToken,
      panel: "employer",
    });
  } catch {
    // Proceed even if server call fails
  } finally {
    clearTokens();
  }
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken || null);
      state.user = user;
      state.loading = false;
    },
    updateUserFields: (state, action) => {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(initAuth.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { login, updateUserFields } = authSlice.actions;
export default authSlice.reducer;
