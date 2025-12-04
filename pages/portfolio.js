import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BsArrowRight, BsCheck2Circle, BsEye, BsPlayFill } from "react-icons/bs";

// Dynamically import InteractiveModal to avoid SSR issues with Three.js
const InteractiveModal = dynamic(() => import("../components/InteractiveModal"), {
  ssr: false,
  loading: () => null,
});

const categories = [
  { id: "all", label: "All Projects" },
  { id: "vr", label: "Virtual Reality" },
  { id: "ar", label: "Augmented Reality" },
  { id: "education", label: "Education" },
  { id: "healthcare", label: "Healthcare" },
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
  },
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg-light dark:mesh-bg"></div>
        <div className="absolute top-20 right-1/3 w-96 h-96 rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/15 blur-[120px]"></div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="section-subtitle">Our Work</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Projects That
              <br />
              <span className="text-cosmic-purple">Speak for Themselves</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-silver-mist leading-relaxed">
              Explore our portfolio of transformative XR projects that are reshaping education and healthcare across Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-y border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-midnight/30 sticky top-20 md:top-24 z-30 backdrop-blur-xl">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-cosmic-purple text-white shadow-glow"
                    : "bg-white dark:bg-white/5 text-gray-600 dark:text-silver-mist hover:text-cosmic-purple dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white dark:bg-transparent">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`bg-white dark:bg-midnight/50 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden group hover:border-cosmic-purple/30 transition-all duration-500 shadow-sm dark:shadow-none ${
                  project.featured && index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={`grid ${project.featured && index === 0 ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
                  {/* Image */}
                  <div className="relative h-72 lg:h-full min-h-[300px] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-deep-space/50"></div>
                    
                    {/* View overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-cosmic-purple/80 backdrop-blur-sm flex items-center justify-center">
                        <BsEye className="text-2xl text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="badge text-xs">{tag}</span>
                      ))}
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {project.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-silver-mist mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feature, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cosmic-purple/10 dark:bg-cosmic-purple/20 text-cosmic-purple rounded-full text-sm">
                          <BsCheck2Circle className="text-xs" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    {project.hasInteractiveDemo ? (
                      <button
                        onClick={() => openDemo(project.demoType)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-cosmic-purple text-white rounded-full font-medium transition-all hover:bg-cosmic-purple/80 hover:shadow-glow group/link"
                      >
                        <BsPlayFill className="text-lg" />
                        Try Interactive Demo
                        <BsArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <Link href="#">
                        <span className="inline-flex items-center text-cosmic-purple hover:text-neon-cyan font-medium transition-colors cursor-pointer group/link">
                          View Case Study
                          <BsArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-silver-mist text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Our Capabilities Section */}
      <section className="section-padding bg-gray-50 dark:bg-midnight/30">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-subtitle">What We Offer</span>
            <h2 className="section-title">Our Capabilities</h2>
            <p className="section-description">
              Cutting-edge technology solutions for education and healthcare.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">🎯</div>
              <div className="text-gray-900 dark:text-white font-semibold">VR Training</div>
              <div className="text-gray-500 dark:text-silver-mist text-sm">Immersive simulations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">📱</div>
              <div className="text-gray-900 dark:text-white font-semibold">AR Applications</div>
              <div className="text-gray-500 dark:text-silver-mist text-sm">Overlay technology</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">🎨</div>
              <div className="text-gray-900 dark:text-white font-semibold">3D Visualization</div>
              <div className="text-gray-500 dark:text-silver-mist text-sm">Interactive models</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">🏥</div>
              <div className="text-gray-900 dark:text-white font-semibold">Healthcare Focus</div>
              <div className="text-gray-500 dark:text-silver-mist text-sm">Medical-grade solutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative bg-white dark:bg-transparent">
        <div className="absolute inset-0 bg-transparent"></div>
        
        <div className="container-narrow relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start
            <span className="text-cosmic-purple"> Your Project?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with immersive technology.
          </p>
          <Link href="/contact">
            <span className="btn-primary cursor-pointer group">
              Start Your Project
              <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
