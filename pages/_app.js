import '../styles/globals.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';

// Routes that use their own SceneShell chrome (no Header/Footer)
const IMMERSIVE_ROUTES = ['/portfolio/anatomy', '/portfolio/campus', '/portfolio/surgery'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isImmersiveRoute = IMMERSIVE_ROUTES.includes(router.pathname);
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
        {/* Open Graph and SEO */}
        <link rel="canonical" href="https://ejod.com" />
        <meta property="og:title" content="ƎJO-D | Immersive 3D & XR Experiences" />
        <meta property="og:description" content="Cutting-edge VR, AR, and 3D solutions for education and healthcare." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ejod.com" />
        <meta property="og:image" content="https://ejod.com/images/Medical_Anatomy_App.png" />
        <meta property="og:site_name" content="ƎJO-D Immersive" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ƎJO-D | Immersive 3D & XR Experiences" />
        <meta name="twitter:description" content="Cutting-edge VR, AR, and 3D solutions for education and healthcare." />
        <meta name="twitter:image" content="https://ejod.com/images/Medical_Anatomy_App.png" />
      </Head>
      <div className={`min-h-screen bg-white dark:bg-deep-space transition-colors duration-300 font-inter ${isImmersiveRoute ? 'immersive-route' : ''}`}>
        {!isImmersiveRoute && <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}
        <Component {...pageProps} />
        {!isImmersiveRoute && <Footer isDarkMode={isDarkMode} />}
      </div>
    </>
  );
}

export default MyApp;
