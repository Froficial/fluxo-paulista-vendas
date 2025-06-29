
import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { AuthoritySection } from '@/components/sections/AuthoritySection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { WebinarSection } from '@/components/sections/WebinarSection';
import { Footer } from '@/components/sections/Footer';
import { useCountdown } from '@/hooks/useCountdown';
import { useAvailableSpots } from '@/hooks/useAvailableSpots';
import { useWebinarForm } from '@/hooks/useWebinarForm';

const Index = () => {
  const timeLeft = useCountdown();
  const { availableSpots, setAvailableSpots } = useAvailableSpots();
  const webinarForm = useWebinarForm(() => {
    setAvailableSpots(prev => prev - 1);
  });

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-gray-50">
        <HeroSection 
          availableSpots={availableSpots}
          timeLeft={timeLeft}
        />
        <ProblemSection />
        <AuthoritySection />
        <SolutionSection />
        <WebinarSection 
          availableSpots={availableSpots}
          timeLeft={timeLeft}
          {...webinarForm}
        />
        <Footer />
      </div>
    </>
  );
};

export default Index;
