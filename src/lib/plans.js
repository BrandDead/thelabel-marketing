/**
 * theLABEL AI - Subscription Plans Configuration
 * 
 * Aligned across marketing website and dashboard
 * Yearly subscriptions save 17% (2 months free)
 */

export const BILLING_PERIODS = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

export const YEARLY_DISCOUNT = 0.17; // 17% savings

export const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with basic tools',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Basic AI chat access',
      'Limited song analysis (5/month)',
      'Basic beat creation',
      'Community support',
      'Standard audio quality'
    ],
    limitations: [
      'Limited AI interactions',
      'Basic features only',
      'No priority support'
    ],
    cta: 'Start Free',
    popular: false,
    color: 'gray'
  },
  {
    id: 'creator',
    name: 'Creator',
    description: 'Enhanced tools for serious artists',
    monthlyPrice: 29,
    yearlyPrice: 290, // $24.17/mo - saves ~$58/year (17%)
    features: [
      'Enhanced AI interactions',
      'Unlimited song analysis',
      'Advanced beat creation',
      'Basic marketing tools',
      'Email support',
      'HD audio processing',
      'Basic contract review'
    ],
    limitations: [
      'Limited marketing automation',
      'Basic analytics'
    ],
    cta: 'Go Creator',
    popular: false,
    color: 'cyan',
    stripeMonthlyPriceId: 'STRIPE_CREATOR_MONTHLY_PRICE_ID',
    stripeYearlyPriceId: 'STRIPE_CREATOR_YEARLY_PRICE_ID'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Complete creative suite',
    monthlyPrice: 49,
    yearlyPrice: 490, // $40.83/mo - saves ~$98/year (17%)
    features: [
      'Unlimited AI access',
      'All creative tools',
      'Advanced marketing suite',
      'Priority support',
      'Professional audio quality',
      'Full contract analysis',
      'Industry network access',
      'Revenue optimization tools'
    ],
    limitations: [],
    cta: 'Go Pro',
    popular: true,
    color: 'orange',
    stripeMonthlyPriceId: 'STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID',
    stripeYearlyPriceId: 'STRIPE_PROFESSIONAL_YEARLY_PRICE_ID'
  },
  {
    id: 'label',
    name: 'Label',
    description: 'Everything + all apps',
    monthlyPrice: 79,
    yearlyPrice: 790, // $65.83/mo - saves ~$158/year (17%)
    features: [
      'Everything in Professional',
      'All premium apps included',
      'Advanced analytics dashboard',
      'Multi-artist management',
      'White-label options',
      'API access',
      'Custom integrations',
      'Dedicated account manager'
    ],
    limitations: [],
    cta: 'Go Label',
    popular: false,
    color: 'purple',
    stripeMonthlyPriceId: 'STRIPE_LABEL_MONTHLY_PRICE_ID',
    stripeYearlyPriceId: 'STRIPE_LABEL_YEARLY_PRICE_ID'
  },
  {
    id: 'legend',
    name: 'Legend',
    description: '24-hour agent activity',
    monthlyPrice: 99,
    yearlyPrice: 990, // $82.50/mo - saves ~$198/year (17%)
    features: [
      'Everything in Label',
      '24/7 AI agent activity',
      'Unlimited usage all departments',
      'Real-time market monitoring',
      'Instant opportunity alerts',
      'Premium industry connections',
      'Exclusive beta features',
      'Direct line to development team'
    ],
    limitations: [],
    cta: 'Become Legend',
    popular: false,
    color: 'yellow',
    stripeMonthlyPriceId: 'STRIPE_LEGEND_MONTHLY_PRICE_ID',
    stripeYearlyPriceId: 'STRIPE_LEGEND_YEARLY_PRICE_ID'
  }
];

/**
 * Get plan by ID
 */
export const getPlanById = (planId) => {
  return plans.find(plan => plan.id === planId);
};

/**
 * Get price for a plan based on billing period
 */
export const getPlanPrice = (planId, billingPeriod = BILLING_PERIODS.MONTHLY) => {
  const plan = getPlanById(planId);
  if (!plan) return 0;
  
  return billingPeriod === BILLING_PERIODS.YEARLY 
    ? plan.yearlyPrice 
    : plan.monthlyPrice;
};

/**
 * Get monthly equivalent price for yearly billing
 */
export const getMonthlyEquivalent = (yearlyPrice) => {
  return Math.round((yearlyPrice / 12) * 100) / 100;
};

/**
 * Calculate yearly savings
 */
export const getYearlySavings = (monthlyPrice) => {
  const yearlyWithoutDiscount = monthlyPrice * 12;
  const yearlyWithDiscount = Math.round(yearlyWithoutDiscount * (1 - YEARLY_DISCOUNT));
  return yearlyWithoutDiscount - yearlyWithDiscount;
};

/**
 * API configuration
 */
export const API_CONFIG = {
  // The dashboard backend handles all Stripe operations
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'https://app.thelabelai.com',
  STRIPE_CHECKOUT_ENDPOINT: '/api/stripe/checkout',
  STRIPE_BILLING_PORTAL_ENDPOINT: '/api/stripe/billing-portal'
};

export default plans;
