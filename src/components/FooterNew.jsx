import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrandMark from './BrandMark.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

const productLinks = [
  ['Features', '#features'],
  ['AI departments', '#agents'],
  ['Beta access', '#pricing'],
]

const companyLinks = [
  ['About', '#about'],
  ['Privacy policy', '/privacy'],
  ['Terms of service', '/terms'],
]

const FooterNew = ({ onSignupClick }) => {
  const footerRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, footerRef)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <footer ref={footerRef} className="relative border-t border-white/10 bg-[color:var(--color-canvas)]" role="contentinfo">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6">
        <h2 className="text-balance text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
          Keep the art in front.
          <span className="block text-[color:var(--tl-crimson-500)]">Put the support system behind it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-8 text-[color:var(--color-text-muted)]">
          Join theLABEL&apos;s private beta to build alongside the artist tools and label departments that fit your next release.
        </p>
        <button
          type="button"
          onClick={() => onSignupClick('free')}
          className="tl-action mt-8 min-h-12 rounded-[var(--radius-control)] px-6 py-3 text-base font-semibold"
        >
          Request beta access
        </button>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[minmax(0,2fr)_1fr_1fr]">
          <div>
            <BrandMark size="footer" className="mb-5" />
            <p className="max-w-md text-sm leading-6 text-[color:var(--color-text-muted)]">
              An AI record-label workspace for independent artists who want a real team behind the release.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-3">
              {productLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="rounded-sm text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="rounded-sm text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-6 text-xs text-[color:var(--color-text-muted)] sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} theLABEL AI, Inc. All rights reserved.</p>
          <p>Private beta for independent artists.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterNew
