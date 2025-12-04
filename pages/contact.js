import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { BsArrowRight, BsPhone, BsEnvelope, BsGeoAlt, BsCheckCircle, BsSend } from "react-icons/bs";

const projectTypes = [
  { value: "", label: "Select project type" },
  { value: "3d-visualization", label: "3D Visualization" },
  { value: "vr-training", label: "VR Training" },
  { value: "ar-application", label: "AR Application" },
  { value: "custom-xr", label: "Custom XR Development" },
  { value: "consultation", label: "Consultation / Discovery" },
  { value: "other", label: "Other" },
];



const reasons = [
  "Response within 24 hours",
  "Free initial consultation",
  "No-obligation project scoping",
  "Expertise in education & healthcare",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-deep-space transition-colors duration-300">
      <Head>
        <title>Contact Us | ƎJO-D - Let's Create Together</title>
        <meta name="description" content="Get in touch with EJOD to discuss your 3D, VR, or AR project. We respond within 24 hours." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 mesh-bg-light dark:mesh-bg"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-cosmic-purple/10 dark:bg-cosmic-purple/15 blur-[120px]"></div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-subtitle">Contact Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Let's Create
              <span className="text-cosmic-purple"> Together</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-silver-mist leading-relaxed">
              Tell us about your project. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding pt-8 bg-gray-50 dark:bg-transparent">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form Column */}
            <div className="lg:col-span-3">
              {!submitted ? (
                <div className="bg-white dark:bg-midnight/50 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl p-8 lg:p-10 shadow-sm dark:shadow-none">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Tell Us About Your Project</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-silver-mist mb-2">
                          Your Name <span className="text-cosmic-purple">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-input ${errors.name ? "border-red-500" : ""}`}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-silver-mist mb-2">
                          Email Address <span className="text-cosmic-purple">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input ${errors.email ? "border-red-500" : ""}`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Organization */}
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-600 dark:text-silver-mist mb-2">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your organization name"
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-600 dark:text-silver-mist mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="form-input appearance-none cursor-pointer"
                      >
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value} className="bg-white dark:bg-midnight text-gray-900 dark:text-white">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-silver-mist mb-2">
                        Project Details <span className="text-cosmic-purple">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`form-input resize-none ${errors.message ? "border-red-500" : ""}`}
                        placeholder="Tell us about your project, goals, and timeline..."
                      ></textarea>
                      {errors.message && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <BsSend className="mr-2" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white dark:bg-midnight/50 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl p-12 text-center shadow-sm dark:shadow-none">
                  <div className="w-20 h-20 rounded-full bg-success-green/20 flex items-center justify-center mx-auto mb-6">
                    <BsCheckCircle className="text-4xl text-success-green" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h2>
                  <p className="text-gray-600 dark:text-silver-mist text-lg mb-8">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", organization: "", projectType: "", message: "" });
                    }}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Why Work With Us */}
              <div className="bg-white dark:bg-midnight/50 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Why Work With Us</h3>
                <ul className="space-y-4">
                  {reasons.map((reason, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-cosmic-purple/10 dark:bg-cosmic-purple/20 flex items-center justify-center flex-shrink-0">
                        <BsCheckCircle className="text-cosmic-purple text-sm" />
                      </div>
                      <span className="text-gray-600 dark:text-silver-mist">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-white dark:bg-midnight/50 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Direct Contact</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cosmic-purple/10 border border-cosmic-purple/20 flex items-center justify-center flex-shrink-0">
                      <BsPhone className="text-cosmic-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 dark:text-silver-mist/70 mb-1">Phone</p>
                      <a href="tel:+250786686391" className="text-gray-900 dark:text-white hover:text-cosmic-purple transition-colors">
                        +250 786 686 391
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cosmic-purple/10 border border-cosmic-purple/20 flex items-center justify-center flex-shrink-0">
                      <BsEnvelope className="text-cosmic-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 dark:text-silver-mist/70 mb-1">Email</p>
                      <a href="mailto:info@ejod.com" className="text-gray-900 dark:text-white hover:text-cosmic-purple transition-colors">
                        info@ejod.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cosmic-purple/10 border border-cosmic-purple/20 flex items-center justify-center flex-shrink-0">
                      <BsGeoAlt className="text-cosmic-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 dark:text-silver-mist/70 mb-1">Location</p>
                      <p className="text-gray-900 dark:text-white">Kigali, Rwanda</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-midnight/50 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Join 50+ Organizations</h3>
                <p className="text-gray-600 dark:text-silver-mist mb-4">
                  Leading institutions trust us to deliver transformative XR experiences.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-cosmic-purple border-2 border-white dark:border-deep-space"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-silver-mist">+50 clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}