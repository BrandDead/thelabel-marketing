import { Shield, Lock, Award, CheckCircle, Globe, Zap } from 'lucide-react'

/**
 * TrustBadges Component
 * 
 * Displays security, compliance, and trust indicators
 * Critical for conversion and credibility
 */
const TrustBadges = () => {
  const badges = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bank-Level Security",
      description: "AES-256 encryption protects your music and data",
      color: "text-blue-400"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "GDPR Compliant",
      description: "Your privacy and data rights are protected",
      color: "text-green-400"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Industry Certified",
      description: "Partnered with major distributors and platforms",
      color: "text-orange-500"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "100% Uptime SLA",
      description: "Your music career never sleeps, neither do we",
      color: "text-purple-400"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Distribution",
      description: "Licensed to distribute in 195+ countries",
      color: "text-cyan-400"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Payouts",
      description: "Get your earnings fast with no minimums",
      color: "text-yellow-400"
    }
  ]

  const partners = [
    "Spotify",
    "Apple Music",
    "YouTube Music",
    "Amazon Music",
    "TikTok",
    "Instagram"
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-purple-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">
            TRUSTED BY ARTISTS WORLDWIDE
          </h2>
          <p className="text-lg text-gray-400">
            Enterprise-grade security meets independent artist freedom
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="glassmorphism p-6 rounded-xl hover:bg-white/20 transition-all duration-300 text-center"
            >
              <div className={`${badge.color} mx-auto mb-4 inline-block`}>
                {badge.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{badge.title}</h3>
              <p className="text-sm text-gray-400">{badge.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Distribution Partners</h3>
            <p className="text-gray-400">Your music reaches every major platform</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 glassmorphism p-8 rounded-xl">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="text-gray-400 hover:text-white transition-colors font-semibold text-lg"
              >
                {partner}
              </div>
            ))}
            <div className="text-gray-500 text-sm">+ 144 more platforms</div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 glassmorphism px-8 py-4 rounded-lg">
            <Shield className="h-6 w-6 text-orange-500" />
            <div className="text-left">
              <div className="text-white font-semibold">14-Day Money-Back Guarantee</div>
              <div className="text-sm text-gray-400">Try risk-free. Cancel anytime. No questions asked.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustBadges
