import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrandMark from './BrandMark.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

const studioProof = [
  { value: '8', label: 'label departments' },
  { value: '1', label: 'artist workspace' },
  { value: 'Beta', label: 'founder access' },
]

const HeroNew = ({ onSignupClick }) => {
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const proofRef = useRef(null)
  const bgRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      gsap.set([logoRef.current, ...headlineRef.current.children, subRef.current, ...ctaRef.current.children, ...proofRef.current.children], {
        clearProps: 'all',
      })
      return undefined
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .fromTo(logoRef.current, { opacity: 0, y: 18, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.55 })
        .fromTo(headlineRef.current.children, { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, '-=0.2')
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.22')
        .fromTo(ctaRef.current.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, '-=0.12')
        .fromTo(proofRef.current.children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.07 }, '-=0.08')

      gsap.to(bgRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={heroRef} className="relative flex min-h-[min(820px,100svh)] items-center justify-center overflow-hidden px-5 pb-20 pt-28 sm:px-6 sm:pt-32">
      <div ref={bgRef} className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[color:var(--color-canvas)]" />
        <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(200_16_46_/_22%)_0%,transparent_66%)]" />
        <div className="absolute left-[20%] top-[24%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgb(41_197_246_/_12%)_0%,transparent_68%)]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgb(255_255_255_/_30%)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_30%)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <div ref={logoRef} className="mb-10">
          <BrandMark size="hero" decorative className="mx-auto drop-shadow-[0_12px_32px_rgb(200_16_46_/_24%)]" />
        </div>

        <div ref={headlineRef} className="mb-7">
          <h1 className="text-balance text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Build the career,
          </h1>
          <p className="mt-3 text-balance text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[color:var(--tl-crimson-500)] sm:text-7xl lg:text-8xl">
            not the chaos.
          </p>
        </div>

        <p ref={subRef} className="mx-auto max-w-2xl text-pretty text-lg leading-8 text-[color:var(--color-text-muted)] sm:text-xl">
          theLABEL gives independent artists an AI record-label team for strategy, story, sound, and rollout—built as a private beta around your actual work.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onSignupClick('free')}
            className="tl-action min-h-12 rounded-[var(--radius-control)] px-6 py-3 text-base font-semibold"
          >
            Request beta access
          </button>
          <a href="#agents" className="tl-outline-action min-h-12 rounded-[var(--radius-control)] px-6 py-3 text-base font-semibold">
            Meet your label team
          </a>
        </div>

        <dl ref={proofRef} className="mx-auto mt-16 grid max-w-2xl grid-cols-3 border-y border-white/10">
          {studioProof.map(({ value, label }) => (
            <div key={label} className="px-3 py-5 sm:px-6">
              <dt className="sr-only">{label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{value}</dd>
              <p className="mt-1 text-xs leading-4 text-[color:var(--color-text-muted)] sm:text-sm">{label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default HeroNew
