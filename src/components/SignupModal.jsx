import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { Checkbox } from '../components/ui/checkbox.jsx'
import { X, Mail, User, Music, Loader2 } from 'lucide-react'
import AnimatedLogo from '../components/ui/AnimatedLogo.jsx'
import AuthCard from '../components/ui/AuthCard.jsx'
import AnimatedPasswordField from '../components/ui/AnimatedPasswordField.jsx'
import { signUpUser } from '../lib/supabase.js'
import { getPlanById, API_CONFIG, BILLING_PERIODS } from '../lib/plans.js'

/**
 * SignupModal Component
 * 
 * Handles user registration with Supabase and optional Stripe checkout for paid plans.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Function} props.onSwitchToLogin - Callback to switch to login modal
 * @param {string} props.selectedPlan - Pre-selected plan ID (optional)
 * @param {string} props.billingPeriod - 'monthly' or 'yearly' (optional)
 */
const SignupModal = ({ 
  isOpen, 
  onClose, 
  onSwitchToLogin, 
  selectedPlan = 'free',
  billingPeriod = BILLING_PERIODS.MONTHLY 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    artistName: '',
    genre: '',
    location: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  })
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isRedirectingToStripe, setIsRedirectingToStripe] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState('signup') // 'signup', 'processing', 'redirecting'

  const plan = getPlanById(selectedPlan)
  const isPaidPlan = plan && plan.monthlyPrice > 0

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setStep('signup')
      setError('')
      setIsAuthenticating(false)
      setIsAuthenticated(false)
      setIsRedirectingToStripe(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.artistName || !formData.genre || !formData.location) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions')
      return
    }

    setIsAuthenticating(true)
    setStep('processing')
    
    try {
      // Step 1: Create Supabase account
      const { user, session, error: signupError } = await signUpUser({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        artistName: formData.artistName,
        genre: formData.genre,
        location: formData.location
      })

      if (signupError) {
        throw new Error(signupError.message || 'Failed to create account')
      }

      if (!user) {
        throw new Error('Account creation failed. Please try again.')
      }

      setIsAuthenticated(true)

      // Step 2: Handle plan selection
      if (isPaidPlan) {
        // Redirect to Stripe Checkout for paid plans
        setStep('redirecting')
        setIsRedirectingToStripe(true)
        
        await initiateStripeCheckout(user.id, formData.email, session)
      } else {
        // Free plan - redirect directly to dashboard with tokens for cross-domain auth
        // CROSS-DOMAIN AUTH FIX: Pass tokens in URL hash since localStorage isn't shared between subdomains
        if (session) {
          const accessToken = session.access_token
          const refreshToken = session.refresh_token
          const expiresIn = session.expires_in || 3600
          const tokenType = session.token_type || 'bearer'
          const redirectUrl = `https://app.thelabelai.com/auth/callback?welcome=true#access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}&expires_in=${expiresIn}&token_type=${tokenType}`
          setTimeout(() => {
            window.location.href = redirectUrl
          }, 1500)
        } else {
          // Fallback if no session (shouldn't happen)
          setTimeout(() => {
            window.location.href = 'https://app.thelabelai.com/auth/callback?welcome=true'
          }, 1500)
        }
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError(err.message || 'Signup failed. Please try again.')
      setIsAuthenticating(false)
      setStep('signup')
    }
  }

  const initiateStripeCheckout = async (userId, userEmail, session) => {
    try {
      // Build success URL with tokens for cross-domain auth
      let successUrl = 'https://app.thelabelai.com/auth/callback?welcome=true&subscription=success'
      if (session) {
        const accessToken = session.access_token
        const refreshToken = session.refresh_token
        const expiresIn = session.expires_in || 3600
        const tokenType = session.token_type || 'bearer'
        successUrl = `https://app.thelabelai.com/auth/callback?welcome=true&subscription=success#access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}&expires_in=${expiresIn}&token_type=${tokenType}`
      }
      
      const response = await fetch(`${API_CONFIG.BACKEND_URL}${API_CONFIG.STRIPE_CHECKOUT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plan: selectedPlan,
          billingPeriod: billingPeriod,
          userId: userId,
          userEmail: userEmail,
          successUrl: successUrl,
          cancelUrl: `${window.location.origin}?signup=cancelled`
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const data = await response.json()
      
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      console.error('Stripe checkout error:', err)
      // Even if Stripe fails, the account is created - redirect to dashboard
      setError('Payment setup failed. You can upgrade from your dashboard.')
      setTimeout(() => {
        // Note: We don't have session here, so user may need to re-login
        window.location.href = 'https://app.thelabelai.com/login?welcome=true'
      }, 3000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (error) setError('')
  }

  const handlePasswordChange = (password, strength) => {
    // Password strength feedback handled by AnimatedPasswordField
  }

  const handleAnimationComplete = () => {
    // Animation completed
  }

  const renderStepContent = () => {
    if (step === 'redirecting') {
      return (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader2 className="w-12 h-12 animate-spin text-[#FF5000] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Setting Up Your Subscription</h3>
          <p className="text-gray-300">Redirecting to secure payment...</p>
        </motion.div>
      )
    }

    return (
      <>
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <X size={24} />
        </motion.button>

        {/* Header with Animated Logo */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedLogo
              isAuthenticating={isAuthenticating}
              isAuthenticated={isAuthenticated}
              passwordLength={formData.password.length}
              className="text-4xl mb-4"
            />
          </motion.div>
          
          <motion.h2
            className="text-3xl font-bold text-white mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join theLABEL
          </motion.h2>
          
          <motion.p
            className="text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {isPaidPlan 
              ? `Start your ${plan.name} plan - ${billingPeriod === BILLING_PERIODS.YEARLY ? 'Save 17% with yearly billing!' : '$' + plan.monthlyPrice + '/month'}`
              : 'Start your journey to musical freedom'
            }
          </motion.p>
        </div>

        {/* Selected Plan Badge */}
        {isPaidPlan && (
          <motion.div
            className="mb-4 p-3 bg-[#FF5000]/10 border border-[#FF5000]/30 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-[#FF5000]">
              <strong>{plan.name} Plan</strong> - {billingPeriod === BILLING_PERIODS.YEARLY 
                ? `$${plan.yearlyPrice}/year ($${Math.round(plan.yearlyPrice / 12)}/mo)`
                : `$${plan.monthlyPrice}/month`
              }
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                  disabled={isAuthenticating}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
                disabled={isAuthenticating}
              />
            </div>
          </div>

          {/* Artist Name */}
          <div className="space-y-2">
            <Label htmlFor="artistName" className="text-white">Artist Name</Label>
            <div className="relative">
              <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="artistName"
                name="artistName"
                type="text"
                placeholder="Your Artist Name"
                value={formData.artistName}
                onChange={handleInputChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
                disabled={isAuthenticating}
              />
            </div>
          </div>

          {/* Genre and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-white">Genre</Label>
              <Input
                id="genre"
                name="genre"
                type="text"
                placeholder="Hip Hop"
                value={formData.genre}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
                disabled={isAuthenticating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Los Angeles, CA"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
                disabled={isAuthenticating}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
                disabled={isAuthenticating}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <AnimatedPasswordField
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a strong password (min 8 chars)"
              onPasswordChange={handlePasswordChange}
              disabled={isAuthenticating}
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                disabled={isAuthenticating}
              />
              <Label htmlFor="agreeToTerms" className="text-sm text-gray-300 leading-tight cursor-pointer">
                I agree to the{' '}
                <a href="/terms" className="text-[#29C5F6] hover:text-[#29C5F6]/80">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-[#29C5F6] hover:text-[#29C5F6]/80">
                  Privacy Policy
                </a>
              </Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="subscribeNewsletter"
                name="subscribeNewsletter"
                checked={formData.subscribeNewsletter}
                onChange={handleInputChange}
                disabled={isAuthenticating}
              />
              <Label htmlFor="subscribeNewsletter" className="text-sm text-gray-300 leading-tight cursor-pointer">
                Subscribe to our newsletter for updates and tips
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-[#FF5000] hover:bg-[#FF5000]/80 text-white py-3 text-lg font-semibold"
            disabled={isAuthenticating}
          >
            {isAuthenticating ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </span>
            ) : isPaidPlan ? (
              `Create Account & Subscribe`
            ) : (
              'Create Free Account'
            )}
          </Button>
        </motion.form>

        {/* Switch to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-300">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-[#29C5F6] hover:text-[#29C5F6]/80 font-semibold"
              disabled={isAuthenticating}
            >
              Sign in
            </button>
          </p>
        </div>
      </>
    )
  }

  return (
    <AuthCard
      isVisible={isOpen}
      isAuthenticating={isAuthenticating}
      isAuthenticated={isAuthenticated}
      onAnimationComplete={handleAnimationComplete}
    >
      {renderStepContent()}
    </AuthCard>
  )
}

export default SignupModal
