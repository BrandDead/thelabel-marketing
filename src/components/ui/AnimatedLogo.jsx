import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const AnimatedLogo = ({ 
  isAuthenticating = false, 
  isAuthenticated = false, 
  passwordLength = 0,
  className = "" 
}) => {
  const controls = useAnimation()

  // Logo animation based on password input
  useEffect(() => {
    if (passwordLength > 0) {
      controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 0.6,
          ease: "easeInOut"
        }
      })
    }
  }, [passwordLength, controls])

  // Authentication state animations
  useEffect(() => {
    if (isAuthenticating) {
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    } else if (isAuthenticated) {
      controls.start({
        scale: [1, 1.5, 2],
        y: [0, -50, -100],
        opacity: [1, 0.8, 0],
        transition: {
          duration: 2,
          ease: "easeInOut"
        }
      })
    } else {
      controls.start({
        scale: 1,
        rotate: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      })
    }
  }, [isAuthenticating, isAuthenticated, controls])

  return (
    <motion.div
      className={`text-2xl font-bold ${className}`}
      animate={controls}
      initial={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
    >
      <motion.span
        className="bg-gradient-to-r from-orange-500 via-red-500 to-blue-500 bg-clip-text text-transparent"
        whileHover={{ 
          scale: 1.05,
          textShadow: "0 0 20px #FF5000, 0 0 30px #29C5F6"
        }}
        transition={{ duration: 0.3 }}
        style={{
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
        }}
      >
        theLABEL
      </motion.span>
      
      {/* Pulsating effect when authenticating */}
      {isAuthenticating && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/40 to-blue-500/40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  )
}

export default AnimatedLogo
