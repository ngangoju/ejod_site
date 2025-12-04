import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsPlay, BsCheck2Circle, BsLightning, BsShield, BsPeople } from "react-icons/bs";
import { Md3DRotation, Md360, MdViewInAr, MdBiotech } from "react-icons/md";

const services = [
  {
    icon: Md3DRotation,
    title: "3D Visualization",
    description: "Transform complex concepts into stunning 3D visuals. From anatomical models to scientific simulations, we make the invisible visible.",
    color: "bg-cosmic-purple",
  },
  {
    icon: Md360,
    title: "VR Training",
    description: "Create safe, repeatable training environments that accelerate skill acquisition. Practice high-stakes procedures without real-world risk.",
    color: "bg-neon-cyan",
  },
  {
    icon: MdViewInAr,
    title: "AR Applications",
    description: "Overlay digital intelligence onto the physical world. Bridge the gap between information and understanding with interactive AR.",
    color: "bg-success-green",
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
  },
  {
    id: 2,
    title: "Campus Virtual Tour",
    description: "Immersive VR tours allowing prospective students to experience campus life from anywhere in the world.",
    image: "/images/School_VR_Tour.png",
    category: "VR Experience",
    feature: "360° Navigation",
  },
  {
    id: 3,
    title: "Surgical Skills Simulator",
    description: "AR-powered surgical training platform improving procedure accuracy and reducing real-world risk.",
    image: "/images/Surgical_Training_Simulator.png",
    category: "AR Medical",
    feature: "Real-time Feedback",
  },
];

const stats = [
  { number: "🎯", label: "VR Training" },
  { number: "📱", label: "AR Solutions" },
  { number: "🎨", label: "3D Design" },
  { number: "🏥", label: "Healthcare" },
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
    title: "Partnership Focused",
    description: "We work alongside you as true partners, ensuring your vision becomes reality.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-deep-space overflow-hidden transition-colors duration-300">
      <Head>
        <title>ƎJO-D | Immersive 3D & XR Experiences for Education & Healthcare</title>
        <meta name="description" content="ƎJO-D creates cutting-edge VR, AR, and 3D solutions that transform learning and healthcare. Trusted by leading institutions worldwide." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 mesh-bg-light dark:mesh-bg"></div>
          
          {/* Floating Shapes */}
          <div className="absolute top-1/4 left-10 w-64 h-64 floating-shape animate-float opacity-5 dark:opacity-10"></div>
          <div className="absolute top-1/3 right-20 w-48 h-48 floating-shape animate-float-slow animation-delay-1000 opacity-5 dark:opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 floating-shape animate-float-delay opacity-5 dark:opacity-10"></div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-cosmic-purple/10 dark:bg-cosmic-purple/20 blur-[100px]"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/15 blur-[100px]"></div>

          <div className="container-wide relative z-10">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <span className="w-2 h-2 rounded-full bg-success-green animate-pulse"></span>
                <span className="text-sm text-gray-600 dark:text-silver-mist">Pioneering XR in Education & Healthcare</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8 text-gray-900 dark:text-white animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Immersive Experiences
                <br />
                <span className="text-cosmic-purple">That Transform</span>
                <br />
                Learning
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                We create cutting-edge VR, AR, and 3D solutions for education and healthcare that engage, train, and inspire.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 animate-fade-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
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
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-light">
            <span className="text-gray-400 dark:text-silver-mist/50 text-sm">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-silver-mist/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 rounded-full bg-gray-400 dark:bg-silver-mist/50 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="relative py-12 border-y border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-midnight/30">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding relative bg-white dark:bg-transparent">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cosmic-purple/5 dark:bg-cosmic-purple/10 blur-[150px]"></div>
          
          <div className="container-wide relative z-10">
            <div className="section-header">
              <span className="section-subtitle">What We Create</span>
              <h2 className="section-title">Solutions Built for Impact</h2>
              <p className="section-description">
                From concept to deployment, we deliver immersive experiences that educate, train, and transform outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="service-card group">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="text-3xl text-white" aria-hidden="true" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                    <p className="text-gray-600 dark:text-silver-mist mb-6 leading-relaxed">{service.description}</p>
                    
                    {/* Link */}
                    <Link href="/services">
                      <a className="inline-flex items-center text-cosmic-purple hover:text-neon-cyan font-medium transition-colors cursor-pointer group/link">
                        Learn More
                        <BsArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Work Section */}
        <section className="section-padding bg-gray-50 dark:bg-midnight/30 relative">
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-neon-cyan/5 dark:bg-neon-cyan/10 blur-[120px]"></div>
          
          <div className="container-wide relative z-10">
            <div className="section-header">
              <span className="section-subtitle">Our Portfolio</span>
              <h2 className="section-title">Projects That Make an Impact</h2>
              <p className="section-description">
                Explore our work transforming education and healthcare through immersive technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="project-card group">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      className="object-cover transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="overlay">
                      <span className="badge mb-3">{project.category}</span>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-silver-mist text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-2 text-success-green text-sm font-medium">
                        <BsCheck2Circle />
                        {project.feature}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio">
                <span className="btn-secondary cursor-pointer">
                  View All Projects
                  <BsArrowRight className="ml-2" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding relative bg-white dark:bg-transparent">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <span className="section-subtitle">Why ƎJO-D</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Leading Institutions Choose Us
                </h2>
                <p className="text-gray-600 dark:text-silver-mist text-lg mb-10 leading-relaxed">
                  We combine technical excellence with deep domain expertise in education and healthcare to deliver solutions that truly transform outcomes.
                </p>

                <div className="space-y-8">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div key={index} className="flex gap-5">
                        <div className="w-12 h-12 rounded-xl bg-cosmic-purple/10 dark:bg-cosmic-purple/20 border border-cosmic-purple/20 dark:border-cosmic-purple/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-xl text-cosmic-purple" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h4>
                          <p className="text-gray-600 dark:text-silver-mist">{value.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="service-card p-8 lg:p-10">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-midnight/50 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-cosmic-purple/20 backdrop-blur-sm border border-cosmic-purple/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group">
                        <BsPlay className="text-3xl text-cosmic-purple dark:text-white ml-1 group-hover:text-cosmic-purple transition-colors" />
                      </div>
                    </div>
                    <Image
                      src="/images/Medical_Anatomy_App.png"
                      alt="EJOD in action"
                      layout="fill"
                      className="object-cover opacity-50"
                    />
                  </div>
                  <p className="text-center text-gray-500 dark:text-silver-mist mt-6">See how we transformed medical education</p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-cosmic-purple opacity-10 dark:opacity-20 blur-sm"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-neon-cyan opacity-10 dark:opacity-20 blur-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding relative overflow-hidden bg-gray-50 dark:bg-transparent">
          {/* Background */}
          <div className="absolute inset-0 bg-gray-50 dark:bg-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cosmic-purple/5 dark:bg-cosmic-purple/10 blur-[200px]"></div>
          
          <div className="container-narrow relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Create Something
              <br />
              <span className="text-cosmic-purple">Extraordinary?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl mx-auto">
              Let's discuss how immersive technology can transform your educational or healthcare outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <span className="btn-primary cursor-pointer group">
                  Book a Consultation
                  <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/services">
                <span className="btn-secondary cursor-pointer">
                  Explore Services
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
