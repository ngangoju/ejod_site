import '../styles/globals.css'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setDarkMode(!isDarkMode);

  return (
    <>
      <Head>
        <title>ƎJO-D - 3D Solutions for Education and Medical</title>
        <meta name="description" content="ƎJO-D brings innovative 3D solutions to education and medical sectors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className={isDarkMode ? 'dark' : ''}>
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
