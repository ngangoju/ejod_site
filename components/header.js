import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsList, BsX, BsArrowRight, BsSun, BsMoon } from "react-icons/bs";

function Header({ toggleDarkMode, isDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-deep-space/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer relative">
              <span className="text-cosmic-purple">ƎJO-D</span>
              <span className="absolute -inset-2 bg-cosmic-purple/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-gray-600 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white font-medium transition-colors duration-300 cursor-pointer relative group py-2">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cosmic-purple group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            ))}
          </div>

          {/* Right side - Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all duration-300 group"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <BsSun className="text-xl text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <BsMoon className="text-xl text-cosmic-purple group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* CTA Button */}
            <Link href="/contact">
              <span className="btn-primary text-sm px-6 py-3 cursor-pointer group">
                Start Your Project
                <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile - Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-all duration-300"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <BsSun className="text-lg text-amber-400" />
              ) : (
                <BsMoon className="text-lg text-cosmic-purple" />
              )}
            </button>

            <button
              className="p-2 rounded-lg text-gray-600 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 focus-ring"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <BsX className="text-3xl" /> : <BsList className="text-3xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-card-light dark:glass-card p-6 mb-6 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <span 
                  className="block text-gray-600 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <span className="btn-primary w-full text-center text-sm py-3 cursor-pointer">
                  Start Your Project
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
