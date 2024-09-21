import Accordion from '@/components/utils/accordion'

const faqItems = [
  {
    question: " What is a custom memorial webpage?",
    answer: "A custom memorial webpage is a beautiful tribute to your loved one, where family and friends can come together to share memories, photos, and stories."
  },
  {
    question: " How does the QR code on the gravestone work?",
    answer: "We provide a handcrafted, durable QR code that is placed on the gravestone. When visitors scan the code with their smartphone, they are directed to a secure webpage that commemorates the life of your loved one."
  },
  {
    question: "Is the webpage secure?",
    answer: "Yes. Each memorial webpage is password-protected to ensure privacy and security. You control who has access to the page."
  },
  {
    question: "Can I update or change the webpage after it's created?",
    answer: "Absolutely. You can edit the webpage at any time by adding new content, such as photos or stories, to keep the memory alive."
  },
  {
    question: "How long will the memorial webpage last?",
    answer: "Our memorial web pages are designed to last indefinitely, so future generations can access and celebrate the legacy of your loved one."
  },
  {
    question: "What if visitors do not have a smartphone to scan the QR code?",
    answer: "We also provide a direct website link that can be accessed on any device with an internet connection."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple! Contact us today, and we'll guide you through creating a lasting digital legacy for your loved one."
  },
];

export default function Faqs() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-slate-50">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-playfair-display text-slate-800">Frequently Asked Questions</h2>
          </div>

          {/* Faqs */}
          <ul className="max-w-3xl mx-auto divide-y divide-slate-200">
            {faqItems.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                {faq.answer}
              </Accordion>
            ))}
            <span className="block border-t border-gray-200" aria-hidden="true"></span>
          </ul >

        </div>
      </div>
    </section>
  )
}
