import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DASHBOARD_LOGIN_URL } from '../lib/urls.js'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 'beatbox',
    title: 'BeatBox Studio',
    tagline: 'In development: beats from your voice',
    description: 'Our goal is to turn mouth-made rhythms and melodies into instrument-based beats. The full voice-to-MIDI and VST workflow is still in development and is not included as a working invited-beta feature.',
    color: '#6366F1',
    bg: 'from-indigo-950 to-[#0A0B0F]',
    icon: '🎤',
    steps: ['Capture a rhythm idea', 'Explore the prototype', 'MIDI and instruments: in development', 'Export quality: not yet verified'],
  },
  {
    id: 'pr-trainer',
    title: 'PR Trainer',
    tagline: 'Practice telling your story',
    description: 'Develop interview answers, rehearse your artist story, and practice handling difficult questions. Beta practice tools use AI guidance, not endorsed or verified replicas of real interviewers.',
    color: '#A855F7',
    bg: 'from-purple-950 to-[#0A0B0F]',
    icon: '🎙️',
    steps: ['Choose a practice topic', 'Draft your answers', 'Review AI feedback', 'Refine your artist story'],
  },
  {
    id: 'design',
    title: 'Design Agent',
    tagline: 'Shape your visual direction',
    description: 'Build a visual brief for cover art, merch, and social content. Image-generation and publishing tools depend on beta availability; review any output before use.',
    color: '#F59E0B',
    bg: 'from-amber-950 to-[#0A0B0F]',
    icon: '🎨',
    steps: ['Describe your vision', 'Develop a creative brief', 'Review available tools', 'Approve your next step'],
  },
  {
    id: 'marketing',
    title: 'Marketing Agent',
    tagline: 'Plan your next release',
    description: 'Work on campaign ideas, release timelines, and outreach drafts. You stay responsible for approvals and execution; automated pitching, scheduling, and live result tracking are not promised in beta.',
    color: '#10B981',
    bg: 'from-emerald-950 to-[#0A0B0F]',
    icon: '📈',
    steps: ['Set your goals', 'Draft a campaign plan', 'Review your outreach', 'Carry out approved actions'],
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
          <a href={DASHBOARD_LOGIN_URL} className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80" style={{ color: feature.color }}>
            Explore the beta dashboard →
          </a>
        </div>

        {/* Steps */}
        <div className="p-10 flex flex-col justify-center border-l border-white/5">
          <p className="text-xs uppercase tracking-widest text-gray-600 mb-6">Workflow direction</p>
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
            Beta Tools & Development
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Tools Built For<br />
            <span style={{ background: 'linear-gradient(135deg, #29C5F6, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Your Next Step
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the beta tools and the workflows we are building toward. Development concepts are not guarantees of live services.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, i) => (
            <FeaturePanel key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => onSignupClick('free')}
            className="px-10 py-4 text-lg font-bold text-white rounded-full transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF5000, #FF7A00)' }}
          >
            Explore the Beta Dashboard →
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesScroll
