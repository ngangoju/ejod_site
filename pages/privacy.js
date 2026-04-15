import React from 'react';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-deep-space transition-colors duration-300">
      <Head>
        <title>Privacy Policy - EJOD</title>
        <meta name="description" content="EJOD Privacy Policy" />
      </Head>
      
      <main className="container-wide section-padding">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-silver-mist">
              <strong>Last updated:</strong> April 2026
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">1. Information We Collect</h2>
            <p className="text-gray-600 dark:text-silver-mist mb-4">
              When you use our contact form, we collect your name, email address, and any other information you provide in your message.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">2. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-silver-mist mb-4">
              We use the collected information solely to respond to your inquiries and provide the services you have requested. We do not sell or share your personal data with third parties.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">3. Data Security</h2>
            <p className="text-gray-600 dark:text-silver-mist mb-4">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">4. Contact Us</h2>
            <p className="text-gray-600 dark:text-silver-mist mb-4">
              If you have any questions about this Privacy Policy, please contact us via our <a href="/contact" className="text-brand-orange hover:underline">Contact form</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
