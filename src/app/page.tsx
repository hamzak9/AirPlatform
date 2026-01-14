import { MarketingLayout } from '@/components/layouts/marketing-layout'
import { HeroSection } from '@/components/marketing/hero-section'
import { FeaturesGrid } from '@/components/marketing/features-grid'
import { IntegrationsSection } from '@/components/marketing/integrations-section'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import { PricingPreview } from '@/components/marketing/pricing-preview'

export default function HomePage() {
  return (
    <MarketingLayout>
      <HeroSection />
      <FeaturesGrid />
      <IntegrationsSection />
      <TestimonialsSection />
      <PricingPreview />
    </MarketingLayout>
  )
}
