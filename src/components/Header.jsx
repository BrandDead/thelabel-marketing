import { useState, useEffect } from 'react'
import strongLogo from '../assets/pasted_file_8nQJT8_theLABEL-stronglogo.png'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0B0F]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <img src={strongLogo} alt="theLABEL" className="h-8 w-auto transition-all duration-300 group-hover:brightness-125" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {[['Features','#features'],['Agents','#agents'],['Pricing','#pricing'],['About','#about']].map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 tracking-wide uppercase">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={onLoginClick} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Sign In
          </button>
          <button
            onClick={() => onSignupClick('free')}
            className="relative px-6 py-2.5 text-sm font-bold text-white rounded-full overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, #FF5000, #FF7A00)' }}
          >
            <span className="relative z-10">GET STARTED FREE</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0A0B0F]/98 backdrop-blur-xl border-t border-white/5 px-6 py-6">
          <nav className="flex flex-col gap-4 mb-6">
            {[['Features','#features'],['Agents','#agents'],['Pricing','#pricing'],['About','#about']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)} className="text-base font-medium text-gray-300 hover:text-white transition-colors py-2 border-b border-white/5">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <button onClick={onLoginClick} className="w-full py-3 text-center text-gray-300 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Sign In</button>
            <button onClick={() => { onSignupClick('free'); setMobileOpen(false) }} className="w-full py-3 text-center font-bold text-white rounded-xl" style={{ background: 'linear-gradient(135deg, #FF5000, #FF7A00)' }}>GET STARTED FREE</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
