export const metadata = {
  title: 'Home – The Blissful Moments: Honoring Legacies with QR Codes',
  description: 'The Blissful Moments helps families preserve their loved ones’ legacies through personalized memorials with QR codes, keeping stories alive for generations.',
}

import Hero from '@/components/hero-home'
import FeaturesBlocks from '@/components/features-blocks'
import Features from '@/components/features-home'
import Features02 from '@/components/features-home-02'
import Features03 from '@/components/features-home-03'
import PricingSection from '@/components/pricing'
import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Features03 />
      <PricingSection />
      <Cta />
    </>
  )
}
