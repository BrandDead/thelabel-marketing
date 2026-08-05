import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import strongLogo from '../assets/pasted_file_8nQJT8_theLABEL-stronglogo.png'

gsap.registerPlugin(ScrollTrigger)

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
      {/* Pre-footer CTA */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          Ready to Run Your Own<br />
          <span style={{ background: 'linear-gradient(135deg, #FF5000, #29C5F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Label?
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of independent artists using AI to compete with the majors. Start free, upgrade when you're ready.
        </p>
        <button
          onClick={() => onSignupClick('free')}
          className="px-12 py-4 text-lg font-bold text-white rounded-full transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FF5000, #FF7A00)' }}
        >
          ⚡ Start Free Today
        </button>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <img src={strongLogo} alt="theLABEL AI - AI-Powered Record Label Platform" className="h-10 w-auto mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                theLABEL is the AI-powered record label platform for independent artists. Access A&R, PR, design, marketing, songwriting, production, and engineering agents — all in one dashboard.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'TikTok', 'YouTube'].map((platform) => (
                  <a key={platform} href="#" aria-label={`theLABEL on ${platform}`}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all text-xs font-bold">
                    {platform[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                {[
                  ['Features', '#features'],
                  ['AI Agents', '#agents'],
                  ['Pricing', '#pricing'],
                  ['BeatBox Studio', 'https://app.thelabelai.com'],
                  ['PR Trainer', 'https://app.thelabelai.com'],
                  ['Design Agent', 'https://app.thelabelai.com'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-gray-500 hover:text-white transition-colors text-sm">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                {[
                  ['About', '#about'],
                  ['Blog', '#'],
                  ['Careers', '#'],
                  ['Press', '#'],
                  ['Contact', '#'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-gray-500 hover:text-white transition-colors text-sm">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                {[
                  ['Privacy Policy', '/privacy'],
                  ['Terms of Service', '/terms'],
                  ['Cookie Policy', '#'],
                  ['DMCA', '#'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-gray-500 hover:text-white transition-colors text-sm">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} theLABEL AI, Inc. All rights reserved. Built by artists, for artists.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <span>🔒 SOC 2 Compliant</span>
              <span>🛡️ GDPR Ready</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>

          {/* SEO Keywords (hidden visually but accessible) */}
          <div className="mt-8 text-xs text-gray-700 leading-relaxed">
            <p>
              theLABEL AI is an AI-powered record label platform for independent artists. Features include AI music production, AI songwriting assistant, AI marketing automation, AI A&R discovery, AI PR training, AI cover art generation, BeatBox vocal-to-MIDI studio, and 24/7 artist management. Available for unsigned artists, independent musicians, music producers, and songwriters. Plans starting free.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterNew
