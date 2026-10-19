import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';

// Public
import PublicLayout from '@/components/JTG/PublicLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Plans from './pages/Plans';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Complaints from './pages/Complaints';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Apply from './pages/Apply';

// Auth
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Member portal
import MemberLayout from '@/components/JTG/MemberLayout';
import LinkPolicy from './pages/portal/LinkPolicy';
import MemberDashboard from './pages/portal/MemberDashboard';
import MyPolicy from './pages/portal/MyPolicy';
import Beneficiaries from './pages/portal/Beneficiaries';
import SchemeMembers from './pages/portal/SchemeMembers';
import SubmitClaim from './pages/portal/SubmitClaim';
import ClaimStatus from './pages/portal/ClaimStatus';
import PaymentHistory from './pages/portal/PaymentHistory';
import MemberProfile from './pages/portal/MemberProfile';

// Admin portal
import AdminLayout from '@/components/JTG/AdminLayout';
import AdminRoleRoute from '@/components/JTG/AdminRoleRoute';
import AdminReports from './pages/admin/AdminReports';
import AdminApplications from './pages/admin/AdminApplications';
import AdminMembers from './pages/admin/AdminMembers';
import AdminClaims from './pages/admin/AdminClaims';
import AdminBeneficiaryRequests from './pages/admin/AdminBeneficiaryRequests';
import AdminPremiums from './pages/admin/AdminPremiums';
import AdminSettings from './pages/admin/AdminSettings';
import AdminPlans from './pages/admin/AdminPlans';
import AdminFaqs from './pages/admin/AdminFaqs';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminPartners from './pages/admin/AdminPartners';
import AdminSectionCopy from './pages/admin/AdminSectionCopy';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError?.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/apply" element={<Apply />} />
      </Route>

      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected: member + admin portals */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/portal/link" element={<LinkPolicy />} />
        <Route element={<MemberLayout />}>
          <Route path="/portal" element={<MemberDashboard />} />
          <Route path="/portal/policy" element={<MyPolicy />} />
          <Route path="/portal/beneficiaries" element={<Beneficiaries />} />
          <Route path="/portal/scheme-members" element={<SchemeMembers />} />
          <Route path="/portal/submit-claim" element={<SubmitClaim />} />
          <Route path="/portal/claims" element={<ClaimStatus />} />
          <Route path="/portal/payments" element={<PaymentHistory />} />
          <Route path="/portal/profile" element={<MemberProfile />} />
        </Route>
        <Route element={<AdminRoleRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminReports />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/claims" element={<AdminClaims />} />
            <Route path="/admin/beneficiary-requests" element={<AdminBeneficiaryRequests />} />
            <Route path="/admin/premiums" element={<AdminPremiums />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/plans" element={<AdminPlans />} />
            <Route path="/admin/faqs" element={<AdminFaqs />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/section-copy" element={<AdminSectionCopy />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App