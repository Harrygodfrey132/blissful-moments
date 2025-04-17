'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ROUTES } from '../utils/routes'
import axios from 'axios';
import { API } from '../utils/api';

// Define Plan Type
type PlanVariation = {
  id: number;
  plan_id: number;
  stripe_price_id: string;
  duration: string;
  price: string;
};

type Plan = {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  slug: string;
  plan_variations: PlanVariation[];
};

export default function PricingTables() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlanListing = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${API.fetchAllPlans}`);
      setPlans(response.data.plans);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanListing();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>

      <div id="pricing-tables" className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none pt-4">

        {/* Pricing table 1 */}
        <div>
          {plans.map((plan) => {
            // Extract the 1-month plan variation
            const oneMonthPlan = plan.plan_variations.find(variation => variation.duration == '1');

            return (
              <div
                key={plan.id}
                className="relative flex flex-col h-full px-6 py-5 bg-white shadow-lg w-full"
                data-aos="fade-up"
              >
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <div className="text-lg font-semibold text-slate-800 mb-1">{plan.name}</div>

                  {oneMonthPlan ? (
                    <div className="inline-flex items-baseline mb-3">
                      <span className="h3 font-medium text-slate-500">£</span>
                      <span className="h2 leading-7 font-playfair-display text-slate-800">{oneMonthPlan.price}</span>
                      <span className="text-slate-500 text-sm ml-1">/month</span>
                    </div>
                  ) : (
                    <div className="text-slate-500">No 1-month plan available</div>
                  )}

                  <div className="text-slate-500">{plan.description}</div>
                </div>
                <div className="font-medium mb-3">Features include:</div>
                <ul className="text-slate-500 space-y-3 grow mb-6">
                  {(Array.isArray(plan.features)
                    ? plan.features
                    : (() => {
                      try {
                        return JSON.parse(plan.features ?? '[]');
                      } catch (e) {
                        return [];
                      }
                    })()
                  ).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3 rounded bg-slate-50">
                  <Link
                    className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full group"
                    href={`/checkout/${plan.slug}`}
                  >
                    Buy Now{" "}
                    <span className="tracking-normal text-blue-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing table 2 */}
        <div className="relative flex flex-col h-full px-6 py-5 bg-white shadow-lg" data-aos="fade-up" data-aos-delay="100">
          <div className="absolute top-0 right-0 mr-6 -mt-4">
            <div className="inline-flex text-sm font-semibold py-1 px-3 text-emerald-700 bg-emerald-200 rounded-full">Most Popular</div>
          </div>
          <div className="mb-4 pb-4 border-b border-slate-200">
            <div className="text-lg font-semibold text-slate-800 mb-1">Wholesale</div>
            <div className="inline-flex items-baseline mb-3">
              <span className="h2 leading-7 font-playfair-display text-slate-800">Contact Us</span>
            </div>
            <div className="text-slate-500">A funeral director who wants to bring further value to their customers</div>
          </div>
          <div className="font-medium mb-3">All features of Essential plus:</div>
          <ul className="text-slate-500 space-y-3 grow mb-6">
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Multiple Web Pages</span>
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Access to quick support</span>
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Multiple QR code plaques</span>
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Discounted/Wholesale Pricing</span>
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>A unique value proposition for your business </span>
            </li>
          </ul>
          <div className="p-3 rounded bg-slate-50">
            <a className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full group" href="/request-demo">
              Get in touch <span className="tracking-normal text-blue-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </a>

          </div>
        </div>

        {/* Pricing table 3 */}
        <div className="relative flex flex-col h-full px-6 py-5 bg-white shadow-lg" data-aos="fade-up" data-aos-delay="200">
          <div className="mb-4 pb-4 border-b border-slate-200">
            <div className="text-lg font-semibold text-slate-800 mb-1">Custom</div>
            <div className="inline-flex items-baseline mb-3">
              <span className="h2 leading-7 font-playfair-display text-slate-800">Contact Us</span>
            </div>
            <div className="text-slate-500">We look to assist you in any way possible. If you would like anything added to your memorial page then please get in touch.</div>
          </div>
          <div className="font-medium mb-3">All features of Essential plus:</div>
          <ul className="text-slate-500 space-y-3 grow mb-6">
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Custom built webpage</span>
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Handmade QR code</span>
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>Custom 1-1 support</span>
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>And many more...</span>
            </li>
          </ul>
          <div className="p-3 rounded bg-slate-50">
            <a className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full group" href="/request-demo">
              Get in touch <span className="tracking-normal text-blue-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </a>

          </div>
        </div>

      </div>

    </div>
  )
}
