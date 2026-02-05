import { useState } from 'react'
import { Button } from '../components/ui/button.jsx'
import { Check, Crown, Zap, Star, Rocket, Sparkles } from 'lucide-react'
import { plans, BILLING_PERIODS, getYearlySavings } from '../lib/plans.js'

/**
 * Pricing Component
 * 
 * Displays subscription plans with monthly/yearly toggle.
 * Passes selected plan and billing period to signup modal.
 * 
 * @param {Object} props
 * @param {Function} props.onSignupClick - Callback when user clicks a plan CTA
 */
const Pricing = ({ onSignupClick }) => {
  const [billingPeriod, setBillingPeriod] = useState(BILLING_PERIODS.MONTHLY)

  const isYearly = billingPeriod === BILLING_PERIODS.YEARLY

  // Icon mapping for plans
  const iconMap = {
    free: <Sparkles className="h-6 w-6" />,
    creator: <Star className="h-6 w-6" />,
    professional: <Crown className="h-6 w-6" />,
    label: <Rocket className="h-6 w-6" />,
    legend: <Crown className="h-6 w-6 text-yellow-400" />
  }

  // Color mapping for plans
  const colorMap = {
    gray: 'border-gray-600',
    cyan: 'border-[#29C5F6]',
    orange: 'border-[#FF5000]',
    purple: 'border-purple-500',
    yellow: 'border-yellow-400'
  }

  const handlePlanSelect = (plan) => {
    onSignupClick(plan.id, billingPeriod)
  }

  const getDisplayPrice = (plan) => {
    if (plan.monthlyPrice === 0) return 'Free'
    
    if (isYearly) {
      const monthlyEquivalent = Math.round(plan.yearlyPrice / 12)
      return `$${monthlyEquivalent}`
    }
    return `$${plan.monthlyPrice}`
  }

  const getPeriodLabel = (plan) => {
    if (plan.monthlyPrice === 0) return 'forever'
    return 'month'
  }

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-glow">
            CHOOSE YOUR POWER LEVEL
          </h2>
          <p className="text-xl md:text-2xl text-[#29C5F6] mb-8 lowercase italic">
            "it's levels to this" - meek mill
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            From bedroom producer to chart-topping legend. Scale your tools as you scale your career. 
            No contracts, no commitments - just pure creative power.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg font-medium transition-colors ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            
            <button
              onClick={() => setBillingPeriod(isYearly ? BILLING_PERIODS.MONTHLY : BILLING_PERIODS.YEARLY)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isYearly ? 'bg-[#FF5000]' : 'bg-gray-600'
              }`}
              aria-label="Toggle billing period"
            >
              <span
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            
            <span className={`text-lg font-medium transition-colors ${isYearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly
            </span>
            
            {isYearly && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {plans.map((plan) => {
            const savings = plan.monthlyPrice > 0 ? getYearlySavings(plan.monthlyPrice) : 0
            
            return (
              <div 
                key={plan.id}
                className={`relative glassmorphism rounded-2xl p-6 ${
                  plan.popular ? 'ring-2 ring-[#FF5000] scale-105' : ''
                } hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#FF5000] text-white px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Yearly Savings Badge */}
                {isYearly && savings > 0 && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Save ${savings}/yr
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4 ${
                    colorMap[plan.color]?.replace('border', 'text') || 'text-gray-400'
                  }`}>
                    {iconMap[plan.id] || <Zap className="h-6 w-6" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-black text-white">{getDisplayPrice(plan)}</span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-gray-400">/{getPeriodLabel(plan)}</span>
                    )}
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-gray-400">
                      Billed ${plan.yearlyPrice}/year
                    </p>
                  )}
                  <p className="text-gray-300 text-sm mt-2">{plan.description}</p>
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
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-[#FF5000] hover:bg-[#FF5000]/80 text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  } py-3 font-semibold`}
                >
                  {plan.cta}
                </Button>

                {/* Limitations (if any) */}
                {plan.limitations && plan.limitations.length > 0 && (
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
            )
          })}
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
                onClick={() => handlePlanSelect(plans[0])}
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
