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
          a: "theLABEL is an AI-powered music platform that gives independent artists access to the same tools and resources major labels use. Our platform includes AI producers, marketing automation, distribution tools, design agents, and analytics - all working 24/7 to help you build your music career without signing away your rights."
        },
        {
          q: "Do I need any experience to use theLABEL?",
          a: "No! Whether you're a bedroom producer or a seasoned artist, theLABEL is designed to be intuitive. Our AI agents guide you through every step - from production to marketing to distribution. If you can make music, you can use theLABEL."
        },
        {
          q: "How is this different from a traditional record label?",
          a: "Traditional labels take 80-90% of your revenue and own your masters through 360 deals. theLABEL charges a flat monthly fee and you keep 100% of your rights and royalties. You get all the resources of a major label (A&R, marketing, production, distribution) without giving up ownership or creative control."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "Is there really a free plan?",
          a: "Yes! Our Free tier gives you access to basic AI tools, limited beats per month, and distribution to major platforms. It's perfect for testing theLABEL and seeing if it's right for you. Upgrade anytime as your career grows."
        },
        {
          q: "Can I cancel anytime?",
          a: "Absolutely. No contracts, no commitments. Cancel with one click from your dashboard. If you cancel, you keep access until the end of your billing period, and you always keep 100% ownership of everything you created."
        },
        {
          q: "What's included in the yearly discount?",
          a: "Pay yearly and save 20% on all paid plans. Plus, you get priority support, early access to new features, and exclusive masterclasses with industry professionals. The yearly discount applies automatically at checkout."
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 14-day money-back guarantee on all paid plans. If theLABEL isn't right for you, just email support within 14 days for a full refund, no questions asked."
        }
      ]
    },
    {
      category: "Features & Tools",
      questions: [
        {
          q: "What AI tools are included?",
          a: "Every plan includes: AI producers trained on Grammy-winning techniques, marketing automation agents, design tools for cover art and merch, lyric assistance, beat generation, playlist pitching automation, social media management, and real-time analytics. Higher tiers unlock more advanced features and higher limits."
        },
        {
          q: "Can I distribute my music to Spotify, Apple Music, etc.?",
          a: "Yes! All plans (including Free) include distribution to 150+ platforms including Spotify, Apple Music, YouTube Music, TikTok, Instagram, and more. You keep 100% of your royalties - we never take a cut of your streaming revenue."
        },
        {
          q: "How does the AI producer work?",
          a: "Our AI producers are trained on production techniques from Grammy-winning producers. Tell the AI your genre, mood, and vision, and it generates beats, suggests arrangements, and helps with mixing/mastering. It's like having Timbaland or Metro Boomin in your studio 24/7."
        },
        {
          q: "What kind of marketing support do I get?",
          a: "Our AI marketing agents handle playlist pitching, social media scheduling, email campaigns, influencer outreach, and TikTok strategy. They work 24/7 analyzing trends and finding opportunities to grow your audience while you focus on making music."
        }
      ]
    },
    {
      category: "Rights & Ownership",
      questions: [
        {
          q: "Who owns my music and masters?",
          a: "YOU DO. 100%. Always. We never take ownership of your music, masters, publishing, or any other rights. theLABEL is a tool, not a label. You pay for access to our AI platform, and everything you create belongs entirely to you."
        },
        {
          q: "What happens to my music if I cancel?",
          a: "All your music, beats, artwork, and data remain 100% yours forever. You can export everything and keep using it however you want. Your distributed music stays live on streaming platforms (you'll just need to manage it directly or through another distributor)."
        },
        {
          q: "Are there any hidden fees or royalty splits?",
          a: "Zero. The price you see is what you pay. We don't take percentages of your streams, merch sales, show revenue, or anything else. Your monthly/yearly subscription is the only cost. You keep 100% of all revenue you generate."
        }
      ]
    },
    {
      category: "Technical & Support",
      questions: [
        {
          q: "What if I need help or have questions?",
          a: "All plans include email support. Pro and higher tiers get priority support with faster response times. Label and Legend tiers include dedicated account managers. We also have an extensive knowledge base, video tutorials, and active community forums."
        },
        {
          q: "Is my data and music secure?",
          a: "Yes. We use bank-level encryption (AES-256) for all data. Your music files are stored on secure, redundant servers with automatic backups. We're GDPR compliant and never share or sell your data. Your intellectual property is protected."
        },
        {
          q: "What devices and browsers are supported?",
          a: "theLABEL works on any modern browser (Chrome, Firefox, Safari, Edge) on Mac, Windows, or Linux. Our mobile app is coming soon. Some AI tools work best on desktop for now, but you can manage your account and check analytics from any device."
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
            Our team is here to help. Get in touch and we'll respond within 24 hours.
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
