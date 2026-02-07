import { Check, X, AlertCircle } from 'lucide-react'

/**
 * Comparison Component
 * 
 * Compares theLABEL vs Traditional Record Labels
 * Critical for conversion - shows value proposition clearly
 */
const Comparison = () => {
  const comparisons = [
    {
      feature: "Ownership of Masters",
      thelabel: true,
      traditional: false,
      details: "You keep 100% ownership forever"
    },
    {
      feature: "Revenue Share",
      thelabel: "100% yours",
      traditional: "10-20% yours",
      details: "No royalty splits or hidden fees"
    },
    {
      feature: "Contract Length",
      thelabel: "Cancel anytime",
      traditional: "3-7 years locked",
      details: "No long-term commitments"
    },
    {
      feature: "Creative Control",
      thelabel: true,
      traditional: false,
      details: "You decide what music to release"
    },
    {
      feature: "Marketing & Promotion",
      thelabel: "24/7 AI agents",
      traditional: "Limited budget",
      details: "Always-on marketing automation"
    },
    {
      feature: "Production Resources",
      thelabel: "Unlimited AI producers",
      traditional: "1-2 assigned producers",
      details: "Access Grammy-level production anytime"
    },
    {
      feature: "Distribution",
      thelabel: "150+ platforms",
      traditional: "Major platforms only",
      details: "Reach every streaming service"
    },
    {
      feature: "Advance Payment",
      thelabel: "Not needed",
      traditional: "$50K-$500K debt",
      details: "No recoupable advances to pay back"
    },
    {
      feature: "Monthly Cost",
      thelabel: "$0-$299",
      traditional: "$0 upfront",
      details: "Transparent pricing vs hidden costs"
    },
    {
      feature: "Publishing Rights",
      thelabel: "100% yours",
      traditional: "50% or less",
      details: "Keep all songwriter revenue"
    },
    {
      feature: "Merchandising Rights",
      thelabel: "100% yours",
      traditional: "Label takes cut",
      details: "Keep all merch profits"
    },
    {
      feature: "Touring Rights",
      thelabel: "100% yours",
      traditional: "Label takes 10-30%",
      details: "Keep all show revenue"
    }
  ]

  return (
    <section id="comparison" className="py-20 bg-gradient-to-b from-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-6 neon-glow">
            TRADITIONAL LABEL VS theLABEL
          </h2>
          <p className="text-xl text-blue-400 mb-8 lowercase italic">
            the difference is night and day
          </p>
          <div className="inline-flex items-center gap-2 glassmorphism px-6 py-3 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <p className="text-gray-300">
              The average major label artist needs <span className="text-orange-500 font-bold">2-3 years</span> to recoup their advance. Most never do.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Mobile View */}
          <div className="lg:hidden space-y-6">
            {comparisons.map((item, index) => (
              <div key={index} className="glassmorphism p-6 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4">{item.feature}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Check className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">theLABEL</div>
                      <div className="text-blue-400">
                        {typeof item.thelabel === 'boolean' 
                          ? (item.thelabel ? '✓ Included' : '✗ Not included')
                          : item.thelabel
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">Traditional Label</div>
                      <div className="text-gray-400">
                        {typeof item.traditional === 'boolean'
                          ? (item.traditional ? '✓ Included' : '✗ Not included')
                          : item.traditional
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-3 pt-3 border-t border-white/10">
                  {item.details}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block glassmorphism rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 text-gray-400 font-semibold uppercase text-sm tracking-wider">
                    Feature
                  </th>
                  <th className="text-center p-6 bg-orange-500/10">
                    <div className="text-2xl font-bold text-orange-500 mb-1">theLABEL</div>
                    <div className="text-xs text-gray-400">AI-Powered Platform</div>
                  </th>
                  <th className="text-center p-6">
                    <div className="text-2xl font-bold text-gray-400 mb-1">Traditional Label</div>
                    <div className="text-xs text-gray-500">360 Deals & Contracts</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6">
                      <div className="text-white font-semibold mb-1">{item.feature}</div>
                      <div className="text-sm text-gray-400">{item.details}</div>
                    </td>
                    <td className="text-center p-6 bg-orange-500/5">
                      {typeof item.thelabel === 'boolean' ? (
                        item.thelabel ? (
                          <Check className="h-6 w-6 text-orange-500 mx-auto" />
                        ) : (
                          <X className="h-6 w-6 text-gray-500 mx-auto" />
                        )
                      ) : (
                        <span className="text-blue-400 font-semibold">{item.thelabel}</span>
                      )}
                    </td>
                    <td className="text-center p-6">
                      {typeof item.traditional === 'boolean' ? (
                        item.traditional ? (
                          <Check className="h-6 w-6 text-gray-400 mx-auto" />
                        ) : (
                          <X className="h-6 w-6 text-red-500 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-400 font-semibold">{item.traditional}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">0%</div>
              <div className="text-gray-300">Revenue we take from your music</div>
            </div>
            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
              <div className="text-gray-300">Rights & ownership you keep</div>
            </div>
            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">∞</div>
              <div className="text-gray-300">Creative freedom</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Comparison
