import { useEffect } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import HeroNew from './components/HeroNew.jsx'
import AgentsShowcase from './components/AgentsShowcase.jsx'
import FeaturesScroll from './components/FeaturesScroll.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import FooterNew from './components/FooterNew.jsx'
import { useReducedMotion } from './hooks/useReducedMotion.js'

function App() {
  const reducedMotion = useReducedMotion()

  const handleSignupClick = (planId = null, period = 'monthly') => {
    let url = 'https://app.thelabelai.com/login'
    if (planId && planId !== 'free') {
      url += `?plan=${encodeURIComponent(planId)}`
      if (period) url += `&period=${encodeURIComponent(period)}`
    }
    window.location.href = url
  }

  const handleLoginClick = () => {
    window.location.href = 'https://app.thelabelai.com/login'
  }

  useEffect(() => {
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a')
      const href = anchor?.getAttribute('href')
      if (!href?.startsWith('#')) return

      const target = document.querySelector(href)
      if (!target) return

      event.preventDefault()
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [reducedMotion])

  return (
    <div className="app-root overflow-x-hidden">
      <Header onSignupClick={handleSignupClick} onLoginClick={handleLoginClick} />
      <main id="main-content" tabIndex="-1">
        <HeroNew onSignupClick={handleSignupClick} />
        <AgentsShowcase />
        <FeaturesScroll onSignupClick={handleSignupClick} />
        <Pricing onSignupClick={handleSignupClick} />
        <Testimonials />
        <FAQ />
      </main>
      <FooterNew onSignupClick={handleSignupClick} />
    </div>
  )
}

export default App
