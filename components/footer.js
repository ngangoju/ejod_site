import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube, AiFillInstagram } from "react-icons/ai";
import { BsArrowRight, BsEnvelope, BsPhone, BsGeoAlt, BsLightning, BsHeart } from "react-icons/bs";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Footer({ isDarkMode }) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const services = [
    { href: "/services", label: "3D Visualization" },
    { href: "/services", label: "VR Training" },
    { href: "/services", label: "AR Applications" },
    { href: "/services", label: "Custom XR Development" },
  ];

    {/* Social links removed for now until authorized/created */}

  return (
    <footer className="relative bg-gray-50 dark:bg-deep-space border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      {/* Accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange"></div>
      
      {/* Newsletter Section */}
      <div className="border-b border-gray-100 dark:border-white/5">
        <div className="container-wide py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 rounded-full text-brand-orange text-sm font-semibold mb-4">
              <BsLightning />
              <span>Stay Updated</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get the latest in XR innovation
            </h3>
            <p className="text-gray-600 dark:text-silver-mist mb-6">
              Subscribe to our newsletter for insights on immersive technology in education and healthcare.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3 rounded-full bg-white dark:bg-midnight/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-orange text-white rounded-full font-semibold hover:bg-brand-orange/90 hover:shadow-glow transition-all flex items-center justify-center gap-2 group"
              >
                Subscribe
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="w-[180px] md:w-[220px] mb-6 cursor-pointer hover:opacity-80 transition-opacity duration-300">
                <BrandLogo className="w-full h-auto text-gray-900 dark:text-white" />
              </div>
            </Link>
            <p className="text-gray-600 dark:text-silver-mist mb-6 leading-relaxed">
              Pioneering immersive 3D, VR, and AR experiences that transform education and healthcare across Africa.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {/* Removed pending social profiles */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span className="text-gray-600 dark:text-silver-mist hover:text-brand-orange dark:hover:text-white transition-colors duration-300 cursor-pointer inline-flex items-center group">
                      <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300">
                        <BsArrowRight className="mr-2" />
                      </span>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href}>
                    <span className="text-gray-600 dark:text-silver-mist hover:text-brand-orange dark:hover:text-white transition-colors duration-300 cursor-pointer inline-flex items-center group">
                      <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300">
                        <BsArrowRight className="mr-2" />
                      </span>
                      {service.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BsPhone className="text-brand-orange text-sm" />
                </div>
                <span className="text-gray-600 dark:text-silver-mist">(250) 786 686 391</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BsEnvelope className="text-brand-orange text-sm" />
                </div>
                <a href="mailto:info@ejod.com" className="text-gray-600 dark:text-silver-mist hover:text-brand-orange dark:hover:text-white transition-colors">
                  info@ejod.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BsGeoAlt className="text-brand-orange text-sm" />
                </div>
                <span className="text-gray-600 dark:text-silver-mist">Kigali, Rwanda</span>
              </li>
            </ul>
            
            {/* CTA */}
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-brand-orange/10 text-brand-orange rounded-full font-semibold hover:bg-brand-orange hover:text-white transition-all cursor-pointer group">
                Start a Project
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 dark:border-white/5">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 dark:text-silver-mist/60 text-sm flex items-center gap-1">
              © {currentYear} ƎJO-D. Made with <BsHeart className="text-accent-coral" /> in Rwanda.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400 dark:text-silver-mist/60">
              <Link href="/privacy"><span className="hover:text-brand-orange dark:hover:text-white transition-colors cursor-pointer">Privacy Policy</span></Link>
              <Link href="/terms"><span className="hover:text-brand-orange dark:hover:text-white transition-colors cursor-pointer">Terms of Service</span></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
