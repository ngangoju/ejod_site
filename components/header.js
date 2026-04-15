import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsList, BsX, BsArrowRight, BsSun, BsMoon, BsLightning } from "react-icons/bs";

function Header({ toggleDarkMode, isDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

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

  const isActive = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(href);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-deep-space/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer relative">
              <span className="text-brand-orange group-hover:opacity-80 transition-opacity">ƎJO-D</span>
              <span className="absolute -inset-2 bg-brand-orange/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`relative font-medium py-2 cursor-pointer transition-colors duration-300 group ${
                  isActive(link.href) 
                    ? 'text-brand-orange' 
                    : 'text-gray-600 dark:text-silver-mist hover:text-brand-orange dark:hover:text-white'
                }`}>
                  {link.label}
                  {/* Active indicator */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-orange transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
              </Link>
            ))}
          </div>

          {/* Right side - Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <BsSun className="text-xl text-accent-gold group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <BsMoon className="text-xl text-brand-orange group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* CTA Button */}
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-full font-semibold text-sm cursor-pointer transition-all duration-300 hover:shadow-glow hover:translate-y-[-2px] group">
                <BsLightning className="text-accent-gold" />
                Start Project
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile - Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-all duration-300 focus:outline-none"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <BsSun className="text-lg text-accent-gold" />
              ) : (
                <BsMoon className="text-lg text-brand-orange" />
              )}
            </button>

            <button
              className="p-2 rounded-xl text-gray-600 dark:text-silver-mist hover:text-brand-orange dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <BsList className={`absolute inset-0 text-2xl transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <BsX className={`absolute inset-0 text-2xl transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="premium-card !p-4 mb-6">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  legacyBehavior
                >
                  <a 
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-medium py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      isActive(link.href)
                        ? 'bg-brand-orange/10 text-brand-orange'
                        : 'text-gray-600 dark:text-silver-mist hover:text-brand-orange dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10">
              <Link href="/contact" legacyBehavior>
                <a onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-brand-orange text-white rounded-xl font-semibold cursor-pointer hover:bg-brand-orange/90 transition-colors">
                  <BsLightning className="text-accent-gold" />
                  Start Your Project
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
