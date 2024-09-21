import Image from 'next/image'
import TeamImage01 from '@/public/images/team-01.jpg'
import TeamImage02 from '@/public/images/team-02.jpg'
import TeamImage03 from '@/public/images/team-03.jpg'

export default function Team() {  
  return (
    <section className="bg-slate-100">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-playfair-display text-slate-800">Each order is personalised to the customer.  </h2>
          </div>

        </div>
      </div>

      {/* Images container */}
      <div className="-ml-28 -mr-28 mb-8 md:mb-16">
        <div className="max-w-[1652px] mx-auto flex items-center space-x-2 md:space-x-4">
          <div className="relative w-1/3" data-aos="fade-right">
            <Image className="aspect-[3/2] object-cover" src={TeamImage01} width={540} height={360} alt="Team 01" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100" aria-hidden="true"></div>
          </div>
          <div className="relative w-1/3" data-aos="fade">
            <Image className="aspect-[3/2] object-cover" src={TeamImage02} width={540} height={360} alt="Team 02" />
          </div>
          <div className="relative w-1/3" data-aos="fade-left">
            <Image className="aspect-[3/2] object-cover" src={TeamImage03} width={540} height={360} alt="Team 03" />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-100" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  )
}