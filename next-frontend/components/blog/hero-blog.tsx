export default function HeroBlog() {  
  return (
    <section className="relative">

      {/* Dark background */}
      <div className="absolute inset-0 bg-slate-900 pointer-events-none -z-10" aria-hidden="true"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 font-playfair-display text-slate-100 mb-4">Blogs on the Art of Giving</h1>
            <p className="text-xl text-slate-400 mb-8">Editors have made special contributions on a range of topics, offering profound reflections on mourning and celebrating the beauty of life. Their insights serve as a tribute to the delicate balance between loss and the enduring splendor of living.</p>
          </div>

        </div>
      </div>
    </section>
  )
}