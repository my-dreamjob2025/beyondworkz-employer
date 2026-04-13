import { useState } from "react";
import { Outlet } from "react-router-dom";
import EmployerSidebar from "../components/layout/EmployerSidebar";
import EmployerHeader from "../components/layout/EmployerHeader";
import EmployerVerificationBanner from "../components/dashboard/EmployerVerificationBanner";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <EmployerHeader onMenuClick={() => setMobileSidebarOpen(true)} />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <EmployerSidebar
          mobileOpen={mobileSidebarOpen}
          onMobileOpenChange={setMobileSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 min-w-0">
          <EmployerVerificationBanner companyProfile={user?.companyProfile} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
