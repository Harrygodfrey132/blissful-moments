import Accordion from './utils/accordion'

const faqItems = [
  {
    question: " What is a custom memorial webpage?",
    answer: "A custom memorial webpage is a beautiful tribute to your loved one, where family and friends can come together to share memories, photos, and stories."
  },
  {
    question: " What does public or private mean?",
    answer: "A public page can be viewed by anyone with the link. A private page is password-protected, meaning only those with the password can access it — keeping your loved one’s tribute secure and personal."
  },
  {
    question: "What is a personal URL?",
    answer: "Each memorial page comes with a customizable web address, such as yourlovedone.theblissfulmoments.com. This adds a personal touch and makes it easy to share with family and friends."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple — just sign up for an account and follow the guided steps to begin building your memorial page."
  },
  {
    question: "Is the personal page free?",
    answer: "Yes — you can use the service completely free for 45 days. After that, we charge a small monthly fee of £1.99 to help cover hosting and ongoing page maintenance."
  },
  {
    question: "How do I share the page?",
    answer: "Once your memorial is complete, just copy the personal URL and share it through social media, email, or text. Your dashboard also keeps you updated on any new contributions, photo uploads, or gallery requests."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel during the free trial or anytime after. There’s no minimum commitment — we simply want you to experience a beautiful tribute at your own pace."
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
