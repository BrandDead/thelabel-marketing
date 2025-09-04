import { Button } from '../components/ui/button.jsx'
import { ArrowRight, Shield, Users, Zap } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-900 to-purple-900">
      <div className="container mx-auto px-4">
        {/* Main Story */}
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 neon-glow">
              DAVID VS GOLIATH
            </h2>
            <p className="text-xl md:text-2xl text-[#29C5F6] mb-8 lowercase italic">
              the revolution starts with you
            </p>
          </div>

          {/* Story Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: The Problem */}
            <div className="glassmorphism p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-6">The Problem</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  For decades, record labels have held artists hostage with 360 deals, taking everything 
                  while providing the minimum. They controlled the studios, the connections, the marketing, 
                  and the money.
                </p>
                <p>
                  Artists were forced to choose: stay independent and struggle alone, or sign away their 
                  souls for a chance at success. The gatekeepers decided who made it and who didn't.
                </p>
                <p className="text-[#FF5000] font-semibold">
                  But what if there was a third option?
                </p>
              </div>
            </div>

            {/* Right: The Solution */}
            <div className="glassmorphism p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-6">The Solution</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  theLABEL gives you everything a major label provides - Grammy-winning producers, 
                  24/7 marketing teams, industry connections, professional tools - without taking 
                  a single penny of your royalties.
                </p>
                <p>
                  Our AI agents work around the clock, trained on decades of successful campaigns 
                  and industry knowledge. You get the power of a major label with the freedom of 
                  independence.
                </p>
                <p className="text-[#29C5F6] font-semibold">
                  This is the end of record labels as we know them.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="text-center mb-16">
            <div className="glassmorphism p-12 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-4xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                "They gave us labels, and now we want our label back. This is the death of 360 deals. 
                We're building the platform that levels the playing field and gives every artist the 
                tools to build their empire from concept to concert."
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF5000] mb-2">0%</div>
                  <div className="text-gray-400">Royalty Claims</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#29C5F6] mb-2">100%</div>
                  <div className="text-gray-400">Artist Ownership</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF5000] mb-2">∞</div>
                  <div className="text-gray-400">Creative Freedom</div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center glassmorphism p-6 rounded-xl">
              <Shield className="h-12 w-12 text-[#FF5000] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Artist First</h4>
              <p className="text-gray-300">
                Every decision we make prioritizes artist success and creative freedom. 
                Your art, your rules, your profits.
              </p>
            </div>
            
            <div className="text-center glassmorphism p-6 rounded-xl">
              <Users className="h-12 w-12 text-[#29C5F6] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Community Driven</h4>
              <p className="text-gray-300">
                Built by artists, for artists. We understand the struggle because we've lived it. 
                This platform grows with our community.
              </p>
            </div>
            
            <div className="text-center glassmorphism p-6 rounded-xl">
              <Zap className="h-12 w-12 text-[#FF5000] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Innovation First</h4>
              <p className="text-gray-300">
                We're not just keeping up with the industry - we're defining its future. 
                AI-powered tools that actually work for artists.
              </p>
            </div>
          </div>

          {/* The Team Teaser */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">Built by Artists, For Artists</h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Our team includes Grammy-nominated producers, platinum-selling songwriters, and tech innovators 
              who've experienced both sides of the industry. We know what artists need because we are artists.
            </p>
            <div className="flex justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-gray-400 text-sm">Years Combined</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50M+</div>
                <div className="text-gray-400 text-sm">Streams Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-gray-400 text-sm">Artists Helped</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="glassmorphism p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Join the Revolution?
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                The music industry will never be the same. The question is: 
                will you be part of the change, or will you watch from the sidelines?
              </p>
              <Button 
                size="lg"
                className="bg-[#FF5000] hover:bg-[#FF5000]/80 text-white px-8 py-4 text-lg font-semibold electric-pulse"
              >
                Start Your Revolution
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

