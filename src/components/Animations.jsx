import { useEffect, useRef, useState } from 'react'

/**
 * AnimatedCounter Component
 * 
 * Counts up to a target number when scrolled into view
 * Modern UX trend for stats and metrics
 */
export const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    const currentRef = counterRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <span ref={counterRef}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/**
 * ScrollReveal Component
 * 
 * Reveals children with animation when scrolled into view
 * Implements modern scroll-driven animations
 */
export const ScrollReveal = ({ children, animation = 'fade-up', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = elementRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay])

  const animations = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-down': 'opacity-0 -translate-y-8',
    'fade-left': 'opacity-0 translate-x-8',
    'fade-right': 'opacity-0 -translate-x-8',
    'scale': 'opacity-0 scale-95',
    'zoom-in': 'opacity-0 scale-75',
  }

  const baseClasses = 'transition-all duration-700 ease-out'
  const initialClasses = animations[animation] || animations['fade-up']
  const visibleClasses = 'opacity-100 translate-y-0 translate-x-0 scale-100'

  return (
    <div
      ref={elementRef}
      className={`${baseClasses} ${isVisible ? visibleClasses : initialClasses} ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * GradientMesh Component
 * 
 * Creates modern animated gradient mesh background
 * 2026 design trend - organic, flowing gradients
 */
export const GradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
    </div>
  )
}

/**
 * FloatingCard Component
 * 
 * Card with subtle floating animation on hover
 * Modern micro-interaction
 */
export const FloatingCard = ({ children, className = '' }) => {
  return (
    <div className={`transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Magnetic Button Component
 * 
 * Button that follows mouse movement (magnetic effect)
 * Advanced UX trend for 2026
 */
export const MagneticButton = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 5
    const y = (e.clientY - rect.top - rect.height / 2) / 5

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      {children}
    </button>
  )
}

/**
 * ParallaxSection Component
 * 
 * Section with parallax scrolling effect
 * Creates depth and visual interest
 */
export const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const [offsetY, setOffsetY] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = window.pageYOffset
      setOffsetY(scrolled * speed)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div style={{ transform: `translateY(${offsetY}px)` }}>
        {children}
      </div>
    </div>
  )
}
