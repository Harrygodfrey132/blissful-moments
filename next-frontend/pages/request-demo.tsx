export const metadata = {
  title: 'Request Demo - Tidy',
  description: 'Page description',
}

import { useEffect, useState , FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
import PageBg from '../public/img/request-demo-bg.jpg';
import { toast } from 'react-toastify';
import { API } from '../utils/api';

const SITE_KEY = "your-site-key-here";

export default function RequestDemo() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [siteKey, setSiteKey] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Fetch reCAPTCHA key from backend on mount
  useEffect(() => {
    async function fetchRecaptchaKey() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API.fetchReCaptchaKey}`);
        const data = await response.json();
        setSiteKey(data.site_key);
      } catch (error) {
        console.error("Failed to load reCAPTCHA key", error);
      }
    }
    fetchRecaptchaKey();
  }, []);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please verify the reCAPTCHA");
      return;
    }

    // Send form data & captcha token to the server
    const formData =new FormData(e.target as HTMLFormElement);
    formData.append("g-recaptcha-response", captchaToken);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API.submitRequestDemoForm}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      toast("Form submitted successfully!");
    } else {
      toast.error("reCAPTCHA verification failed. Try again.");
    }
  };

  return (
    <>
      <div className='flex'>
        <div className="w-full md:w-1/2 mt-20">
          <div className="min-h-screen h-full flex flex-col justify-center">
            <div className="px-5 sm:px-6 py-8">
              <div className="w-full max-w-md mx-auto">
                <h1 className="h2 font-playfair-display text-slate-800 mb-12">Request your demo</h1>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">Email <span className="text-rose-500">*</span></label>
                      <input id="email" name="email" className="form-input py-2 w-full" type="email" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">Contact Name <span className="text-rose-500">*</span></label>
                      <input id="name" name="name" className="form-input py-2 w-full" type="text" required />
                    </div>
                    <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                      <div className="sm:w-1/2">
                        <label className="block text-sm font-medium mb-1" htmlFor="city">City <span className="text-rose-500">*</span></label>
                        <input id="city" name="city" className="form-input py-2 w-full" type="text" required />
                      </div>
                      <div className="sm:w-1/2">
                        <label className="block text-sm font-medium mb-1" htmlFor="pcode">Postal Code <span className="text-rose-500">*</span></label>
                        <input id="pcode" name="pcode" className="form-input py-2 w-full" type="text" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="address">Street Address <span className="text-rose-500">*</span></label>
                      <input id="address" name="address" className="form-input py-2 w-full" type="text" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="country">Country <span className="text-rose-500">*</span></label>
                      <select id="country" name="country" className="form-select py-2 w-full" required>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                      </select>
                    </div>
                  </div>

                  {/* reCAPTCHA */}
                  <div className="mt-4">
                    <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />
                  </div>

                  <div className="mt-6">
                    <button type="submit" className="btn-sm w-full text-sm text-white bg-blue-light-900 group">
                      Submit <span className="tracking-normal text-blue-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                    </button>
                  </div>
                  <div className="mt-5">
                    <label className="flex items-start">
                      <input type="checkbox" className="form-checkbox mt-0.5" defaultChecked />
                      <span className="text-sm text-slate-500 ml-3">By filling out this form, I consent to the collection and use of my personal data.</span>
                    </label>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="relative hidden md:block md:w-1/2 bg-slate-900" aria-hidden="true">
          <div className="absolute inset-0" data-aos="fade">
            <Image className="opacity-10 w-full h-full object-cover" src={PageBg} width={760} height={900} priority alt="Background" />
          </div>
        </div>
      </div>
    </>
  )
}
