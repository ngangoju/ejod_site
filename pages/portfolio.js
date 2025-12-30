import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BsArrowRight, BsCheck2Circle, BsEye, BsPlayFill, BsAward, BsBoxArrowUpRight, BsGrid, BsListUl } from "react-icons/bs";
import { Md3DRotation, Md360, MdViewInAr, MdBiotech } from "react-icons/md";

// Dynamically import InteractiveModal to avoid SSR issues with Three.js
const InteractiveModal = dynamic(() => import("../components/InteractiveModal"), {
  ssr: false,
  loading: () => null,
});

const categories = [
  { id: "all", label: "All Projects", icon: BsGrid },
  { id: "vr", label: "Virtual Reality", icon: Md360 },
  { id: "ar", label: "Augmented Reality", icon: MdViewInAr },
  { id: "education", label: "Education", icon: null },
  { id: "healthcare", label: "Healthcare", icon: null },
];

const projects = [
  {
    id: 1,
    title: "Medical Anatomy Explorer",
    description: "Interactive VR application enabling medical students to explore human anatomy in stunning 3D detail. Features layer-by-layer dissection, quiz modules, and instructor collaboration tools.",
    image: "/images/Medical_Anatomy_App.png",
    category: "vr",
    tags: ["VR", "Healthcare", "Education"],
    features: ["3D Organ Models", "Layer Dissection", "Quiz Integration"],
    featured: true,
    hasInteractiveDemo: true,
    demoType: 'anatomy',
    impact: "40% faster learning outcomes",
    client: "Medical University",
  },
  {
    id: 2,
    title: "Campus Virtual Tour",
    description: "Immersive VR experience allowing prospective students and parents to navigate university campuses from anywhere in the world. Includes guided tours, hotspots, and virtual information sessions.",
    image: "/images/School_VR_Tour.png",
    category: "vr",
    tags: ["VR", "Education"],
    features: ["360° Navigation", "Info Hotspots", "Guided Tours"],
    featured: true,
    hasInteractiveDemo: true,
    demoType: 'campus',
    impact: "60% increase in applications",
    client: "AIMS Rwanda",
  },
  {
    id: 3,
    title: "Surgical Skills Simulator",
    description: "AR-powered surgical training platform that overlays procedural guidance on physical training models. Provides real-time feedback and performance analytics for trainees.",
    image: "/images/Surgical_Training_Simulator.png",
    category: "ar",
    tags: ["AR", "Healthcare"],
    features: ["AR Overlays", "Real-time Feedback", "Progress Tracking"],
    featured: true,
    hasInteractiveDemo: true,
    demoType: 'surgical',
    impact: "Zero-risk practice environment",
    client: "CHUK Hospital",
  },
];

const capabilities = [
  { icon: Md360, title: "VR Training", description: "Immersive simulations for risk-free practice" },
  { icon: MdViewInAr, title: "AR Applications", description: "Overlay digital content on reality" },
  { icon: Md3DRotation, title: "3D Visualization", description: "Interactive 3D models and diagrams" },
  { icon: MdBiotech, title: "Healthcare Focus", description: "Medical-grade XR solutions" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [modalState, setModalState] = useState({ isOpen: false, type: null });

  const openDemo = (type) => {
    setModalState({ isOpen: true, type });
  };

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory || p.tags.some(t => t.toLowerCase().includes(activeCategory)));

  return (
    <div className="min-h-screen bg-white dark:bg-deep-space transition-colors duration-300">
      {/* Interactive Demo Modal */}
      <InteractiveModal 
        isOpen={modalState.isOpen} 
        type={modalState.type}
        onClose={() => setModalState({ isOpen: false, type: null })} 
      />
      
      <Head>
        <title>Portfolio | ƎJO-D - Our Work</title>
        <meta name="description" content="Explore our portfolio of transformative 3D, VR, and AR projects across education and healthcare sectors." />
      </Head>

      {/* Hero Section - Premium */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg-light dark:mesh-bg"></div>
        <div className="absolute inset-0 dot-pattern-bg opacity-30 dark:opacity-20"></div>
        <div className="absolute top-20 right-1/3 w-96 h-96 rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/15 blur-[120px]"></div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <div className="isometric-badge mb-6">
              <BsAward className="text-cosmic-purple" />
              <span>Case Studies</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Projects That
              <br />
              <span className="text-cosmic-purple">Deliver Results</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-silver-mist leading-relaxed">
              Explore our portfolio of transformative XR projects reshaping education and healthcare. Each project is designed to drive measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Premium */}
      <section className="py-6 border-y border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-midnight/30 sticky top-20 md:top-24 z-30 backdrop-blur-xl">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-cosmic-purple text-white shadow-glow"
                      : "bg-white dark:bg-white/5 text-gray-600 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
                  }`}
                >
                  {Icon && <Icon className="text-lg" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid - Premium Cards */}
      <section className="section-padding bg-white dark:bg-transparent">
        <div className="container-wide">
          <div className="space-y-10">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`elevated-card overflow-hidden group ${
                  project.featured ? '' : ''
                }`}
              >
                <div className={`grid grid-cols-1 ${project.featured ? 'lg:grid-cols-2' : 'lg:grid-cols-5'} gap-8 lg:gap-10`}>
                  {/* Image */}
                  <div className={`relative ${project.featured ? 'h-80 lg:h-full' : 'h-64 lg:col-span-2'} min-h-[280px] rounded-xl overflow-hidden`}>
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
                      <span className="isometric-badge">{project.tags[0]}</span>
                    </div>
                    
                    {/* View overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-cosmic-purple/90 backdrop-blur-sm flex items-center justify-center shadow-glow">
                        <BsEye className="text-2xl text-white" />
                      </div>
                    </div>
                    
                    {/* Impact badge */}
                    {project.impact && (
                      <div className="absolute bottom-4 right-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success-green/90 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                          <BsAward className="text-xs" />
                          {project.impact}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`${project.featured ? '' : 'lg:col-span-3'} flex flex-col justify-center`}>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-cosmic-purple/5 dark:bg-cosmic-purple/10 text-cosmic-purple rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                      {project.client && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-silver-mist rounded-full text-xs">
                          Client: {project.client}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cosmic-purple transition-colors">
                      {project.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-silver-mist mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.features.map((feature, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success-green/10 text-success-green rounded-lg text-sm font-medium">
                          <BsCheck2Circle className="text-xs" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-4">
                      {project.hasInteractiveDemo && (
                        <button
                          onClick={() => openDemo(project.demoType)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-cosmic-purple text-white rounded-full font-semibold transition-all hover:bg-cosmic-purple/90 hover:shadow-glow group/link"
                        >
                          <BsPlayFill className="text-lg" />
                          Try Interactive Demo
                          <BsArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      )}
                      <Link href="#">
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white rounded-full font-semibold transition-all hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer">
                          <BsBoxArrowUpRight />
                          View Case Study
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                <BsGrid className="text-2xl text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-silver-mist text-lg">No projects found in this category.</p>
              <button 
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-cosmic-purple font-medium hover:underline"
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Capabilities Section - Premium */}
      <section className="section-padding bg-gray-50 dark:bg-midnight/30">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-subtitle">What We Offer</span>
            <h2 className="section-title">Our Capabilities</h2>
            <p className="section-description">
              Cutting-edge technology solutions designed for maximum impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div key={index} className="premium-card text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-cosmic-purple/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-cosmic-purple/20 transition-all duration-300">
                    <Icon className="text-3xl text-cosmic-purple" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cap.title}</h3>
                  <p className="text-gray-500 dark:text-silver-mist text-sm">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative bg-white dark:bg-transparent">
        <div className="absolute inset-0 dot-pattern-bg opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-cosmic-purple/5 dark:bg-cosmic-purple/10 blur-[150px]"></div>
        </div>
        
        <div className="container-narrow relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start
            <span className="text-cosmic-purple"> Your Project?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with immersive technology that delivers results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <span className="btn-primary cursor-pointer group">
                Start Your Project
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
    </div>
  );
}
