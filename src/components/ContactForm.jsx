import { useState } from 'react'
import { Send, Mail, MessageSquare, User } from 'lucide-react'

/**
 * ContactForm Component
 * 
 * Modern contact form with validation
 * Critical for lead generation and support
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' })
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      setIsSubmitting(false)
      return
    }

    try {
      // TODO: Replace with actual API endpoint
      // For now, simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, send to support@thelabelai.com or your backend
      console.log('Form submitted:', formData)
      
      setStatus({ 
        type: 'success', 
        message: 'Thanks for reaching out! We\'ll get back to you within 24 hours.' 
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again or email us at support@thelabelai.com' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-purple-900 to-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-white mb-6 neon-glow">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-blue-400 mb-8 lowercase italic">
            questions? feedback? ready to level up? we're here
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="glassmorphism p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                  <a href="mailto:support@thelabelai.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    support@thelabelai.com
                  </a>
                  <p className="text-sm text-gray-400 mt-2">Response within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="glassmorphism p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Live Chat</h3>
                  <p className="text-gray-300">Monday - Friday, 9am - 5pm EST</p>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm mt-2">
                    Start Chat →
                  </button>
                </div>
              </div>
            </div>

            <div className="glassmorphism p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">TikTok</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">YouTube</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glassmorphism p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                  placeholder="Tell us what's on your mind..."
                  required
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${
                  status.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 electric-pulse"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
