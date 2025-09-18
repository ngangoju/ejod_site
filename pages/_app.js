import '../styles/globals.css'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './components/header';
import Footer from './components/footer';

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
