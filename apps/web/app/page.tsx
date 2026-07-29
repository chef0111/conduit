import Features from '@/features/home/components/features';
import HeroSection from '@/features/home/components/hero-section';
import Integrations from '@/features/home/components/integrations';
import Pricing from '@/features/home/components/pricing';
import SiteFooter from '@/features/home/components/site-footer';
import SiteHeader from '@/features/home/components/site-header';
import Stats from '@/features/home/components/stats';

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
