export const metadata = {
  title: 'About – The Blissful Moments: Honoring Legacies with QR Codes',
  description: 'Learn how The Blissful Moments helps families preserve legacies with personalized QR codes for memorials, keeping memories alive.',
}

import Hero from '../components/hero-about'
import Content from '../components/about-content'
import Team from '../components/team'

export default function About() {
  return (
    <>
      <Hero />
      <Content />
      <Team />
    </>
  )
}
