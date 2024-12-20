'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import FeaturesImage from '@/public/images/Screenshot-Preview.jpg'

export default function FeaturesHome() {

  const [tab, setTab] = useState<number>(1)
  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) 
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gray-100 pointer-events-none mb-64 md:mb-80" aria-hidden="true"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="h2 font-playfair-display text-navy-500 mb-4">Built Exclusively For You</h2>
            <p className="text-xl text-gray-700">Each memorial page is fully customised to reflect your loved one's unique story, ensuring a personal and meaningful tribute that honors their life in a special way.</p>
          </div>

          {/* Section content */}
          <div className="max-w-3xl mx-auto">

            {/* Tabs buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-12">
              <button
                className={`text-center transition-opacity ${tab !== 1 && 'opacity-50 hover:opacity-75'}`}
                onClick={(e) => { e.preventDefault(); setTab(1); }}
              >
                <div>
                  <div className="inline-flex bg-white rounded-full shadow-md mb-3">
                    <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#1E3A8A" d="M20 20h6v16h-6z" />
                      <path fillOpacity=".64" fill="#1E3A8A" d="M29 20h3v16h-3zM35 20h1v16h-1z" />
                    </svg>
                  </div>
                  <div className="md:text-lg leading-tight font-semibold text-gray-700">Gallery</div>
                </div>
              </button>
              <button
                className={`text-center transition-opacity ${tab !== 2 && 'opacity-50 hover:opacity-75'}`}
                onClick={(e) => { e.preventDefault(); setTab(2); }}
              >
                <div>
                  <div className="inline-flex bg-white rounded-full shadow-md mb-3">
                    <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <path fillOpacity=".64" fill="#1E3A8A" d="M33 23v8h3V20H25v3z" />
                      <path fill="#1E3A8A" d="M20 25h11v11H20z" />
                    </svg>
                  </div>
                  <div className="md:text-lg leading-tight font-semibold text-gray-700">Contributions</div>
                </div>
              </button>
              <button
                className={`text-center transition-opacity ${tab !== 3 && 'opacity-50 hover:opacity-75'}`}
                onClick={(e) => { e.preventDefault(); setTab(3); }}
              >
                <div>
                  <div className="inline-flex bg-white rounded-full shadow-md mb-3">
                    <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <path fillOpacity=".64" fill="#1E3A8A" d="M20 27l7-7h-7z" />
                      <path fill="#1E3A8A" d="M29 20l7 7v-7z" />
                      <path fillOpacity=".64" fill="#1E3A8A" d="M36 29l-7 7h7z" />
                      <path fill="#1E3A8A" d="M27 36l-7-7v7z" />
                    </svg>
                  </div>
                  <div className="md:text-lg leading-tight font-semibold text-gray-700">Profile</div>
                </div>
              </button>
              <button
                className={`text-center transition-opacity ${tab !== 4 && 'opacity-50 hover:opacity-75'}`}
                onClick={(e) => { e.preventDefault(); setTab(4); }}
              >
                <div>
                  <div className="inline-flex bg-white rounded-full shadow-md mb-3">
                    <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 28h-4v4.9c0 1 .7 1.9 1.7 2.1 1.2.2 2.3-.8 2.3-2v-5z" fillOpacity=".64" fill="#1E3A8A" />
                      <path d="M35 21h-8c-.6 0-1 .4-1 1v11c0 .7-.2 1.4-.6 2H33c1.7 0 3-1.3 3-3V22c0-.6-.4-1-1-1z" fill="#1E3A8A" />
                    </svg>
                  </div>
                  <div className="md:text-lg leading-tight font-semibold text-gray-700">Packaging</div>
                </div>
              </button>
            </div>

            {/* Tabs items */}
            <div className="transition-all">
              <div className="relative flex flex-col" data-aos="fade-up" ref={tabs}>
                
                {/* Item 1 */}
                <Transition
                  as="div"
                  show={tab === 1}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterFrom="opacity-0 -translate-y-16"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-16"
                  beforeEnter={() => heightFix()}
                >
                  <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '61.7188%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em' }}>
                    <iframe
                      loading="lazy"
                      style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                      src="https://www.canva.com/design/DAGUf7th78c/5Ij6IkePaF_rtt0AltFqDg/view?embed"
                      allowFullScreen
                      title="Contribution Embed"
                    ></iframe>
                  </div>
                  <a href="https://www.canva.com/design/DAGUf7th78c/5Ij6IkePaF_rtt0AltFqDg/view?utm_content=DAGUf7th78c&utm_campaign=designshare&utm_medium=embeds&utm_source=link" target="_blank" rel="noopener noreferrer">
                    A picture is worth a thousand words - add up to 100 personal pictures
                  </a>
                </Transition>

                {/* Item 2 - Contributions */}
                <Transition
                  as="div"
                  show={tab === 2}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterFrom="opacity-0 -translate-y-16"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-16"
                  beforeEnter={() => heightFix()}
                >
                  <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '61.7188%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em' }}>
                    <iframe
                      loading="lazy"
                      style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                      src="https://www.canva.com/design/DAGUq5ACIQE/hHJKlhEwQjqdqAZwR0QE5w/view?embed"
                      allowFullScreen
                      title="Contributions Embed"
                    ></iframe>
                  </div>
                  <a href="https://www.canva.com/design/DAGUq5ACIQE/hHJKlhEwQjqdqAZwR0QE5w/view?utm_content=DAGUq5ACIQE&utm_campaign=designshare&utm_medium=embeds&utm_source=link" target="_blank" rel="noopener noreferrer">
                    Through these shared messages, you celebrate the impact of their life, creating a tribute that ensures their spirit lives on.
                  </a>
                </Transition>

                {/* Item 3 */}
                <Transition
                  as="div"
                  show={tab === 3}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterFrom="opacity-0 -translate-y-16"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-16"
                  beforeEnter={() => heightFix()}
                >
                  <Image className="mx-auto shadow-2xl" src={FeaturesImage} width={768} height={474} alt="Features home 03" />
                  <p className="mt-4 text-gray-700">The profile section offers a respectful, organised tribute, making it easy for visitors to look at information and connect emotionally.</p>
                </Transition>

                {/* Item 4 - Packaging with 3D model */}
                <Transition
                  as="div"
                  show={tab === 4}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterFrom="opacity-0 -translate-y-16"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-16"
                  beforeEnter={() => heightFix()}
                >
                  <div className="relative w-full pb-[56.25%]">
                    <iframe 
                      title="3D Packaging Model" 
                      allowFullScreen 
                      className="absolute top-0 left-0 w-full h-full mx-auto shadow-2xl" 
                      style={{ border: 'none' }} 
                      src="https://www.pacdora.com/share?filter_url=psy7ud7afl"
                    ></iframe>
                  </div>
                  <p className="mt-4 text-gray-700">We deliver straight to your door, including easy setup instructions, your personalised QR code, and a special note crafted just for you.</p>
                </Transition>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
