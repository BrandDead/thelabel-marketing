import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'

const AnimatedPasswordField = ({
  value = '',
  onChange,
  placeholder = 'Enter your password',
  className = '',
  onPasswordChange = () => {}
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [strength, setStrength] = useState(0)

  // Calculate password strength
  useEffect(() => {
    let score = 0
    if (value.length >= 8) score += 1
    if (/[a-z]/.test(value)) score += 1
    if (/[A-Z]/.test(value)) score += 1
    if (/[0-9]/.test(value)) score += 1
    if (/[^A-Za-z0-9]/.test(value)) score += 1
    
    setStrength(score)
    onPasswordChange(value, score)
  }, [value, onPasswordChange])

  const strengthColors = {
    0: 'bg-gray-500',
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-blue-500',
    5: 'bg-green-500'
  }

  const strengthLabels = {
    0: 'Very Weak',
    1: 'Weak',
    2: 'Fair',
    3: 'Good',
    4: 'Strong',
    5: 'Very Strong'
  }

  return (
    <div className="space-y-3">
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
          transition: { duration: 0.2 }
        }}
      >
        {/* Input Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <motion.input
            type={showPassword ? "text" : "password"}
            value={value}
            name="password"
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full pl-10 pr-12 py-3 bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-lg transition-all duration-300 ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            animate={{
              borderColor: isFocused ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
              boxShadow: isFocused ? '0 0 20px rgba(255, 80, 0, 0.3)' : '0 0 0px rgba(255, 80, 0, 0)'
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Password Toggle Button */}
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>
        </div>

        {/* Password Strength Indicator */}
        {value.length > 0 && (
          <motion.div
            className="mt-2 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Strength Bar */}
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <motion.div
                  key={level}
                  className={`h-2 rounded-full flex-1 transition-all duration-500 ${
                    level <= strength ? strengthColors[strength] : 'bg-gray-700'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: level <= strength ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: level * 0.1 }}
                />
              ))}
            </div>
            
            {/* Strength Label */}
            <motion.p
              className={`text-sm font-medium ${
                strength <= 2 ? 'text-red-400' :
                strength <= 3 ? 'text-yellow-400' :
                strength <= 4 ? 'text-blue-400' : 'text-green-400'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {strengthLabels[strength]}
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default AnimatedPasswordField
