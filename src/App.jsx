import './App.css'
import Pricing from './components/Pricing.jsx'

function App() {
  const handleSignupClick = (planId, period) => {
    // Redirect directly to dashboard login page
    // This prevents the double OAuth issue by delegating all authentication to the dashboard
    // Pass plan selection as query parameters so dashboard can pre-select the plan
    let url = 'https://app.thelabelai.com/login'
    if (planId && planId !== 'free') {
      url += `?plan=${encodeURIComponent(planId)}`
      if (period) {
        url += `&period=${encodeURIComponent(period)}`
      }
    }
    window.location.href = url
  }

  const handleLoginClick = () => {
    // Redirect directly to dashboard login page
    window.location.href = 'https://app.thelabelai.com/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glassmorphism">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a href="/" className="text-2xl font-bold text-white hover:text-orange-500 transition-colors">
                theLABEL
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLoginClick}
                className="text-white hover:text-orange-500 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => handleSignupClick('free')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                GET STARTED FREE
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 neon-glow">
            NO MORE 360 DEALS
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-blue-400 mb-8 lowercase italic">
            the future belongs to independent artists
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Stop eating off crumbs. It's time for creatives to eat off their creativity. 
            Build your empire from concept to concert with AI-powered tools that rival major labels.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => handleSignupClick('free')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-12 py-6 rounded-lg transition-colors electric-pulse"
            >
              SIGN UP FREE
            </button>
            <a 
              href="#pricing"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-xl px-12 py-6 rounded-lg transition-colors"
            >
              View Plans
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glassmorphism p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">YOUR LABEL, YOUR RULES</h3>
              <p className="text-gray-300">Control your career with industry-grade tools. No contracts, no commitments, just pure creative freedom.</p>
            </div>
            
            <div className="glassmorphism p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">24/7 AI WORKFORCE</h3>
              <p className="text-gray-300">Grammy-winning producers, managers, and marketers working around the clock for YOUR success.</p>
            </div>
            
            <div className="glassmorphism p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">CONCEPT TO CONCERT</h3>
              <p className="text-gray-300">From bedroom beats to sold-out shows. We handle everything while you focus on creating hits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-slate-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6 neon-glow">
              YOUR LABEL, YOUR RULES
            </h2>
            <p className="text-xl text-blue-400 mb-8 lowercase italic">
              control your career with industry-grade tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Grammy-Winning AI Producers", desc: "Access replicated AI versions of legendary producers, writers, and executives." },
              { title: "24/7 Marketing Machine", desc: "Your AI marketing team never sleeps. Playlist outreach and fan engagement running around the clock." },
              { title: "Smart A&R Discovery", desc: "AI-powered trend analysis finds collaboration opportunities before they blow up." },
              { title: "Professional Studio Tools", desc: "BeatBox AI, Lyric Lab, and songwriting assistants that rival expensive studio equipment." },
              { title: "Designer Agent", desc: "Generate cover art, merch designs, and marketing materials with AI that understands your brand." },
              { title: "Revenue Optimization", desc: "Monetize every interaction. Track earnings from streams, merch, and fan engagement in real-time." }
            ].map((feature, index) => (
              <div key={index} className="glassmorphism p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing onSignupClick={handleSignupClick} />

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-slate-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black text-white mb-6 neon-glow">
              BUILT BY ARTISTS, FOR ARTISTS
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We've been in the trenches. We've seen the contracts. We've watched talented artists 
              get exploited by an industry that profits from their creativity while leaving them with crumbs.
            </p>
            <p className="text-xl text-blue-400 mb-8 italic">
              That ends now.
            </p>
            <p className="text-lg text-gray-300">
              theLABEL is the great equalizer. The same tools, connections, and strategies that 
              major labels use to build superstars - now in your hands. No gatekeepers. No middlemen. 
              Just you and your art, amplified by AI that works 24/7 to make you successful.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">theLABEL</div>
              <p className="text-gray-400">
                Empowering independent artists with AI-powered tools and industry connections.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} theLABEL. All rights reserved. Built by artists, for artists.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
