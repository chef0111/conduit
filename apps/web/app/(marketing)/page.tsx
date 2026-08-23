import type { Metadata } from 'next';

import CallToAction from '@/components/call-to-action';
import { FeatureBands } from '@/components/feature-bands';
import HeroSection from '@/components/hero-section';
import Integrations from '@/components/integrations';
import LogoCloud from '@/components/logo-cloud';
import Pricing from '@/components/pricing';
import ProductShowcase from '@/components/product-showcase';
import Testimonials from '@/components/testimonials';

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
      <FeatureBands />
      <Integrations />
      <Testimonials />
      <Pricing />
      <CallToAction />
    </>
  );
}
