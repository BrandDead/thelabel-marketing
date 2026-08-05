import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import strongLogo from '../assets/pasted_file_8nQJT8_theLABEL-stronglogo.png'

gsap.registerPlugin(ScrollTrigger)

const HeroNew = ({ onSignupClick }) => {
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(logoRef.current, { opacity: 0, scale: 0.6, filter: 'blur(20px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2 })
        .fromTo(headlineRef.current?.children, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, '-=0.4')
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .fromTo(ctaRef.current?.children, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 }, '-=0.2')
        .fromTo(statsRef.current?.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.1')

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Fade out hero on scroll
      gsap.to(heroRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0A0B0F]" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF5000 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #29C5F6 0%, transparent 70%)' }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-10 opacity-0">
          <img src={strongLogo} alt="theLABEL" className="h-20 md:h-28 w-auto mx-auto" style={{ filter: 'drop-shadow(0 0 40px rgba(255,80,0,0.4))' }} />
        </div>

        {/* Headlines */}
        <div ref={headlineRef} className="mb-8 overflow-hidden">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-4"
            style={{ textShadow: '0 0 80px rgba(255,80,0,0.3)' }}>
            NO MORE
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
            style={{ background: 'linear-gradient(135deg, #FF5000, #FF7A00, #29C5F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            360 DEALS.
          </h1>
        </div>

        {/* Subheadline */}
        <p ref={subRef} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0">
          Your AI-powered record label. The same tools major labels use to build superstars —{' '}
          <span className="text-[#29C5F6] font-semibold">now in your hands.</span>{' '}
          No gatekeepers. No middlemen. Just you and your art.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button
            onClick={() => onSignupClick('free')}
            className="group relative px-10 py-4 text-lg font-bold text-white rounded-full overflow-hidden transition-transform duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF5000, #FF7A00)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              ⚡ START FOR FREE
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <a
            href="#agents"
            className="px-10 py-4 text-lg font-semibold text-white rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            See Your AI Team →
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: '8', label: 'AI Agents', suffix: '' },
            { value: '24', label: 'Hour Coverage', suffix: '/7' },
            { value: '100', label: 'Independent', suffix: '%' },
          ].map(({ value, label, suffix }) => (
            <div key={label} className="text-center opacity-0">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">
                {value}<span className="text-[#FF5000]">{suffix}</span>
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
      </div>
    </section>
  )
}

export default HeroNew
