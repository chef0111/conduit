import Features from '@/features/marketing/components/features';
import HeroSection from '@/features/marketing/components/hero-section';
import Integrations from '@/features/marketing/components/integrations';
import Pricing from '@/features/marketing/components/pricing';
import SiteFooter from '@/features/marketing/components/site-footer';
import SiteHeader from '@/features/marketing/components/site-header';
import Stats from '@/features/marketing/components/stats';

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <Integrations />
      <Features />
      <Pricing />
      <Stats />
      <SiteFooter />
    </>
  );
}
