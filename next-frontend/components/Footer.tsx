
const Footer = () => {
  return (
    <footer className="shadow bg-gray-100 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-8 py-8 text-center md:text-left md:py-12">
          <div className="sm:col-span-12 lg:col-span-4 lg:max-w-xs">
            <div className="mb-2">
              <div className="shrink-0 mr-4">
                {/* <a className="block transition duration-150 ease-in-out" aria-label="Cruip" href="/">
                  <img src="/images/logo-black.png" alt="Company Logo" className="w-12 h-12" />
                </a> */}
              </div>
              <div className="text-lg font-bold text-black">The Blissful Moments</div>
            </div>
          </div>
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-black font-semibold mb-2">How it works</h6>
            <ul className="text-sm font-medium space-y-2">
              <li><a href="/" className="text-black font-normal font-normal transition duration-150 ease-in-out">Overview</a></li>
              <li><a href="/pricing" className="text-black font-normal transition duration-150 ease-in-out">Pricing</a></li>
              <li><a href="/pricing" className="text-black font-normal transition duration-150 ease-in-out">FAQ</a></li>
            </ul>
          </div>
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-black font-semibold mb-2">Products</h6>
            <ul className="text-sm font-medium space-y-2">
              <li><a href="/pricing" className="text-black font-normal transition duration-150 ease-in-out">Indviduals</a></li>
              <li><a href="/pricing" className="text-black font-normal transition duration-150 ease-in-out">Custom Projects</a></li>
              <li><a href="/pricing/" className="text-black font-normal transition duration-150 ease-in-out">Funeral Directors</a></li>
            </ul>
          </div>
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-black font-semibold mb-2">Company</h6>
            <ul className="text-sm font-medium space-y-2">
              <li><a href="#" className="text-black font-normal transition duration-150 ease-in-out">About Us</a></li>
              <li><a href="#" className="text-black font-normal transition duration-150 ease-in-out">Careers</a></li>
              <li><a href="#" className="text-black font-normal transition duration-150 ease-in-out">Terms of Use</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
