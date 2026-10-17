import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

/**
 * FAQ Component
 * 
 * Comprehensive FAQ section with schema markup for SEO.
 * Addresses common objections and improves conversion.
 */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is theLABEL and how does it work?",
          a: "theLABEL is a label-inspired AI support dashboard for independent artists. Explore department-led guidance for creative work, interview preparation, and release planning. We are in beta: available tools depend on release stage and your active account limits, and automated services are not guaranteed."
        },
        {
          q: "Do I need any experience to use theLABEL?",
          a: "You can start with ideas and questions rather than technical expertise. The beta is still being refined, so some tools need experimentation and your own review. AI guidance can be wrong; you remain responsible for decisions and published work."
        },
        {
          q: "How is this different from a traditional record label?",
          a: "theLABEL is a support platform, not a record deal or a replacement for every professional service. You choose how to use its guidance and which projects to pursue. Paid access, where available, is managed in the artist dashboard."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "Is there really a free plan?",
          a: "The Free plan is the starting option for basic AI chat and an artist workspace, with account usage limits. It does not include music distribution or unlimited AI use. Check your dashboard for access and the tools currently enabled in beta."
        },
        {
          q: "Can I cancel anytime?",
          a: "Manage subscription billing from the artist dashboard. Review the plan and billing terms there before upgrading or cancelling; access and billing status are determined by your account and the payment provider."
        },
        {
          q: "What's included in the yearly discount?",
          a: "The advertised yearly plan totals are displayed on the pricing cards. Selecting a plan carries that plan and billing period to the artist dashboard; review the final price and available access there before paying."
        },
        {
          q: "Do you offer refunds?",
          a: "Billing is handled in the artist dashboard. Email support@thelabelai.com with your account email for help reviewing the applicable billing terms. This page does not promise a refund outcome."
        }
      ]
    },
    {
      category: "Features & Tools",
      questions: [
        {
          q: "What AI tools are included?",
          a: "The dashboard brings together label-inspired AI departments. Tools and limits vary by plan and release stage; not every department description is a live automated service. BeatBox voice-to-MIDI, unattended outreach, and distribution are not promised as working beta features."
        },
        {
          q: "Can I distribute my music to Spotify, Apple Music, etc.?",
          a: "Music distribution to Spotify, Apple Music, and other platforms is not a verified beta service and is not included as a Free-plan benefit. Use your chosen distributor for releases; guidance on release planning is not the same as distribution."
        },
        {
          q: "How does the AI producer work?",
          a: "The Producer department can help you discuss beat ideas, arrangements, and production choices. It is AI guidance, not a celebrity producer or a guaranteed finished master. The full mouth-to-beat, MIDI, and VST workflow remains in development."
        },
        {
          q: "What kind of marketing support do I get?",
          a: "Use AI guidance to draft campaign ideas, release timelines, and outreach messages. You review and execute actions. Automated pitching, scheduling, influencer outreach, and live growth reporting are not promised during beta."
        }
      ]
    },
    {
      category: "Rights & Ownership",
      questions: [
        {
          q: "Who owns my music and masters?",
          a: "theLABEL is a tool for your creative work, not a record-label signing agreement. Keep control of what you upload, create, and approve. Review the platform terms and any third-party provider licences before commercial use of generated material."
        },
        {
          q: "What happens to my music if I cancel?",
          a: "Keep your own copies of your work and any exports you need. Beta Studio saves may be device-local rather than cloud backups. Account cancellation does not establish that every tool supports export or that a third-party release remains available."
        },
        {
          q: "Are there any hidden fees or royalty splits?",
          a: "A platform subscription is separate from any third-party distribution, manufacturing, shipping, taxes, or payment-processing costs that may apply. Review the total and relevant provider terms before confirming a purchase or service."
        }
      ]
    },
    {
      category: "Technical & Support",
      questions: [
        {
          q: "What if I need help or have questions?",
          a: "Email support@thelabelai.com from the address on your account. We do not promise a particular response time or dedicated account manager during beta."
        },
        {
          q: "Is my data and music secure?",
          a: "Use a trusted device and keep copies of important work. Some beta Studio data may be saved locally in your browser rather than backed up to the cloud. See the Privacy Policy for data handling; this page does not claim a security certification, comprehensive backups, or GDPR certification."
        },
        {
          q: "What devices and browsers are supported?",
          a: "The beta is browser-based. Start with a current desktop browser and check device permissions when using audio tools. Mobile and cross-browser behavior are still being validated; no mobile-app release date is promised."
        }
      ]
    }
  ]

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === key ? null : key)
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-slate-900 to-purple-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-6 neon-glow">
            QUESTIONS? ANSWERED.
          </h2>
          <p className="text-xl text-blue-400 mb-8 lowercase italic">
            everything you need to know about theLABEL
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold text-orange-500 mb-6 uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const isOpen = openIndex === `${categoryIndex}-${questionIndex}`
                  return (
                    <div 
                      key={questionIndex}
                      className="glassmorphism rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                      >
                        <span className="text-lg font-semibold text-white pr-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-6 w-6 text-blue-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center glassmorphism p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-300 mb-6">
            Have a beta question? Email the team; response times may vary.
          </p>
          <a 
            href="mailto:support@thelabelai.com"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>

      {/* Schema.org FAQ Markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.flatMap(category => 
            category.questions.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          )
        })}
      </script>
    </section>
  )
}

export default FAQ
