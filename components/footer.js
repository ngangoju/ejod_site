import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube, AiFillInstagram } from "react-icons/ai";
import { BsArrowRight, BsEnvelope, BsPhone, BsGeoAlt } from "react-icons/bs";
import Link from "next/link";

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

  const socialLinks = [
    { icon: AiFillTwitterCircle, label: "Twitter", href: "#" },
    { icon: AiFillLinkedin, label: "LinkedIn", href: "#" },
    { icon: AiFillYoutube, label: "YouTube", href: "#" },
    { icon: AiFillInstagram, label: "Instagram", href: "#" },
  ];

  return (
    <footer className="relative bg-gray-50 dark:bg-deep-space border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-cosmic-purple opacity-50"></div>
      
      {/* Main Footer Content */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/">
              <span className="inline-block text-3xl font-bold text-cosmic-purple mb-6 cursor-pointer">
                ƎJO-D
              </span>
            </Link>
            <p className="text-gray-600 dark:text-silver-mist mb-6 leading-relaxed">
              Pioneering immersive 3D, VR, and AR experiences that transform education and healthcare.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white hover:border-cosmic-purple/50 hover:bg-cosmic-purple/10 transition-all duration-300 group"
                  >
                    <Icon className="text-xl group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span className="text-gray-600 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white transition-colors duration-300 cursor-pointer inline-flex items-center group">
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
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href}>
                    <span className="text-gray-600 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white transition-colors duration-300 cursor-pointer inline-flex items-center group">
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
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <BsPhone className="text-cosmic-purple text-lg mt-1 flex-shrink-0" />
                <span className="text-gray-600 dark:text-silver-mist">(250) 786 686 391</span>
              </li>
              <li className="flex items-start gap-3">
                <BsEnvelope className="text-cosmic-purple text-lg mt-1 flex-shrink-0" />
                <a href="mailto:info@ejod.com" className="text-gray-600 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white transition-colors">
                  info@ejod.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <BsGeoAlt className="text-cosmic-purple text-lg mt-1 flex-shrink-0" />
                <span className="text-gray-600 dark:text-silver-mist">Kigali, Rwanda</span>
              </li>
            </ul>
            
            {/* CTA */}
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 mt-6 text-cosmic-purple hover:text-neon-cyan font-medium transition-colors cursor-pointer group">
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
            <p className="text-gray-400 dark:text-silver-mist/60 text-sm">
              © {currentYear} ƎJO-D. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400 dark:text-silver-mist/60">
              <a href="#" className="hover:text-cosmic-purple dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cosmic-purple dark:hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
