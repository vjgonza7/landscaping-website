const reviews = [
  {
    name: "Phoenix Homeowner",
    text: "They diagnosed the leak, cleaned up the yard, and made the front look sharp again before our HOA deadline.",
  },
  {
    name: "Mesa Property Owner",
    text: "Fast communication and clean work. The irrigation system finally runs evenly across the whole yard.",
  },
  {
    name: "Scottsdale Client",
    text: "The finished yard looked premium without being overdone. Exactly the quiet luxury look we wanted.",
  },
];

const faqs = [
  {
    question: "How fast can you come out?",
    answer: "Most quote requests receive a response within 24 hours. Urgent irrigation leaks and HOA notices are prioritized when scheduling allows.",
  },
  {
    question: "Do you handle HOA cleanup?",
    answer: "Yes. We focus on the visible issues HOAs commonly flag: weeds, dead plants, debris, overgrowth, dry zones, messy edges, and broken irrigation.",
  },
  {
    question: "Can I send photos before a visit?",
    answer: "Yes. The quote form now accepts yard photos so we can understand the project faster before scheduling.",
  },
  {
    question: "Are online estimates final?",
    answer: "No. Website tools and rough ranges are helpful starting points, but final pricing depends on site conditions, materials, and the agreed scope.",
  },
];

export default function ReviewsFaq() {
  return (
    <section className="bg-[#080808] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#d8b76a]">
              Trust Signals
            </p>
            <h2
              className="mt-3 font-black leading-none text-white"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.2rem)" }}
            >
              Proof Before They Call
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {["Licensed", "Insured", "AZ Built"].map((item) => (
              <div key={item} className="border border-[#d8b76a]/25 bg-[#d8b76a]/10 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#f0cf81]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.name} className="border border-white/10 bg-[#10120f] p-6">
              <div className="mb-4 text-[#d8b76a]">★★★★★</div>
              <blockquote className="text-sm leading-7 text-white/58">&quot;{review.text}&quot;</blockquote>
              <figcaption className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-white/38">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="border border-white/10 bg-[#10120f] p-6">
              <h3 className="text-base font-black text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-white/50">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
