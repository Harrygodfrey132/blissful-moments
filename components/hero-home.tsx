import Link from 'next/link'
import VideoThumb from '@/public/images/hero-image-01.jpg'
import ModalVideo01 from '@/components/modal-video-01'
import Image from "next/image"

export default function HeroHome() {
  return (
    <section className="relative">

      {/* Dark background */}
      <div className="absolute inset-0 bg-slate-900 pointer-events-none -z-10 [clip-path:polygon(0_0,_5760px_0,_5760px_calc(100%_-_352px),_0_100%)]" aria-hidden="true"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-20 md:pt-40 md:pb-44">

          {/* Hero content */}
          <div className="max-w-xl mx-auto md:max-w-none md:flex md:items-center md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-16 md:space-y-0">

            {/* Content */}
            <div className="text-center md:text-left md:min-w-[30rem]" data-aos="fade-right">
              <h1 className="h1 font-playfair-display text-slate-100 mb-4">Create Digital Legacies</h1>
              <p className="text-xl text-slate-400 mb-8">Our mission is to help families preserve their loved ones' memories through custom memorial web pages, accessible via QR codes on gravestones. Visitors can scan the code to view a dedicated, password-protected page, ensuring their legacy is safely shared and cherished for generations.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div>
                  <Link className="btn text-white bg-navy-400 hover:bg-navy-500 w-full group" href="/request-demo">
                    Explore Product <span className="tracking-normal text-blue-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </Link>
                </div>
                <div>
                  <Link className="btn text-white bg-slate-700 hover:bg-slate-800 w-full" href="#pricing-tables">See Our Options</Link>
                </div>
              </div>
            </div>

            {/* Hero image */}
            {/* Hero image */}
            <Image
            src="/images/dove-image.png"
            alt="Dove Picture"
             width={2000}
              height={1100}
              className="responsive-image"
              />         

          </div>

        </div>
      </div>
    </section>
  )
}