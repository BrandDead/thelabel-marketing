import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 'beatbox',
    title: 'BeatBox Studio',
    tagline: 'Make beats with your mouth',
    description: 'No musical training needed. Hum a rhythm, sing a melody, describe a sound — BeatBox converts your voice into professional MIDI beats with real VST instruments.',
    color: '#6366F1',
    bg: 'from-indigo-950 to-[#0A0B0F]',
    icon: '🎤',
    steps: ['Record your voice', 'AI converts to MIDI', 'Choose your instrument', 'Export studio quality'],
  },
  {
    id: 'pr-trainer',
    title: 'PR Trainer',
    tagline: 'Master every interview',
    description: 'Practice with AI versions of real interviewers — from Charlamagne to Howard Stern. Get scored on your answers, dodge gossip traps, and leave every interview memorable.',
    color: '#A855F7',
    bg: 'from-purple-950 to-[#0A0B0F]',
    icon: '🎙️',
    steps: ['Pick your interviewer', 'Answer live questions', 'Get real-time feedback', 'Track your improvement'],
  },
  {
    id: 'design',
    title: 'Design Agent',
    tagline: 'Your visual identity on demand',
    description: 'Generate cover art, merch mockups, social posts, and brand assets in seconds. The AI understands your aesthetic and keeps everything consistent.',
    color: '#F59E0B',
    bg: 'from-amber-950 to-[#0A0B0F]',
    icon: '🎨',
    steps: ['Describe your vision', 'AI generates options', 'Refine with feedback', 'Download & publish'],
  },
  {
    id: 'marketing',
    title: 'Marketing Machine',
    tagline: 'Your team never sleeps',
    description: 'Automated playlist pitching, social scheduling, fan engagement, and release campaigns. Your marketing agent works 24/7 while you focus on creating.',
    color: '#10B981',
    bg: 'from-emerald-950 to-[#0A0B0F]',
    icon: '📈',
    steps: ['Set your goals', 'AI builds campaigns', 'Automate outreach', 'Track results live'],
  },
]

const FeaturePanel = ({ feature, index }) => {
  const panelRef = useRef(null)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [index])

  return (
    <div
      ref={panelRef}
      className={`relative rounded-3xl overflow-hidden border border-white/5 opacity-0`}
      style={{ background: `linear-gradient(135deg, ${feature.color}15 0%, #0A0B0F 60%)` }}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }} />

      <div className="grid md:grid-cols-2 gap-0 min-h-[400px]">
        {/* Content */}
        <div className="p-10 flex flex-col justify-center">
          <div className="text-5xl mb-4">{feature.icon}</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4 w-fit"
            style={{ color: feature.color, borderColor: `${feature.color}40`, background: `${feature.color}10` }}>
            {feature.tagline}
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">{feature.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-8">{feature.description}</p>
          <a href="https://app.thelabelai.com/login" className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80" style={{ color: feature.color }}>
            Try it now →
          </a>
        </div>

        {/* Steps */}
        <div className="p-10 flex flex-col justify-center border-l border-white/5">
          <p className="text-xs uppercase tracking-widest text-gray-600 mb-6">How it works</p>
          <div className="space-y-4">
            {feature.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${feature.color}20`, color: feature.color, border: `1px solid ${feature.color}40` }}>
                  {i + 1}
                </div>
                <span className="text-gray-300 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const FeaturesScroll = ({ onSignupClick }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 -z-10 bg-[#0A0B0F]" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#29C5F6]/30 bg-[#29C5F6]/5 text-[#29C5F6] text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#29C5F6] animate-pulse" />
            Signature Features
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Tools That Actually<br />
            <span style={{ background: 'linear-gradient(135deg, #29C5F6, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Move the Needle
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Not just another dashboard. These are the tools that change how independent artists operate.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, i) => (
            <FeaturePanel key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => onSignupClick('creator')}
            className="px-10 py-4 text-lg font-bold text-white rounded-full transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF5000, #FF7A00)' }}
          >
            Access All Features Free →
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesScroll
