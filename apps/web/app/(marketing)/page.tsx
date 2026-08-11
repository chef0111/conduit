import type { Metadata } from 'next';

import CallToAction from '@/features/marketing/components/call-to-action';
import {
  FeatureBandAi,
  FeatureBandRealtime,
} from '@/features/marketing/components/feature-bands';
import HeroSection from '@/features/marketing/components/hero-section';
import Integrations from '@/features/marketing/components/integrations';
import LogoCloud from '@/features/marketing/components/logo-cloud';
import Pricing from '@/features/marketing/components/pricing';
import ProductShowcase from '@/features/marketing/components/product-showcase';
import Testimonials from '@/features/marketing/components/testimonials';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <ProductShowcase />
      <FeatureBandRealtime />
      <FeatureBandAi />
      <Integrations />
      <Testimonials />
      <Pricing />
      <CallToAction />
    </>
  );
}
