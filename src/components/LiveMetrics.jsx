import { useEffect, useState } from 'react'
import { TrendingUp, Users, Music, DollarSign } from 'lucide-react'
import { AnimatedCounter } from './Animations'

/**
 * LiveMetrics Component
 * 
 * Real-time (simulated) metrics dashboard widget
 * Shows platform activity and builds urgency
 */
const LiveMetrics = () => {
  const [metrics, setMetrics] = useState({
    activeArtists: 10247,
    songsCreated: 156892,
    totalStreams: 52847391,
    revenueGenerated: 2847592
  })

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeArtists: prev.activeArtists + Math.floor(Math.random() * 3),
        songsCreated: prev.songsCreated + Math.floor(Math.random() * 5),
        totalStreams: prev.totalStreams + Math.floor(Math.random() * 1000),
        revenueGenerated: prev.revenueGenerated + Math.floor(Math.random() * 50)
      }))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const metricsData = [
    {
      icon: <Users className="h-8 w-8" />,
      label: 'Active Artists',
      value: metrics.activeArtists,
      suffix: '+',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: <Music className="h-8 w-8" />,
      label: 'Songs Created',
      value: metrics.songsCreated,
      suffix: '+',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      label: 'Total Streams',
      value: metrics.totalStreams,
      suffix: '+',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      label: 'Revenue Generated',
      value: metrics.revenueGenerated,
      prefix: '$',
      suffix: '+',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">Live Platform Activity</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-6 neon-glow">
            THE NUMBERS DON'T LIE
          </h2>
          <p className="text-xl text-blue-400 mb-8 lowercase italic">
            thousands of artists are already winning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metricsData.map((metric, index) => (
            <div 
              key={index}
              className="glassmorphism p-6 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-full ${metric.bgColor} flex items-center justify-center mb-4 mx-auto`}>
                <div className={metric.color}>
                  {metric.icon}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-black ${metric.color} mb-2`}>
                  <AnimatedCounter 
                    end={metric.value} 
                    prefix={metric.prefix || ''}
                    suffix={metric.suffix || ''}
                  />
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wide font-semibold">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg mb-6">
            Join the movement. Your music career starts now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="glassmorphism px-6 py-3 rounded-lg">
              <span className="text-white font-semibold">⚡ Real-time updates</span>
            </div>
            <div className="glassmorphism px-6 py-3 rounded-lg">
              <span className="text-white font-semibold">📈 Growing daily</span>
            </div>
            <div className="glassmorphism px-6 py-3 rounded-lg">
              <span className="text-white font-semibold">🎵 100% independent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveMetrics
