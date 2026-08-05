import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const agents = [
  {
    id: 'manager',
    name: 'Artist Manager',
    role: 'Your Command Center',
    description: 'The first agent you meet. Orchestrates all departments, handles high-level strategy, and routes requests to the right specialist.',
    color: '#FF5000',
    glow: 'rgba(255,80,0,0.3)',
    emoji: '🎯',
    capabilities: ['Career strategy', 'Goal tracking', 'Department routing', 'Meeting facilitation'],
  },
  {
    id: 'ar',
    name: 'A&R Agent',
    role: 'Talent & Trends',
    description: 'Scans the industry 24/7 for collaboration opportunities, emerging trends, and placement deals before they blow up.',
    color: '#29C5F6',
    glow: 'rgba(41,197,246,0.3)',
    emoji: '🔍',
    capabilities: ['Trend analysis', 'Collab discovery', 'Playlist pitching', 'Market intel'],
  },
  {
    id: 'pr',
    name: 'PR Agent',
    role: 'Your Public Image',
    description: 'Trains you for interviews, crafts press releases, and manages your narrative. Includes the PR Trainer for live practice sessions.',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.3)',
    emoji: '📣',
    capabilities: ['Interview prep', 'Press releases', 'Crisis management', 'Brand narrative'],
  },
  {
    id: 'design',
    name: 'Design Agent',
    role: 'Visual Identity',
    description: 'Generates cover art, merch mockups, social content, and brand assets. Understands your aesthetic and stays consistent.',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.3)',
    emoji: '🎨',
    capabilities: ['Cover art', 'Merch design', 'Social graphics', 'Brand consistency'],
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    role: 'Growth Engine',
    description: 'Runs your social media, fan engagement, playlist outreach, and release campaigns around the clock.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.3)',
    emoji: '📈',
    capabilities: ['Social media', 'Release campaigns', 'Fan engagement', 'Analytics'],
  },
  {
    id: 'songwriter',
    name: 'Songwriter Agent',
    role: 'Creative Partner',
    description: 'Co-writes lyrics, suggests melodies, generates hooks, and helps you break through creative blocks at any hour.',
    color: '#EC4899',
    glow: 'rgba(236,72,153,0.3)',
    emoji: '✍️',
    capabilities: ['Lyric writing', 'Hook generation', 'Melody ideas', 'Song structure'],
  },
  {
    id: 'producer',
    name: 'Producer Agent',
    role: 'Beat Architect',
    description: 'Guides production decisions, suggests arrangements, and powers the BeatBox Studio where you make beats with your mouth.',
    color: '#6366F1',
    glow: 'rgba(99,102,241,0.3)',
    emoji: '🎹',
    capabilities: ['Beat guidance', 'BeatBox Studio', 'Arrangement tips', 'Sound design'],
  },
  {
    id: 'engineer',
    name: 'Engineer Agent',
    role: 'Sound Perfection',
    description: 'Handles mixing notes, mastering guidance, technical audio analysis, and quality control for every release.',
    color: '#14B8A6',
    glow: 'rgba(20,184,166,0.3)',
    emoji: '🎚️',
    capabilities: ['Mix feedback', 'Master guidance', 'Audio analysis', 'Quality control'],
  },
]

const AgentCard = ({ agent, index }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay: (index % 4) * 0.1,
      }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="relative group rounded-2xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 cursor-default overflow-hidden opacity-0"
      style={{ '--agent-color': agent.color }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${agent.glow} 0%, transparent 70%)` }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)` }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{agent.emoji}</div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full border" style={{ color: agent.color, borderColor: `${agent.color}40`, background: `${agent.color}10` }}>
            {agent.role}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{agent.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {agent.capabilities.map((cap) => (
            <span key={cap} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
              {cap}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const AgentsShowcase = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="agents" ref={sectionRef} className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B0F] via-[#0D0F15] to-[#0A0B0F]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF5000]/30 bg-[#FF5000]/5 text-[#FF5000] text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5000] animate-pulse" />
            Your AI Department Heads
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            8 Agents Working<br />
            <span style={{ background: 'linear-gradient(135deg, #FF5000, #29C5F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              24/7 For You
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every department a major label has — replicated in AI and available the moment you need them.
          </p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm mb-4">All agents available on every paid plan</p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-[#29C5F6] hover:text-white transition-colors font-semibold"
          >
            See pricing plans →
          </a>
        </div>
      </div>
    </section>
  )
}

export default AgentsShowcase
