import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Header from './components/Header.jsx'
import HeroNew from './components/HeroNew.jsx'
import AgentsShowcase from './components/AgentsShowcase.jsx'
import FeaturesScroll from './components/FeaturesScroll.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import FooterNew from './components/FooterNew.jsx'

gsap.registerPlugin(ScrollTrigger)

function App() {
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

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a')
      const href = anchor?.getAttribute('href')
      if (href?.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <div className="app-root bg-[#0A0B0F] text-white overflow-x-hidden">
      <Header onSignupClick={handleSignupClick} onLoginClick={handleLoginClick} />
      <main>
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
