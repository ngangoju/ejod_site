import React from "react";
import Link from "next/link";
import { BsFillMoonStarsFill } from "react-icons/bs";

function Header(props) {
  const { toggleDarkMode, isDarkMode } = props;

  return (
    <nav className={`pt-10 mb-12 flex justify-between dark:bg-gray-900/50 ${isDarkMode ? 'dark' : ''}`}>
      <Link href="/">
        <h1 className="text-xl font-semibold text-primary cursor-pointer">ƎJO-D</h1>
      </Link>
      <ul className="flex items-center space-x-4">
        <li className="mr-4">
          <BsFillMoonStarsFill
            onClick={toggleDarkMode}
            className={`cursor-pointer text-2xl ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'}`}
            aria-label="Toggle dark mode"
          />
        </li>
        <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
        <li><Link href="/about" className="hover:text-primary transition">About</Link></li>
        <li><Link href="/services" className="hover:text-primary transition">Services</Link></li>
        <li><Link href="/portfolio" className="hover:text-primary transition">Portfolio</Link></li>
        <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
        <li>
          <Link href="#" className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-md ml-4">
            Resume
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
