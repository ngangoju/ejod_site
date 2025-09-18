import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-primary mb-4">ƎJO-D</h3>
          <p className="text-gray-300 mb-4">
            Innovative 3D solutions for education and medical sectors. Transforming the future with technology.
          </p>
          <div className="flex justify-center md:justify-start gap-4 text-2xl">
            <a href="#" aria-label="Twitter" className="hover:text-primary transition">
              <AiFillTwitterCircle />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary transition">
              <AiFillLinkedin />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-primary transition">
              <AiFillYoutube />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-primary transition">About</Link></li>
            <li><Link href="/services" className="hover:text-primary transition">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-primary transition">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
          <p className="text-gray-300 mb-2">Phone: (250) 786 686 - 391</p>
          <p className="text-gray-300 mb-2">Email: info@ejod.com</p>
          <p className="text-gray-300">Kigali, Rwanda</p>
          <Link href="/contact" className="block mt-4 text-accent hover:text-primary transition font-medium">
            Send a Message →
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2025 ƎJO-D. All rights reserved.</p>
      </div>
    </footer>
  );
}