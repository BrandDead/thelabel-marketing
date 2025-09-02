import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { Checkbox } from '../components/ui/checkbox.jsx'
import { X, Mail, User, Music } from 'lucide-react'
import AnimatedLogo from '../components/ui/AnimatedLogo.jsx'
import AuthCard from '../components/ui/AuthCard.jsx'
import AnimatedPasswordField from '../components/ui/AnimatedPasswordField.jsx'

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    artistName: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  })
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.artistName) {
      setError('Please fill in all required fields')
      return
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions')
      return
    }

    setIsAuthenticating(true)
    
    try {
      // Simulate signup delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For now, accept any valid form data for testing
      setIsAuthenticating(false)
      setIsAuthenticated(true)
      
      // Redirect to dashboard after animation completes
      setTimeout(() => {
        window.location.href = 'https://app.thelabelai.com/dashboard'
      }, 2000)
    } catch (err) {
      setError('Signup failed. Please try again.')
      setIsAuthenticating(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handlePasswordChange = (password, strength) => {
    // This will trigger logo animations based on password input
  }

  const handleAnimationComplete = () => {
    // Animation completed, can perform cleanup if needed
  }

  return (
    <AuthCard
      isVisible={isOpen}
      isAuthenticating={isAuthenticating}
      isAuthenticated={isAuthenticated}
      onAnimationComplete={handleAnimationComplete}
    >
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
      <div className="text-center mb-8">
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
          Start your journey to musical freedom
        </motion.p>
      </div>

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
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* Name Fields */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
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
            />
          </div>
        </motion.div>

        {/* Artist Name */}
        <motion.div
          className="space-y-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
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
            />
          </div>
        </motion.div>

        {/* Email Field */}
        <motion.div
          className="space-y-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
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
            />
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div
          className="space-y-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <Label htmlFor="password" className="text-white">Password</Label>
          <AnimatedPasswordField
            value={formData.password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Create a strong password"
            onPasswordChange={handlePasswordChange}
          />
        </motion.div>

        {/* Checkboxes */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            <Label htmlFor="agreeToTerms" className="text-sm text-gray-300">
              I agree to the{' '}
              <a href="#" className="text-[#29C5F6] hover:text-[#29C5F6]/80">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#29C5F6] hover:text-[#29C5F6]/80">
                Privacy Policy
              </a>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscribeNewsletter"
              name="subscribeNewsletter"
              checked={formData.subscribeNewsletter}
              onChange={handleInputChange}
            />
            <Label htmlFor="subscribeNewsletter" className="text-sm text-gray-300">
              Subscribe to our newsletter for updates and tips
            </Label>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <Button 
            type="submit"
            className="w-full bg-[#FF5000] hover:bg-[#FF5000]/80 text-white py-3 text-lg font-semibold"
            disabled={isAuthenticating}
          >
            {isAuthenticating ? 'Creating Account...' : 'Create Account'}
          </Button>
        </motion.div>
      </motion.form>

      {/* Switch to Login */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <p className="text-gray-300">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-[#29C5F6] hover:text-[#29C5F6]/80 font-semibold"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </AuthCard>
  )
}

export default SignupModal

