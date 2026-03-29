import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import FinchLoadingPage from '@/components/FinchLoadingPage';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
// Add page imports here
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Analytics from './pages/Analytics';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Profile from './pages/Profile';

const ScrollToTop = () => {
  const { pathname, search, key } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname, search, key]);

  return null;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const [showSlowLoader, setShowSlowLoader] = useState(false);
  const isBootLoading = isLoadingPublicSettings || isLoadingAuth;

  useEffect(() => {
    if (!isBootLoading) {
      setShowSlowLoader(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowSlowLoader(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [isBootLoading]);

  // Show loading spinner while checking app public settings or auth
  if (isBootLoading) {
    if (showSlowLoader) {
      return <FinchLoadingPage />;
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Allow public access — do not force redirect
      // navigateToLogin();
      // return null;
    }
  }

  // Render the main app
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add your page Route elements here */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};


function App() {
  const configuredBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';
  const isConfiguredBaseActive =
    configuredBase !== '/' &&
    (window.location.pathname === configuredBase ||
      window.location.pathname.startsWith(`${configuredBase}/`));
  const routerBase = isConfiguredBaseActive ? configuredBase : '/';

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router basename={routerBase}>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App