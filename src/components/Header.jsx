import { useEffect, useState } from 'react'
import BrandMark from './BrandMark.jsx'

const navigation = [
  ['Features', '#features'],
  ['Agents', '#agents'],
  ['Pricing', '#pricing'],
  ['About', '#about'],
]

const Header = ({ onSignupClick, onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled
          ? 'border-white/10 bg-[color:var(--color-canvas)]/95 shadow-[0_12px_32px_rgb(0_0_0_/_24%)]'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <a href="/" className="rounded-sm" aria-label="theLABEL home">
          <BrandMark size="header" />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-[color:var(--color-text-muted)] transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onLoginClick}
            className="rounded-md px-3 py-2 text-sm font-medium text-[color:var(--color-text-muted)] transition-colors hover:text-white"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => onSignupClick('free')}
            className="tl-action min-h-11 rounded-[var(--radius-control)] px-4 py-2 text-sm font-semibold"
          >
            Request beta access
          </button>
        </div>

        <button
          type="button"
          className="min-h-11 min-w-11 rounded-[var(--radius-control)] border border-white/10 p-2 text-white md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-6 bg-current transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 bg-current transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-current transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[color:var(--color-canvas)] px-5 py-5 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {navigation.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-[var(--radius-control)] px-3 py-3 text-base font-medium text-[color:var(--color-text)] hover:bg-white/5"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mx-auto mt-4 grid max-w-7xl gap-3 border-t border-white/10 pt-4">
            <button type="button" onClick={onLoginClick} className="tl-outline-action min-h-11 rounded-[var(--radius-control)] px-4 py-3 text-sm font-semibold">
              Sign in
            </button>
            <button type="button" onClick={() => { onSignupClick('free'); setMobileOpen(false) }} className="tl-action min-h-11 rounded-[var(--radius-control)] px-4 py-3 text-sm font-semibold">
              Request beta access
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
