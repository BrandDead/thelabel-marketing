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
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          {/* Backdrop with blur effect */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            variants={backdropVariants}
          />
          
          {/* Perfectly Centered Auth Card */}
          <motion.div
            className="relative w-full max-w-md mx-auto"
            variants={cardVariants}
            initial="hidden"
            animate={isAuthenticating ? "authenticating" : "visible"}
            exit="exit"
            onAnimationComplete={() => {
              if (isExiting) {
                onAnimationComplete()
              }
            }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '28rem',
              margin: '0 auto',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%'
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
