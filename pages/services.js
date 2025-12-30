import Head from "next/head";
import Link from "next/link";
import { BsArrowRight, BsCheck2, BsLightning, BsGear, BsRocket, BsHeadset, BsAward, BsCheckCircle } from "react-icons/bs";
import { Md3DRotation, Md360, MdViewInAr, MdBiotech, MdSchool, MdLocalHospital } from "react-icons/md";

const services = [
  {
    icon: Md3DRotation,
    title: "3D Visualization & Modeling",
    subtitle: "Make the invisible visible",
    description: "Transform complex concepts into stunning, interactive 3D visuals. From detailed anatomical models to intricate scientific simulations, we create visual experiences that enhance understanding and retention.",
    features: [
      "High-fidelity anatomical models",
      "Scientific & molecular visualizations",
      "Interactive 3D diagrams",
      "Cross-platform compatibility",
    ],
    color: "bg-cosmic-purple",
    stats: { value: "40%", label: "faster learning" },
  },
  {
    icon: Md360,
    title: "Virtual Reality Training",
    subtitle: "Learn by doing, risk-free",
    description: "Create safe, repeatable training environments that accelerate skill acquisition. Our VR simulations let learners practice high-stakes procedures without real-world consequences.",
    features: [
      "Medical procedure simulation",
      "Safety training scenarios",
      "Soft skills development",
      "Performance analytics",
    ],
    color: "bg-neon-cyan",
    stats: { value: "60%", label: "skill retention" },
  },
  {
    icon: MdViewInAr,
    title: "Augmented Reality Applications",
    subtitle: "Enhance reality, enhance understanding",
    description: "Overlay digital intelligence onto the physical world. From interactive textbooks to patient-facing AR guides, we bridge the gap between information and understanding.",
    features: [
      "Interactive learning overlays",
      "Patient education tools",
      "Maintenance & repair guides",
      "Real-time data visualization",
    ],
    color: "bg-success-green",
    stats: { value: "3x", label: "engagement" },
  },
  {
    icon: MdBiotech,
    title: "Custom XR Development",
    subtitle: "Your vision, our expertise",
    description: "Need something unique? We build bespoke extended reality solutions tailored to your specific requirements, industry standards, and user needs.",
    features: [
      "Custom platform development",
      "API & system integration",
      "Multi-user experiences",
      "Ongoing support & updates",
    ],
    color: "bg-accent-gold",
    stats: { value: "100%", label: "customized" },
  },
];

const industries = [
  {
    icon: MdSchool,
    title: "Education",
    description: "From K-12 to higher education, we create immersive learning experiences that boost engagement and improve outcomes.",
    benefits: ["Interactive lessons", "Virtual labs", "Assessment tools"],
  },
  {
    icon: MdLocalHospital,
    title: "Healthcare",
    description: "Training simulators, patient education tools, and therapeutic applications that advance medical practice.",
    benefits: ["Surgical training", "Medical education", "Patient care"],
  },
];

const process = [
  { 
    step: "01", 
    title: "Discovery", 
    description: "We dive deep into your goals, audience, and technical requirements to understand exactly what you need.",
    icon: BsLightning,
  },
  { 
    step: "02", 
    title: "Design", 
    description: "Our team creates detailed concepts, user flows, and visual prototypes that bring your vision to life.",
    icon: BsGear,
  },
  { 
    step: "03", 
    title: "Develop", 
    description: "Expert engineers build your solution with rigorous quality standards and best practices.",
    icon: BsRocket,
  },
  { 
    step: "04", 
    title: "Deploy", 
    description: "We launch your project, train your team, and ensure seamless integration with your systems.",
    icon: BsCheckCircle,
  },
  { 
    step: "05", 
    title: "Support", 
    description: "Ongoing maintenance, updates, and optimization for long-term success and growth.",
    icon: BsHeadset,
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white dark:bg-deep-space transition-colors duration-300">
      <Head>
        <title>Services | ƎJO-D - 3D, VR & AR Solutions</title>
        <meta name="description" content="Explore our comprehensive 3D visualization, VR training, and AR application services for education and healthcare sectors." />
      </Head>

      {/* Hero Section - Premium */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg-light dark:mesh-bg"></div>
        <div className="absolute inset-0 dot-pattern-bg opacity-30 dark:opacity-20"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-cosmic-purple/10 dark:bg-cosmic-purple/15 blur-[120px]"></div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <div className="isometric-badge mb-6">
              <BsLightning className="text-cosmic-purple" />
              <span>Our Expertise</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Technology That
              <br />
              <span className="text-cosmic-purple">Drives Results</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-silver-mist leading-relaxed">
              From concept to deployment, we deliver immersive experiences that educate, train, and transform. Our comprehensive services cover the full spectrum of XR technology.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Premium Cards */}
      <section className="section-padding bg-gray-50 dark:bg-transparent">
        <div className="container-wide">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className="elevated-card group"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
                    {/* Content */}
                    <div className={isEven ? '' : 'lg:order-2'}>
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${service.color} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        <Icon className="text-3xl text-white" />
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {service.title}
                      </h2>
                      <p className="text-cosmic-purple font-semibold mb-4">{service.subtitle}</p>
                      <p className="text-gray-600 dark:text-silver-mist leading-relaxed mb-8">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-silver-mist">
                            <div className="w-6 h-6 rounded-full bg-success-green/10 flex items-center justify-center flex-shrink-0">
                              <BsCheck2 className="text-success-green text-sm" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link href="/contact" className="inline-flex items-center gap-2 text-cosmic-purple hover:text-neon-cyan font-semibold transition-colors group/link">
                          Start a Project
                          <BsArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Visual with Stats */}
                    <div className={`relative ${isEven ? 'lg:order-2' : ''}`}>
                      <div className="aspect-video rounded-2xl bg-gray-100 dark:bg-midnight/50 border border-gray-200 dark:border-white/5 overflow-hidden relative group-hover:border-cosmic-purple/20 transition-colors">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="text-8xl text-gray-200 dark:text-white/10 group-hover:text-cosmic-purple/20 group-hover:scale-110 transition-all duration-500" />
                        </div>
                        
                        {/* Stats overlay */}
                        <div className="absolute bottom-4 right-4">
                          <div className="px-4 py-3 bg-white dark:bg-midnight/80 rounded-xl shadow-lg border border-gray-100 dark:border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-cosmic-purple">{service.stats.value}</div>
                            <div className="text-xs text-gray-500 dark:text-silver-mist uppercase tracking-wider">{service.stats.label}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section - Premium */}
      <section className="section-padding bg-white dark:bg-midnight/30">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-subtitle">Industries We Serve</span>
            <h2 className="section-title">Specialized Expertise</h2>
            <p className="section-description">
              Deep domain knowledge in the sectors that matter most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div key={index} className="premium-card group">
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-cosmic-purple/10 border border-cosmic-purple/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-cosmic-purple/20 transition-all">
                      <Icon className="text-3xl text-cosmic-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{industry.title}</h3>
                      <p className="text-gray-600 dark:text-silver-mist mb-4">{industry.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {industry.benefits.map((benefit, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-cosmic-purple/5 dark:bg-cosmic-purple/10 text-cosmic-purple rounded-full text-sm">
                            <BsCheck2 className="text-xs" />
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section - Premium Timeline */}
      <section className="section-padding relative overflow-hidden bg-gray-50 dark:bg-transparent">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-neon-cyan/5 dark:bg-neon-cyan/10 blur-[150px]"></div>
        <div className="absolute inset-0 grid-pattern-bg opacity-50"></div>
        
        <div className="container-wide relative z-10">
          <div className="section-header">
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">Our Proven Process</h2>
            <p className="section-description">
              A systematic approach that ensures quality delivery every time.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {process.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative group">
                    {/* Connector line */}
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-cosmic-purple/20 z-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cosmic-purple/40"></div>
                      </div>
                    )}
                    
                    <div className="premium-card text-center relative z-10 h-full">
                      <div className="w-12 h-12 rounded-xl bg-cosmic-purple/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-cosmic-purple/20 transition-all">
                        <Icon className="text-xl text-cosmic-purple" />
                      </div>
                      <span className="inline-block px-3 py-1 bg-cosmic-purple/5 text-cosmic-purple rounded-full text-xs font-bold mb-3">{item.step}</span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-silver-mist text-sm">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="section-padding relative bg-white dark:bg-transparent">
        <div className="absolute inset-0 dot-pattern-bg opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-cosmic-purple/5 dark:bg-cosmic-purple/10 blur-[150px]"></div>
        </div>
        
        <div className="container-narrow relative z-10 text-center">
          <div className="isometric-badge mx-auto mb-8">
            <BsAward className="text-cosmic-purple" />
            <span>Let's collaborate</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Let's Build Something
            <span className="text-cosmic-purple"> Remarkable</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl mx-auto">
            Ready to transform your vision into an immersive reality? Let's start the conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <span className="btn-primary cursor-pointer group">
                Start Your Project
                <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/portfolio">
              <span className="btn-secondary cursor-pointer">
                View Our Work
              </span>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 dark:text-silver-mist">
            <span className="flex items-center gap-2">
              <BsCheckCircle className="text-success-green" />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <BsCheckCircle className="text-success-green" />
              Quick response
            </span>
            <span className="flex items-center gap-2">
              <BsCheckCircle className="text-success-green" />
              Expert team
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}