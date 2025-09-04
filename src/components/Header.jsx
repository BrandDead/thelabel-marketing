import { useState } from 'react'
import { Button } from '../components/ui/button.jsx'
import { Menu, X } from 'lucide-react'
import strongLogo from '../assets/pasted_file_8nQJT8_theLABEL-stronglogo.png'
import horizontalLogo from '../assets/pasted_file_8PrF8J_theLABEL_logo.png'

const Header = ({ onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 glassmorphism">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={strongLogo} 
              alt="theLABEL" 
              className="h-12 w-auto logo-charge"
            />
            <img 
              src={horizontalLogo} 
              alt="theLABEL" 
              className="h-8 w-auto hidden sm:block"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white hover:text-[#FF5000] transition-colors font-medium">
              Features
            </a>
            <a href="#pricing" className="text-white hover:text-[#FF5000] transition-colors font-medium">
              Pricing
            </a>
            <a href="#about" className="text-white hover:text-[#FF5000] transition-colors font-medium">
              About
            </a>
            <Button 
              variant="ghost" 
              onClick={onLoginClick}
              className="text-white hover:text-[#FF5000] hover:bg-white/10"
            >
              Sign In
            </Button>
            <Button 
              onClick={onSignupClick}
              className="bg-[#FF5000] hover:bg-[#FF5000]/80 text-white electric-pulse"
            >
              GET STARTED FREE
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#features" className="text-white hover:text-[#FF5000] transition-colors font-medium">
                Features
              </a>
              <a href="#pricing" className="text-white hover:text-[#FF5000] transition-colors font-medium">
                Pricing
              </a>
              <a href="#about" className="text-white hover:text-[#FF5000] transition-colors font-medium">
                About
              </a>
              <Button 
                variant="ghost" 
                onClick={onLoginClick}
                className="text-white hover:text-[#FF5000] hover:bg-white/10 justify-start"
              >
                Sign In
              </Button>
              <Button 
                onClick={onSignupClick}
                className="bg-[#FF5000] hover:bg-[#FF5000]/80 text-white"
              >
                GET STARTED FREE
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

