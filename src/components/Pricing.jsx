import { Button } from '../components/ui/button.jsx'
import { Check, Crown, Zap, Star, Rocket } from 'lucide-react'

const Pricing = ({ onSignupClick }) => {
  const plans = [
    {
      name: "Freemium",
      price: "Free",
      period: "forever",
      description: "Get started with basic tools",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Basic AI chat access",
        "Limited song analysis (5/month)",
        "Basic beat creation",
        "Community support",
        "Standard audio quality"
      ],
      limitations: [
        "Limited AI interactions",
        "Basic features only",
        "No priority support"
      ],
      cta: "Start Free",
      popular: false,
      color: "border-gray-600"
    },
    {
      name: "Creator",
      price: "$25",
      period: "month",
      description: "Enhanced tools for serious artists",
      icon: <Star className="h-6 w-6" />,
      features: [
        "Enhanced AI interactions",
        "Unlimited song analysis",
        "Advanced beat creation",
        "Basic marketing tools",
        "Email support",
        "HD audio processing",
        "Basic contract review"
      ],
      limitations: [
        "Limited marketing automation",
        "Basic analytics"
      ],
      cta: "Go Creator",
      popular: false,
      color: "border-[#29C5F6]"
    },
    {
      name: "Professional",
      price: "$50",
      period: "month",
      description: "Complete creative suite",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Unlimited AI access",
        "All creative tools",
        "Advanced marketing suite",
        "Priority support",
        "Professional audio quality",
        "Full contract analysis",
        "Industry network access",
        "Revenue optimization tools"
      ],
      limitations: [
        "Standard response times"
      ],
      cta: "Go Pro",
      popular: true,
      color: "border-[#FF5000]"
    },
    {
      name: "Label",
      price: "$75",
      period: "month",
      description: "Everything + all apps",
      icon: <Rocket className="h-6 w-6" />,
      features: [
        "Everything in Professional",
        "All premium apps included",
        "Advanced analytics dashboard",
        "Multi-artist management",
        "White-label options",
        "API access",
        "Custom integrations",
        "Dedicated account manager"
      ],
      limitations: [],
      cta: "Go Label",
      popular: false,
      color: "border-purple-500"
    },
    {
      name: "Legends",
      price: "$100",
      period: "month",
      description: "24-hour agent activity",
      icon: <Crown className="h-6 w-6 text-yellow-400" />,
      features: [
        "Everything in Label",
        "24/7 AI agent activity",
        "Unlimited usage all departments",
        "Real-time market monitoring",
        "Instant opportunity alerts",
        "Premium industry connections",
        "Exclusive beta features",
        "Direct line to development team"
      ],
      limitations: [],
      cta: "Become Legend",
      popular: false,
      color: "border-yellow-400"
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-glow">
            CHOOSE YOUR POWER LEVEL
          </h2>
          <p className="text-xl md:text-2xl text-[#29C5F6] mb-8 lowercase italic">
            "it's levels to this" - meek mill
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From bedroom producer to chart-topping legend. Scale your tools as you scale your career. 
            No contracts, no commitments - just pure creative power.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative glassmorphism rounded-2xl p-6 ${plan.popular ? 'ring-2 ring-[#FF5000] scale-105' : ''} hover:scale-105 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FF5000] text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4 ${plan.color.replace('border', 'text')}`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.price !== "Free" && (
                    <span className="text-gray-400">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                onClick={onSignupClick}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-[#FF5000] hover:bg-[#FF5000]/80 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                } py-3 font-semibold`}
              >
                {plan.cta}
              </Button>

              {/* Limitations (if any) */}
              {plan.limitations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-gray-400 mb-2">Limitations:</p>
                  {plan.limitations.map((limitation, limitIndex) => (
                    <p key={limitIndex} className="text-xs text-gray-500">
                      • {limitation}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div className="glassmorphism p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Take Back Your Power?
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Join thousands of independent artists who've ditched 360 deals and taken control of their careers. 
              Start free, scale as you grow, keep everything you earn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onSignupClick}
                size="lg"
                className="bg-[#FF5000] hover:bg-[#FF5000]/80 text-white px-8 py-4 text-lg font-semibold electric-pulse"
              >
                Start Your Revolution
              </Button>
              <p className="text-sm text-gray-400">
                No credit card required • Cancel anytime • Keep your rights
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Questions? We've got answers.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="text-white font-semibold mb-2">Do you take royalties?</h4>
              <p className="text-gray-400 text-sm">Never. You keep 100% of everything you earn.</p>
            </div>
            <div className="text-left">
              <h4 className="text-white font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-400 text-sm">Yes, no contracts or commitments.</p>
            </div>
            <div className="text-left">
              <h4 className="text-white font-semibold mb-2">Is this really AI?</h4>
              <p className="text-gray-400 text-sm">Yes, trained on decades of industry data.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing

