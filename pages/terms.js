import React from 'react';
import Head from 'next/head';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-deep-space transition-colors duration-300">
      <Head>
        <title>Terms of Service - EJOD</title>
        <meta name="description" content="EJOD Terms of Service" />
      </Head>
      
      <main className="container-wide section-padding">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Terms of Service</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-silver-mist">
              <strong>Last updated:</strong> April 2026
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-silver-mist mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">2. Use of Site</h2>
            <p className="text-gray-600 dark:text-silver-mist mb-4">
              The content on this site is for informational purposes. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the service without express written permission from us.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">3. Disclaimer</h2>
            <p className="text-gray-600 dark:text-silver-mist mb-4">
              The materials on EJOD's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
