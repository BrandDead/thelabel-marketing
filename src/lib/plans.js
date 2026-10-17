/**
 * theLABEL AI - Public plan copy
 *
 * Prices and identifiers are unchanged. Runtime account limits are authoritative
 * in the dashboard; beta tool availability is not a promise of automated services.
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
    description: 'Explore the artist dashboard',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Basic AI chat access',
      'Starter AI usage allowance',
      'Artist workspace',
      'Department-led guidance'
    ],
    limitations: [
      'Account usage limits apply',
      'Beta tools vary by release stage',
      'Distribution not included'
    ],
    cta: 'Explore Free',
    popular: false,
    color: 'gray'
  },
  {
    id: 'creator',
    name: 'Creator',
    description: 'More room for your creative work',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      'Higher AI usage allowance',
      'More workspace capacity',
      'Creative planning guidance',
      'Campaign planning guidance'
    ],
    limitations: [
      'Account usage limits apply',
      'No guaranteed automated outreach'
    ],
    cta: 'Explore Creator',
    popular: false,
    color: 'cyan',
    stripeMonthlyPriceId: 'STRIPE_CREATOR_MONTHLY_PRICE_ID',
    stripeYearlyPriceId: 'STRIPE_CREATOR_YEARLY_PRICE_ID'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A higher-capacity artist workspace',
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      'Higher AI usage allowance than Creator',
      'More workspace capacity than Creator',
      'Creative and release planning',
      'Department-led feedback'
    ],
    limitations: [
      'Not unlimited AI usage',
      'Beta tool availability applies'
    ],
    cta: 'Explore Pro',
    popular: true,
    color: 'orange',
    stripeMonthlyPriceId: 'STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID',
    stripeYearlyPriceId: 'STRIPE_PROFESSIONAL_YEARLY_PRICE_ID'
  },
  {
    id: 'label',
    name: 'Label',
    description: 'Room for a larger creative workload',
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      'Higher AI usage allowance than Professional',
      'More workspace capacity than Professional',
      'Creative project planning',
      'Department-led guidance'
    ],
    limitations: [
      'Account usage limits apply',
      'No promised white-label or custom integration service'
    ],
    cta: 'Explore Label',
    popular: false,
    color: 'purple',
    stripeMonthlyPriceId: 'STRIPE_LABEL_MONTHLY_PRICE_ID',
    stripeYearlyPriceId: 'STRIPE_LABEL_YEARLY_PRICE_ID'
  },
  {
    id: 'legend',
    name: 'Legend',
    description: 'The highest-capacity plan',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      'Unlimited AI runs on an active Legend plan',
      'Expanded workspace capacity',
      'Creative and campaign planning',
      'Department-led guidance'
    ],
    limitations: [
      'Beta tool availability applies',
      'Unattended agent activity is not promised'
    ],
    cta: 'Explore Legend',
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
