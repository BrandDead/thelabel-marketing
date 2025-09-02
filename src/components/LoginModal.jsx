import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { X, Mail } from 'lucide-react'
import AnimatedLogo from '../components/ui/AnimatedLogo.jsx'
import AuthCard from '../components/ui/AuthCard.jsx'
import AnimatedPasswordField from '../components/ui/AnimatedPasswordField.jsx'

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setIsAuthenticating(true)
    
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For now, accept any email/password combination for testing
      // In production, this would call your actual auth API
      if (formData.email && formData.password) {
        setIsAuthenticating(false)
        setIsAuthenticated(true)
        
        // Redirect to dashboard after animation completes
        setTimeout(() => {
          window.location.href = 'https://app.thelabelai.com/dashboard'
        }, 2000)
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      setIsAuthenticating(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
          Welcome Back
        </motion.h2>
        
        <motion.p
          className="text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Sign in to access your dashboard
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
        {/* Email Field */}
        <motion.div
          className="space-y-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
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
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Label htmlFor="password" className="text-white">Password</Label>
          <AnimatedPasswordField
            value={formData.password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Enter your password"
            onPasswordChange={handlePasswordChange}
          />
        </motion.div>

        {/* Forgot Password */}
        <motion.div
          className="text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <a href="#" className="text-[#29C5F6] hover:text-[#29C5F6]/80 text-sm">
            Forgot password?
          </a>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <Button 
            type="submit"
            className="w-full bg-[#FF5000] hover:bg-[#FF5000]/80 text-white py-3 text-lg font-semibold"
            disabled={isAuthenticating}
          >
            {isAuthenticating ? 'Authenticating...' : 'Sign In'}
          </Button>
        </motion.div>
      </motion.form>

      {/* Divider */}
      <motion.div
        className="my-6 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <div className="flex-1 border-t border-white/20"></div>
        <span className="px-4 text-gray-400 text-sm">or</span>
        <div className="flex-1 border-t border-white/20"></div>
      </motion.div>

      {/* Social Login */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        <Button 
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10"
          onClick={() => {
            // For now, redirect directly to dashboard
            window.location.href = 'https://app.thelabelai.com/dashboard'
          }}
        >
          Continue with Google
        </Button>
        <Button 
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10"
          onClick={() => {
            // For now, redirect directly to dashboard
            window.location.href = 'https://app.thelabelai.com/dashboard'
          }}
        >
          Continue with Apple
        </Button>
      </motion.div>

      {/* Switch to Signup */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <p className="text-gray-300">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-[#29C5F6] hover:text-[#29C5F6]/80 font-semibold"
          >
            Sign up free
          </button>
        </p>
      </motion.div>
    </AuthCard>
  )
}

export default LoginModal

