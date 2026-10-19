import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

/**
 * Layout route that blocks the admin area for anyone who is not signed in
 * with the admin role. Sits inside the ProtectedRoute wrapper, so users are
 * already authenticated; this enforces the admin role on top.
 */
export default function AdminRoleRoute() {
  const { user, isLoadingAuth, authChecked } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingAuth && authChecked && user && user.role !== "admin") {
      navigate("/portal", { replace: true });
    }
  }, [isLoadingAuth, authChecked, user, navigate]);

  if (isLoadingAuth || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0077b6] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}