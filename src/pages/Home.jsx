import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ChatHero from '../components/ChatHero';
import FeatureCards from '../components/FeatureCards';
import ChromeExtensionSection from '../components/ChromeExtensionSection';
import SocialShareSection from '../components/SocialShareSection';
import HowItWorksNew from '../components/HowItWorksNew';
import TimeSavedCalculator from '../components/TimeSavedCalculator';
import NumbersSection from '../components/NumbersSection';
import FreemiumSection from '../components/FreemiumSection';
import PricingPreview from '../components/PricingPreview';
import FAQSection from '../components/FAQSection';
import WaitlistSection from '../components/WaitlistSection';
import FinchFooter from '../components/FinchFooter';
import SignupModal from '../components/SignupModal';
import { ACCOUNT_EVENT, isLoggedIn } from '@/lib/local-account';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [pendingPrompt, setPendingPrompt] = useState('');
  const [hasSignedUp, setHasSignedUp] = useState(() => isLoggedIn());

  useEffect(() => {
    const sync = () => setHasSignedUp(isLoggedIn());
    window.addEventListener(ACCOUNT_EVENT, sync);
    return () => window.removeEventListener(ACCOUNT_EVENT, sync);
  }, []);

  const handlePromptSubmit = (prompt, jobs) => {
    setPendingPrompt(prompt);
    if (!hasSignedUp) {
      setAuthMode('signup');
      setShowModal(true);
    }
  };

  const handleSignupSuccess = () => {
    setHasSignedUp(true);
    setShowModal(false);
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar onGetAccess={() => { setAuthMode('signup'); setShowModal(true); }} onSignIn={() => { setAuthMode('login'); setShowModal(true); }} />

      <div style={{ paddingTop: '96px' }}>
        <ChatHero onPromptSubmit={handlePromptSubmit} />
        <FeatureCards />
        <HowItWorksNew />
        <TimeSavedCalculator />
        <NumbersSection />
        <FreemiumSection />
        <ChromeExtensionSection />
        <PricingPreview />
        <FAQSection />
        <SocialShareSection />
        <div id="waitlist">
          <WaitlistSection />
        </div>
        <FinchFooter />
      </div>

      {showModal && (
        <SignupModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSignupSuccess}
          pendingPrompt={pendingPrompt}
          initialMode={authMode}
        />
      )}
    </div>
  );
}