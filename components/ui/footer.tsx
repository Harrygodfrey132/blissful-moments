import Link from 'next/link'
import FooterLogo from './Foot-logo'

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">

          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4 lg:max-w-xs">
            <div className="mb-2">
              <div className="shrink-0 mr-4">
                <FooterLogo /> {/* Ensure FooterLogo is a valid React component */}
              </div>
              <div className="text-lg font-bold text-slate-800">The Blissful Moments</div>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-800 font-semibold mb-2">How it works</h6>
            <ul className="text-sm font-medium space-y-2">
              <li>
                <a href="\" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Overview</a>
              </li>
              <li>
                <a href="\pricing" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Pricing</a>
              </li>
              <li>
                <a href="\pricing" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">FAQ</a>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-800 font-semibold mb-2">Products</h6>
            <ul className="text-sm font-medium space-y-2">
              <li>
                <a href="/pricing" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Indviduals</a>
              </li>
              <li>
                <a href="/pricing" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Custom Projects</a>
              </li>
              <li>
                <a href="/pricing/" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Funeral Directors</a>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-800 font-semibold mb-2">Company</h6>
            <ul className="text-sm font-medium space-y-2">
              <li>
                <a href="#" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">About Us</a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Careers</a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Terms of Use</a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );

}
