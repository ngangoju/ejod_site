import React, { useState } from "react";
import Link from "next/link";
import { BsFillMoonStarsFill, BsList, BsX } from "react-icons/bs";

function Header(props) {
  const { toggleDarkMode, isDarkMode } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-soft dark-mode-transition">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <h1 className="text-2xl md:text-3xl font-bold text-primary cursor-pointer transform group-hover:scale-105 transition-transform duration-300 tracking-wider">
              ƎJO-D
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                About
              </a>
            </Link>
            <Link href="/services">
              <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                Services
              </a>
            </Link>
            <Link href="/portfolio">
              <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                Portfolio
              </a>
            </Link>
            <Link href="/contact">
              <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                Contact
              </a>
            </Link>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-light-blue dark:hover:bg-dark-slate transition-colors duration-300 focus-ring"
              aria-label="Toggle dark mode"
            >
              <BsFillMoonStarsFill className={`text-xl ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'}`} />
            </button>

            {/* Resume Button */}
            <Link href="#">
              <a className="btn-primary text-sm px-6 py-3">
                Resume
              </a>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent focus-ring"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <BsX className="text-2xl" /> : <BsList className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-2 p-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
              >
                <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                  Home
                </a>
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsMenuOpen(false)}
              >
                <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                  About
                </a>
              </Link>
              <Link 
                href="/services" 
                onClick={() => setIsMenuOpen(false)}
              >
                <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                  Services
                </a>
              </Link>
              <Link 
                href="/portfolio" 
                onClick={() => setIsMenuOpen(false)}
              >
                <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                  Portfolio
                </a>
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMenuOpen(false)}
              >
                <a className="text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent font-medium transition-colors duration-300 py-2">
                  Contact
                </a>
              </Link>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center text-dark-slate dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors duration-300"
                  aria-label="Toggle dark mode"
                >
                  <BsFillMoonStarsFill className={`text-xl mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'}`} />
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                
                <Link 
                  href="#" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a className="btn-primary text-sm px-4 py-2">
                    Resume
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
