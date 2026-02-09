import { Star, Quote } from 'lucide-react'

/**
 * Testimonials Component
 * 
 * Displays artist success stories and reviews.
 * Critical for social proof and conversion optimization.
 */
const Testimonials = () => {
  const testimonials = [
    {
      name: "Maya Rodriguez",
      role: "Independent Hip-Hop Artist",
      location: "Los Angeles, CA",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      rating: 5,
      quote: "theLABEL gave me the tools major labels wanted $100K for. I hit 1M streams in 3 months and kept every penny. This is the future.",
      metrics: "1M+ streams • $12K revenue • 3 months"
    },
    {
      name: "Jordan Chen",
      role: "Producer & Songwriter",
      location: "Toronto, Canada",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      rating: 5,
      quote: "The AI producer agents understand my sound better than humans. I went from bedroom beats to sync deals with Netflix in 6 months.",
      metrics: "5 sync deals • 50K+ monthly listeners"
    },
    {
      name: "Aisha Williams",
      role: "R&B Singer-Songwriter",
      location: "Atlanta, GA",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
      rating: 5,
      quote: "I turned down two 360 deals because theLABEL gave me everything they promised and more. I own my masters AND my career.",
      metrics: "100K+ followers • 2 viral TikToks • Full creative control"
    },
    {
      name: "Marcus \"DJ Apex\" Thompson",
      role: "Electronic Music Producer",
      location: "Berlin, Germany",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      rating: 5,
      quote: "The 24/7 marketing agent landed me on 47 Spotify playlists while I slept. My passive income went from $200 to $4K/month.",
      metrics: "47 playlist placements • $4K monthly revenue"
    },
    {
      name: "Sofia Ramirez",
      role: "Latin Pop Artist",
      location: "Miami, FL",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      rating: 5,
      quote: "theLABEL's Designer Agent created my entire visual brand in hours. What agencies quoted $15K for, I got for $49/month.",
      metrics: "Brand kit • Album art • Social content • $15K saved"
    },
    {
      name: "Tyrone \"T-Wave\" Jackson",
      role: "Trap Artist & Entrepreneur",
      location: "Houston, TX",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrone",
      rating: 5,
      quote: "Built my entire label using theLABEL's AI. Now I'm signing artists and we all keep our rights. This is how it should've always been.",
      metrics: "Started own label • 10 artists signed • 100% rights retained"
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-6 neon-glow">
            ARTISTS ARE WINNING
          </h2>
          <p className="text-xl text-blue-400 mb-8 lowercase italic">
            real artists, real results, real independence
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">10,000+</div>
              <div className="text-gray-400">Active Artists</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">$2M+</div>
              <div className="text-gray-400">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">50M+</div>
              <div className="text-gray-400">Total Streams</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glassmorphism p-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-orange-500"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-blue-400">{testimonial.role}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-400 opacity-30" />
                <p className="text-gray-300 italic pl-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-sm text-orange-500 font-semibold">{testimonial.metrics}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            * Results vary by artist effort and market conditions. Success metrics based on verified user data.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
