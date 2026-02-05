import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button.jsx'
import { Play, ArrowRight, Zap, Crown, Target } from 'lucide-react'
import strongLogo from '../assets/pasted_file_8nQJT8_theLABEL-stronglogo.png'

const Hero = ({ onSignupClick }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [crackScreen, setCrackScreen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    // Trigger screen crack effect after logo animation
    setTimeout(() => setCrackScreen(true), 1500)
  }, [])

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 ${crackScreen ? 'screen-crack' : ''}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Pattern overlay - using inline style to avoid JSX parsing issues with complex data URLs */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF5000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Animated Logo */}
        <div className={`mb-8 ${isLoaded ? 'logo-charge' : 'opacity-0'}`}>
          <img 
            src={strongLogo} 
            alt="theLABEL" 
            className="h-32 w-auto mx-auto mb-6"
          />
        </div>

        {/* Main Headlines */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 neon-glow">
            NO MORE 360 DEALS
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-[#29C5F6] mb-8 lowercase italic">
            the future belongs to independent artists
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Stop eating off crumbs. It's time for creatives to eat off their creativity. 
            Build your empire from concept to concert with AI-powered tools that rival major labels.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            onClick={onSignupClick}
            size="lg"
            className="bg-[#FF5000] hover:bg-[#FF5000]/80 text-white text-xl px-12 py-6 electric-pulse"
          >
            <Zap className="mr-2" />
            SIGN UP FREE
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-[#29C5F6] text-[#29C5F6] hover:bg-[#29C5F6] hover:text-white text-xl px-12 py-6"
          >
            <Play className="mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Key Value Props */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glassmorphism p-6 rounded-lg">
            <Crown className="h-12 w-12 text-[#FF5000] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">YOUR LABEL, YOUR RULES</h3>
            <p className="text-gray-300">Control your career with industry-grade tools. No contracts, no commitments, just pure creative freedom.</p>
          </div>
          
          <div className="glassmorphism p-6 rounded-lg">
            <Target className="h-12 w-12 text-[#29C5F6] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">24/7 AI WORKFORCE</h3>
            <p className="text-gray-300">Grammy-winning producers, managers, and marketers working around the clock for YOUR success.</p>
          </div>
          
          <div className="glassmorphism p-6 rounded-lg">
            <ArrowRight className="h-12 w-12 text-[#FF5000] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">CONCEPT TO CONCERT</h3>
            <p className="text-gray-300">From bedroom beats to sold-out shows. We handle everything while you focus on creating hits.</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Trusted by independent artists worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-gray-400">Artists</div>
            <div className="text-2xl font-bold text-white">1M+</div>
            <div className="text-gray-400">Streams Generated</div>
            <div className="text-2xl font-bold text-white">$2M+</div>
            <div className="text-gray-400">Revenue Created</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

