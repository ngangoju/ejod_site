import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsArrowRight, BsPlay, BsCheck2Circle, BsLightning, BsShield, BsPeople, BsAward, BsStarFill, BsBoxArrowUpRight } from "react-icons/bs";
import { Md3DRotation, Md360, MdViewInAr, MdBiotech, MdSchool, MdLocalHospital } from "react-icons/md";

const services = [
  {
    icon: Md3DRotation,
    title: "3D Visualization",
    description: "Transform complex concepts into stunning 3D visuals that enhance understanding and accelerate learning outcomes.",
    color: "bg-cosmic-purple",
    features: ["Anatomical Models", "Scientific Simulations", "Interactive Diagrams"],
  },
  {
    icon: Md360,
    title: "VR Training",
    description: "Create safe, repeatable training environments where learners master high-stakes procedures without real-world risk.",
    color: "bg-neon-cyan",
    features: ["Medical Procedures", "Safety Training", "Skill Assessment"],
  },
  {
    icon: MdViewInAr,
    title: "AR Applications",
    description: "Overlay digital intelligence onto the physical world, bridging the gap between information and understanding.",
    color: "bg-success-green",
    features: ["Interactive Guides", "Real-time Data", "Spatial Learning"],
  },
];

const projects = [
  {
    id: 1,
    title: "Medical Anatomy Explorer",
    description: "Interactive VR application enabling medical students to explore human anatomy in stunning 3D detail.",
    image: "/images/Medical_Anatomy_App.png",
    category: "VR Education",
    feature: "3D Layer Dissection",
    impact: "40% faster learning",
  },
  {
    id: 2,
    title: "Campus Virtual Tour",
    description: "Immersive VR tours allowing prospective students to experience campus life from anywhere in the world.",
    image: "/images/School_VR_Tour.png",
    category: "VR Experience",
    feature: "360° Navigation",
    impact: "Reach global audiences",
  },
  {
    id: 3,
    title: "Surgical Skills Simulator",
    description: "AR-powered surgical training platform improving procedure accuracy and reducing real-world risk.",
    image: "/images/Surgical_Training_Simulator.png",
    category: "AR Medical",
    feature: "Real-time Feedback",
    impact: "Zero-risk practice",
  },
];

const capabilities = [
  { icon: "🎯", label: "VR Training", sublabel: "Immersive simulations" },
  { icon: "📱", label: "AR Solutions", sublabel: "Overlay technology" },
  { icon: "🎨", label: "3D Design", sublabel: "Visual excellence" },
  { icon: "🏥", label: "Healthcare", sublabel: "Medical-grade" },
];

const values = [
  {
    icon: BsLightning,
    title: "Innovation First",
    description: "We push boundaries with cutting-edge XR technology to create solutions that didn't exist yesterday.",
  },
  {
    icon: BsShield,
    title: "Quality Assured",
    description: "Every project undergoes rigorous testing to ensure flawless performance across all devices.",
  },
  {
    icon: BsPeople,
    title: "True Partnership",
    description: "We work alongside you as dedicated partners, ensuring your vision becomes reality.",
  },
];

const testimonials = [
  {
    content: "EJOD transformed our medical training program. Students now learn complex procedures in half the time with twice the confidence.",
    author: "Dr. Sarah Uwimana",
    role: "Dean of Medicine",
    organization: "University of Rwanda",
    avatar: "SU",
  },
  {
    content: "The VR campus tour increased our international applications by 60%. Prospective students can now experience our campus from anywhere.",
    author: "Jean-Pierre Habimana",
    role: "Director of Admissions",
    organization: "AIMS Rwanda",
    avatar: "JH",
  },
];

const industries = [
  { icon: MdSchool, label: "Education", count: "15+" },
  { icon: MdLocalHospital, label: "Healthcare", count: "10+" },
];

// Animated counter component
function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span 
      className="inline-block"
      ref={(el) => {
        if (el && !isVisible) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
              }
            },
            { threshold: 0.5 }
          );
          observer.observe(el);
        }
      }}
    >
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-deep-space overflow-hidden transition-colors duration-300">
      <Head>
        <title>ƎJO-D | Immersive 3D & XR Experiences for Education & Healthcare</title>
        <meta name="description" content="ƎJO-D creates cutting-edge VR, AR, and 3D solutions that transform learning and healthcare. Trusted by leading institutions across Africa." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section - Premium Redesign */}
        <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 mesh-bg-light dark:mesh-bg"></div>
          <div className="absolute inset-0 dot-pattern-bg opacity-30 dark:opacity-20"></div>
          
          {/* Animated 3D-inspired shapes */}
          <div className="absolute top-1/4 left-10 w-64 h-64 rounded-3xl bg-cosmic-purple/5 dark:bg-cosmic-purple/10 animate-float shadow-isometric"></div>
          <div className="absolute top-1/3 right-20 w-48 h-48 rounded-2xl bg-neon-cyan/5 dark:bg-neon-cyan/10 animate-float-slow shadow-isometric rotate-12"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-xl bg-success-green/5 dark:bg-success-green/10 animate-float-delay shadow-isometric -rotate-6"></div>
          
          {/* Accent orbs */}
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-cosmic-purple/10 dark:bg-cosmic-purple/20 blur-[100px]"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/15 blur-[100px]"></div>

          <div className="container-wide relative z-10">
            <div className="max-w-5xl">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success-green animate-pulse"></span>
                  <span className="text-sm font-medium text-success-green">Available for Projects</span>
                </span>
                <span className="w-px h-4 bg-gray-300 dark:bg-white/20"></span>
                <span className="text-sm text-gray-600 dark:text-silver-mist">Pioneering XR in Education & Healthcare</span>
              </div>

              {/* Headline with strong value proposition */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-8 text-gray-900 dark:text-white animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Transform How
                <br />
                <span className="text-cosmic-purple">People Learn</span>
                <br />
                & Practice
              </h1>

              {/* Subheadline - benefit focused */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                We build immersive VR, AR, and 3D experiences that help institutions train smarter, engage deeper, and achieve measurable results.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12 animate-fade-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <Link href="/contact">
                  <span className="btn-primary cursor-pointer group">
                    Start Your Project
                    <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/portfolio">
                  <span className="btn-secondary cursor-pointer group">
                    <BsPlay className="mr-2 text-lg" />
                    View Our Work
                  </span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-8 animate-fade-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-cosmic-purple border-3 border-white dark:border-deep-space flex items-center justify-center text-white text-xs font-bold shadow-md">
                        {['DM', 'SK', 'JP', '+'][i - 1]}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-900 dark:text-white font-semibold">25+</span>
                    <span className="text-gray-500 dark:text-silver-mist"> organizations trust us</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <BsStarFill key={i} className="text-accent-gold text-sm" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-silver-mist">5.0 client rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-light">
            <span className="text-gray-400 dark:text-silver-mist/50 text-sm">Explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-silver-mist/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 rounded-full bg-gray-400 dark:bg-silver-mist/50 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Capabilities Bar - Refined */}
        <section className="relative py-16 border-y border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-midnight/30">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {capabilities.map((cap, index) => (
                <div key={index} className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-white/5">
                  <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{cap.icon}</div>
                  <div className="text-gray-900 dark:text-white font-semibold text-lg">{cap.label}</div>
                  <div className="text-gray-500 dark:text-silver-mist text-sm mt-1">{cap.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section - Premium Cards */}
        <section className="section-padding relative bg-white dark:bg-transparent">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cosmic-purple/5 dark:bg-cosmic-purple/10 blur-[150px]"></div>
          <div className="absolute inset-0 grid-pattern-bg opacity-50"></div>
          
          <div className="container-wide relative z-10">
            <div className="section-header">
              <span className="section-subtitle">What We Create</span>
              <h2 className="section-title">Technology That Drives Results</h2>
              <p className="section-description">
                From concept to deployment, we deliver immersive experiences that educate, train, and transform outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="premium-card group">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <Icon className="text-3xl text-white" aria-hidden="true" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                    <p className="text-gray-600 dark:text-silver-mist mb-6 leading-relaxed">{service.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cosmic-purple/5 dark:bg-cosmic-purple/10 text-cosmic-purple rounded-full text-sm font-medium">
                          <BsCheck2Circle className="text-xs" />
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Link */}
                    <Link href="/services" className="inline-flex items-center text-cosmic-purple hover:text-neon-cyan font-semibold transition-colors cursor-pointer group/link">
                        Learn More
                        <BsArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Work Section - Premium Portfolio */}
        <section className="section-padding bg-gray-50 dark:bg-midnight/30 relative">
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-neon-cyan/5 dark:bg-neon-cyan/10 blur-[120px]"></div>
          
          <div className="container-wide relative z-10">
            <div className="section-header">
              <span className="section-subtitle">Our Portfolio</span>
              <h2 className="section-title">Projects That Deliver Impact</h2>
              <p className="section-description">
                See how we've helped institutions transform training and education through immersive technology.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={project.id} className={`elevated-card group cursor-pointer overflow-hidden ${index === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}>
                  <div className={`relative ${index === 0 ? 'h-80' : 'h-64'} mb-6 rounded-xl overflow-hidden`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-deep-space/40 group-hover:bg-deep-space/20 transition-colors duration-500"></div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="isometric-badge">{project.category}</span>
                    </div>
                    
                    {/* Impact badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success-green/90 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                        <BsAward className="text-xs" />
                        {project.impact}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cosmic-purple transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-silver-mist mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-success-green text-sm font-medium">
                      <BsCheck2Circle />
                      {project.feature}
                    </div>
                    <BsBoxArrowUpRight className="text-gray-400 group-hover:text-cosmic-purple transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio">
                <span className="btn-secondary cursor-pointer inline-flex items-center gap-2 group">
                  View All Projects
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section - NEW */}
        <section className="section-padding relative bg-white dark:bg-transparent overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cosmic-purple/5 dark:bg-cosmic-purple/10 blur-[150px]"></div>
          
          <div className="container-wide relative z-10">
            <div className="section-header">
              <span className="section-subtitle">Client Success</span>
              <h2 className="section-title">Trusted by Leaders in Education & Healthcare</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <p className="testimonial-content">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <span className="text-cosmic-purple font-bold">{testimonial.avatar}</span>
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.author}</h4>
                      <p>{testimonial.role}, {testimonial.organization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Industries served */}
            <div className="mt-16 pt-12 border-t border-gray-100 dark:border-white/5">
              <p className="text-center text-gray-500 dark:text-silver-mist mb-8 text-sm uppercase tracking-wider">Industries We Serve</p>
              <div className="flex flex-wrap justify-center gap-8">
                {industries.map((industry, index) => {
                  const Icon = industry.icon;
                  return (
                    <div key={index} className="trust-badge">
                      <Icon className="text-2xl text-cosmic-purple" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{industry.label}</div>
                        <div className="text-sm text-gray-500 dark:text-silver-mist">{industry.count} institutions</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Enhanced */}
        <section className="section-padding relative bg-gray-50 dark:bg-midnight/30">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <span className="section-subtitle">Why ƎJO-D</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Leading Institutions Partner With Us
                </h2>
                <p className="text-gray-600 dark:text-silver-mist text-lg mb-10 leading-relaxed">
                  We combine technical excellence with deep domain expertise in education and healthcare to deliver solutions that truly transform outcomes.
                </p>

                <div className="space-y-6">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div key={index} className="feature-item">
                        <div className="feature-icon">
                          <Icon className="text-xl text-cosmic-purple" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{value.title}</h4>
                          <p className="text-gray-600 dark:text-silver-mist">{value.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="elevated-card p-6">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-midnight/50 relative">
                    <Image
                      src="/images/Medical_Anatomy_App.png"
                      alt="EJOD in action"
                      layout="fill"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-deep-space/60 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-cosmic-purple/90 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group shadow-glow-lg">
                        <BsPlay className="text-3xl text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-gray-500 dark:text-silver-mist mt-4 text-sm">See how we transformed medical education</p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-cosmic-purple opacity-10 dark:opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-neon-cyan opacity-10 dark:opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Premium */}
        <section className="section-padding relative overflow-hidden bg-white dark:bg-transparent">
          {/* Background */}
          <div className="absolute inset-0 dot-pattern-bg opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cosmic-purple/5 dark:bg-cosmic-purple/10 blur-[200px]"></div>
          
          <div className="container-narrow relative z-10 text-center">
            <div className="isometric-badge mx-auto mb-8">
              <BsLightning className="text-cosmic-purple" />
              <span>Ready to innovate?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform
              <br />
              <span className="text-cosmic-purple">Your Training?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl mx-auto">
              Join 25+ organizations already using immersive technology to achieve better learning outcomes. Let's discuss your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <span className="btn-primary cursor-pointer group text-lg px-10 py-5">
                  Book a Free Consultation
                  <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/services">
                <span className="btn-secondary cursor-pointer text-lg px-8 py-5">
                  Explore Services
                </span>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 dark:text-silver-mist">
              <span className="flex items-center gap-2">
                <BsCheck2Circle className="text-success-green" />
                Free initial consultation
              </span>
              <span className="flex items-center gap-2">
                <BsCheck2Circle className="text-success-green" />
                Response within 24 hours
              </span>
              <span className="flex items-center gap-2">
                <BsCheck2Circle className="text-success-green" />
                No obligation quote
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
