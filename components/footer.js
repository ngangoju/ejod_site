import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-slate text-white py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link href="/">
              <a className="inline-block mb-6">
                <h3 className="text-3xl font-bold text-primary">ƎJO-D</h3>
              </a>
            </Link>
            <p className="body-text text-gray-300 mb-6 max-w-md">
              Innovative 3D solutions for education and medical sectors. Transforming the future with cutting-edge technology and immersive experiences.
            </p>
            <div className="flex gap-6 text-2xl">
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary transition-colors duration-300 transform hover:scale-110">
                <AiFillTwitterCircle />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors duration-300 transform hover:scale-110">
                <AiFillLinkedin />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-primary transition-colors duration-300 transform hover:scale-110">
                <AiFillYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/">
                <a className="text-gray-300 hover:text-primary transition-colors duration-300 block py-1">Home</a>
              </Link></li>
              <li><Link href="/about">
                <a className="text-gray-300 hover:text-primary transition-colors duration-300 block py-1">About</a>
              </Link></li>
              <li><Link href="/services">
                <a className="text-gray-300 hover:text-primary transition-colors duration-300 block py-1">Services</a>
              </Link></li>
              <li><Link href="/portfolio">
                <a className="text-gray-300 hover:text-primary transition-colors duration-300 block py-1">Portfolio</a>
              </Link></li>
              <li><Link href="/contact">
                <a className="text-gray-300 hover:text-primary transition-colors duration-300 block py-1">Contact</a>
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start">
                <span className="font-medium mr-2">Phone:</span>
                <span>(250) 786 686 - 391</span>
              </p>
              <p className="flex items-start">
                <span className="font-medium mr-2">Email:</span>
                <span>info@ejod.com</span>
              </p>
              <p className="flex items-start">
                <span className="font-medium mr-2">Location:</span>
                <span>Kigali, Rwanda</span>
              </p>
            </div>
            <Link href="/contact">
              <a className="inline-block mt-6 text-accent hover:text-primary transition-colors duration-300 font-semibold group">
                Send a Message <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ƎJO-D. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
