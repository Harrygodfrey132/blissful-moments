export const metadata = {
  title: 'About - The BLissful Moments',
  description: 'Why I Set Up The Blissful Moments',
}

import Hero from '@/components/hero-about'
import Content from './content'
import Team from '@/components/team'
import Cta from '@/components/cta-02'

export default function About() {
  return (
    <>
      <Hero />
      <Content />
      <Team />
    </>
  )
}
