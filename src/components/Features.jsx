import { 
  Zap, 
  Crown, 
  Target, 
  Mic, 
  Palette, 
  TrendingUp, 
  Users, 
  DollarSign,
  Clock,
  Shield,
  Headphones,
  BarChart3
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Grammy-Winning AI Producers",
      description: "Access replicated AI versions of legendary producers, writers, and executives. Get industry-standard guidance 24/7.",
      color: "text-[#FF5000]"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "24/7 Marketing Machine",
      description: "Your AI marketing team never sleeps. Playlist outreach, social media management, and fan engagement running around the clock.",
      color: "text-[#29C5F6]"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Smart A&R Discovery",
      description: "AI-powered trend analysis finds collaboration opportunities and remix chances before they blow up.",
      color: "text-[#FF5000]"
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Professional Studio Tools",
      description: "BeatBox AI, Lyric Lab, and songwriting assistants that rival expensive studio equipment.",
      color: "text-[#29C5F6]"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Designer Agent",
      description: "Generate cover art, merch designs, and marketing materials with AI that understands your brand.",
      color: "text-[#FF5000]"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Revenue Optimization",
      description: "Monetize every interaction. Track earnings from streams, merch, and fan engagement in real-time.",
      color: "text-[#29C5F6]"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Industry Network",
      description: "Connect with verified producers, engineers, and studios. Book sessions seamlessly through our platform.",
      color: "text-[#FF5000]"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Contract Analysis",
      description: "AI manager reviews contracts, explains terms, and identifies potential pitfalls before you sign.",
      color: "text-[#29C5F6]"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Automated Workflows",
      description: "From single releases to album rollouts, your AI team handles scheduling, promotion, and execution.",
      color: "text-[#FF5000]"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Zero Ownership Claims",
      description: "Keep 100% of your royalties and rights. We're your tools, not your owners.",
      color: "text-[#29C5F6]"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Audio Analysis",
      description: "Upload tracks for instant AI feedback on mix quality, commercial potential, and improvement suggestions.",
      color: "text-[#FF5000]"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Analytics",
      description: "Deep insights into streaming data, fan demographics, and growth opportunities across all platforms.",
      color: "text-[#29C5F6]"
    }
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-slate-900 to-purple-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-glow">
            YOUR LABEL, YOUR RULES
          </h2>
          <p className="text-xl md:text-2xl text-[#29C5F6] mb-8 lowercase italic">
            control your career with industry-grade tools
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Stop depending on gatekeepers. Get the same tools and connections that major labels use, 
            but keep 100% of your rights and royalties.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glassmorphism p-6 rounded-xl hover:bg-white/20 transition-all duration-300 group"
            >
              <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="glassmorphism p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              The Market is Oversaturated. We Level the Playing Field.
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              There's a market for every artist. You make the music, we help you find that market. 
              Our AI agents are trained on decades of successful rollouts and marketing strategies 
              that launched today's cultural icons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF5000]">50%</div>
                <div className="text-sm text-gray-400">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#29C5F6]">24/7</div>
                <div className="text-sm text-gray-400">AI Workforce</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF5000]">100%</div>
                <div className="text-sm text-gray-400">Rights Retained</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#29C5F6]">∞</div>
                <div className="text-sm text-gray-400">Usage Limits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

