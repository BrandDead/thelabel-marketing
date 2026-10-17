import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import strongLogo from '../assets/pasted_file_8nQJT8_theLABEL-stronglogo.png'
import { DASHBOARD_LOGIN_URL, STORES_URL, SUPPORT_MAILTO } from '../lib/urls.js'

gsap.registerPlugin(ScrollTrigger)

const productLinks = [
  ['Features', '#features'],
  ['AI Agents', '#agents'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
  ['Artist dashboard', DASHBOARD_LOGIN_URL],
  ['Artist stores', STORES_URL],
]

const companyLinks = [
  ['Contact', SUPPORT_MAILTO],
]

const legalLinks = [
  ['Privacy Policy', '/privacy'],
  ['Terms of Service', '/terms'],
]

const FooterNew = ({ onSignupClick }) => {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative border-t border-white/5 bg-[#0A0B0F] opacity-0" role="contentinfo">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          Ready to Run Your Own<br />
          <span style={{ background: 'linear-gradient(135deg, #FF5000, #29C5F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Label?
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Explore the artist dashboard beta. Check available tools and plan limits before upgrading.
        </p>
        <button
          type="button"
          onClick={() => onSignupClick('free')}
          className="px-12 py-4 text-lg font-bold text-white rounded-full transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FF5000, #FF7A00)' }}
        >
          Explore the Beta
        </button>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <img src={strongLogo} alt="theLABEL AI - AI-Powered Record Label Platform" className="h-10 w-auto mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                theLABEL is a label-inspired AI support platform for independent artists. Explore department-led guidance in the artist dashboard beta; tool availability varies by release stage.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                {productLinks.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-gray-500 hover:text-white transition-colors text-sm">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                {companyLinks.concat(legalLinks).map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-gray-500 hover:text-white transition-colors text-sm">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} theLABEL AI, Inc. All rights reserved. Built by artists, for artists.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <a href={DASHBOARD_LOGIN_URL} className="hover:text-white transition-colors">Dashboard</a>
              <a href={STORES_URL} className="hover:text-white transition-colors">Stores</a>
              <a href={SUPPORT_MAILTO} className="hover:text-white transition-colors">Support</a>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-700 leading-relaxed">
            <p>
              theLABEL AI is developing an artist-support dashboard for unsigned artists, independent musicians, producers, and songwriters. Explore AI guidance across Manager, A&R, PR, Design, Marketing, Songwriter, Producer, and Engineer departments. Studio and automation workflows are still being refined; beta access is not a promise of distribution, unattended outreach, or professional audio output.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterNew
