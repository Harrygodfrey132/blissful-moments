export const metadata = {
  title: 'Pricing - The Blissful Moments',
  description: 'Page description',
}

import Hero from '@/components/hero-pricing'
import CtaPricing from '@/components/cta-pricing'
import Faqs from '@/components/faqs'
import Cta from '@/components/cta-dark'

export default function Pricing() {
  return (
    <>
      <Hero />
      <CtaPricing />
      <Faqs />
    </>
  )
}
