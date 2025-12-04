import '../styles/globals.css'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setDarkMode] = useState(false); // Default to light

  useEffect(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (prefersDark) {
      // Respect system preference if no saved theme
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      // Default to light
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setDarkMode(!isDarkMode);

  return (
    <>
      <Head>
        <title>ƎJO-D | Immersive 3D & XR Experiences</title>
        <meta name="description" content="EJOD creates cutting-edge VR, AR, and 3D solutions that transform education and healthcare." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={isDarkMode ? "#0A0E1A" : "#FFFFFF"} />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta property="og:title" content="ƎJO-D | Immersive 3D & XR Experiences" />
        <meta property="og:description" content="Cutting-edge VR, AR, and 3D solutions for education and healthcare." />
        <meta property="og:type" content="website" />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <div className="min-h-screen bg-white dark:bg-deep-space transition-colors duration-300">
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Component {...pageProps} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}

export default MyApp;
