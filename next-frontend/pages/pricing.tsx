export const metadata = {
    title: 'Pricing - The Blissful Moments',
    description: 'Page description',
  }
  
  import Hero from '../components/hero-pricing'
  import CtaPricing from '../components/CtaPricing'
  import Faqs from '../components/Faqs'
  
  export default function Pricing() {
    return (
      <>
        <Hero />
        <CtaPricing />
        <Faqs />
      </>
    )
  }
  