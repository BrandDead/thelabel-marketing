import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { X, Mail, Loader2 } from 'lucide-react'
import AnimatedLogo from '../components/ui/AnimatedLogo.jsx'
import AuthCard from '../components/ui/AuthCard.jsx'
import AnimatedPasswordField from '../components/ui/AnimatedPasswordField.jsx'
import { signInUser, supabase } from '../lib/supabase.js'

/**
 * LoginModal Component
 * 
 * Handles user authentication with Supabase.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Function} props.onSwitchToSignup - Callback to switch to signup modal
 */
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
      const { user, session, error: signInError } = await signInUser(
        formData.email,
        formData.password
      )

      if (signInError) {
        throw new Error(signInError.message || 'Invalid email or password')
      }

      if (!user) {
        throw new Error('Login failed. Please try again.')
      }

      setIsAuthenticated(true)
      
      // Redirect to dashboard after animation completes
      setTimeout(() => {
        window.location.href = 'https://app.thelabelai.com/dashboard'
      }, 1500)
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed. Please try again.')
      setIsAuthenticating(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsAuthenticating(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://app.thelabelai.com/dashboard'
        }
      })
      
      if (error) throw error
    } catch (err) {
      console.error('Google login error:', err)
      setError('Google login failed. Please try again.')
      setIsAuthenticating(false)
    }
  }

  const handleAppleLogin = async () => {
    try {
      setIsAuthenticating(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: 'https://app.thelabelai.com/dashboard'
        }
      })
      
      if (error) throw error
    } catch (err) {
      console.error('Apple login error:', err)
      setError('Apple login failed. Please try again.')
      setIsAuthenticating(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first')
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: 'https://app.thelabelai.com/reset-password'
      })
      
      if (error) throw error
      
      setError('') // Clear any existing error
      alert('Password reset email sent! Check your inbox.')
    } catch (err) {
      console.error('Password reset error:', err)
      setError('Failed to send reset email. Please try again.')
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
    // Password strength feedback
  }

  const handleAnimationComplete = () => {
    // Animation completed
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
        disabled={isAuthenticating}
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
              disabled={isAuthenticating}
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
            onChange={handleInputChange}
            placeholder="Enter your password"
            onPasswordChange={handlePasswordChange}
            disabled={isAuthenticating}
          />
        </motion.div>

        {/* Forgot Password */}
        <motion.div
          className="text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <button 
            type="button"
            onClick={handleForgotPassword}
            className="text-[#29C5F6] hover:text-[#29C5F6]/80 text-sm"
            disabled={isAuthenticating}
          >
            Forgot password?
          </button>
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
            {isAuthenticating ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
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
          onClick={handleGoogleLogin}
          disabled={isAuthenticating}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>
        <Button 
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10"
          onClick={handleAppleLogin}
          disabled={isAuthenticating}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
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
            disabled={isAuthenticating}
          >
            Sign up free
          </button>
        </p>
      </motion.div>
    </AuthCard>
  )
}

export default LoginModal
