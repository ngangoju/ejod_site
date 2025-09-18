import Head from "next/head";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => {
      alert(`Thank you, ${formData.name}! Your message has been sent. We'll get back to you soon.`);
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>Contact Us - ƎJO-D</title>
        <meta name="description" content="Get in touch with ƎJO-D for inquiries about our 3D solutions in education and medical sectors." />
      </Head>
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Have a project in mind or questions about our services? We'd love to hear from you. Reach out via the form below or our contact details.
          </p>
        </div>
      </section>
      <section className="py-20 px-10 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-2xl font-bold text-center text-primary mb-8">Send us a Message</h2>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  aria-required="true"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition"
                aria-disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          ) : (
            <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h2 className="text-2xl font-bold text-primary mb-4">Message Sent!</h2>
              <p className="text-gray-600 dark:text-gray-300">We'll respond to you shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-accent text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="py-10 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Or Reach Us Directly</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">Phone: (250) 786 686 - 391 | Email: info@ejod.com</p>
        </div>
      </section>
    </div>
  );
}