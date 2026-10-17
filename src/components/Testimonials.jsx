/**
 * Honest launch positioning — no fabricated artist quotes or unverified metrics.
 */
const reasons = [
  {
    title: 'Keep the rights',
    body: 'theLABEL is a subscription toolset, not a 360 deal. You keep ownership of the work you create and the revenue you earn.',
  },
  {
    title: 'A full label desk',
    body: 'A&R, PR, design, marketing, songwriting, production, and engineering agents live in one dashboard instead of a stack of disconnected apps.',
  },
  {
    title: 'Start free, scale later',
    body: 'Open the artist dashboard on a free plan. Paid tiers add capacity when a release actually needs it — no contract to begin.',
  },
]

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-6 neon-glow">
            BUILT FOR INDEPENDENTS
          </h2>
          <p className="text-xl text-blue-400 mb-8 lowercase italic">
            the product, not invented success stories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="glassmorphism p-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex flex-col"
            >
              <h3 className="text-lg font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-gray-300 leading-relaxed">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
