import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const AuthCard = ({ 
  children, 
  isVisible = true, 
  isAuthenticating = false,
  isAuthenticated = false,
  onAnimationComplete = () => {}
}) => {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !isExiting) {
      setIsExiting(true)
    }
  }, [isAuthenticated, isExiting])

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -100,
      rotateX: 15,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    },
    authenticating: {
      scale: [1, 1.02, 1],
      rotateY: [0, 2, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={onAnimationComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop with blur effect */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            variants={backdropVariants}
          />
          
          {/* Centered Auth Card */}
          <motion.div
            className="relative w-full max-w-md"
            variants={cardVariants}
            initial="hidden"
            animate={isAuthenticating ? "authenticating" : "visible"}
            exit="exit"
            onAnimationComplete={() => {
              if (isExiting) {
                onAnimationComplete()
              }
            }}
          >
            {/* Card Container */}
            <div className="relative glassmorphism rounded-2xl p-8 shadow-2xl">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-orange-500/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Content */}
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthCard
