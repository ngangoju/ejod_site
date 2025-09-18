import Head from "next/head";
import Image from "next/image";
import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { Md3DRotation, Md360, MdViewInAr } from "react-icons/md";
import Link from "next/link";

const services = [
  {
    icon: Md3DRotation,
    title: "3D Modeling",
    description: "High-fidelity 3D models for educational tools and medical visualizations.",
  },
  {
    icon: Md360,
    title: "VR Simulations",
    description: "Immersive VR experiences for medical training and educational scenarios.",
  },
  {
    icon: MdViewInAr,
    title: "AR Tools",
    description: "Augmented reality apps overlaying digital info on the real world.",
  },
];

const projects = [
  {
    id: 1,
    title: "Medical Anatomy App",
    description: "An interactive VR application for medical students to explore human anatomy in 3D, with detailed layers and quizzes for enhanced learning.",
    image: "/images/Medical_Anatomy_App.png",
    category: "VR Education",
  },
  {
    id: 2,
    title: "School VR Tour",
    description: "Virtual reality tour for schools, allowing prospective students and parents to navigate campuses and classrooms immersively from anywhere.",
    image: "/images/School_VR_Tour.png",
    category: "VR Tour",
  },
  {
    id: 3,
    title: "Surgical Training Simulator",
    description: "AR-based simulator for surgeons to practice procedures on digital models, improving precision and reducing risks in real operations.",
    image: "/images/Surgical_Training_Simulator.png",
    category: "AR Medical",
  },
];

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen font-roboto pt-20">
      <Head>
        <title>ƎJO-D - 3D Solutions for Education and Medical</title>
        <meta name="description" content="ƎJO-D is a tech company bringing innovative 3D solutions in education and medical sectors." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            alt="3D Augmented Reality in Education"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-4xl mx-auto animate-slide-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl heading-primary mb-6 text-shadow-lg">Innovative 3D Solutions</h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-10 text-shadow">Transforming Education and Healthcare</p>
              <Link href="/services" className="btn-secondary text-lg">
                Explore Services
              </Link>
            </div>
          </div>
        </section>

        {/* About Teaser */}
        <section className="section-padding bg-light-blue dark:bg-gray-800">
          <div className="container-narrow text-center">
            <h2 className="heading-primary mb-8">Who We Are</h2>
            <p className="body-text text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              ƎJO-D specializes in 3D technologies for education and medical fields. Our solutions empower users with interactive, immersive experiences that drive innovation and improve outcomes.
            </p>
            <Link href="/about" className="btn-primary">
              Meet Our Team
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="heading-primary text-center mb-16">Our Core Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="card p-8 text-center group">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-6xl text-accent mx-auto animate-float" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl heading-primary mb-4">{service.title}</h3>
                    <p className="body-text mb-6">{service.description}</p>
                    <Link href="/services" className="inline-block text-accent hover:text-primary transition-colors duration-300 font-semibold text-lg group-hover:translate-x-2">
                      Learn More →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Teaser */}
        <section className="section-padding bg-light-blue dark:bg-gray-800">
          <div className="container-wide">
            <h2 className="heading-primary text-center mb-16">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="card overflow-hidden group">
                  <div className="relative h-64">
                    <Image
                      src={project.image}
                      alt={`${project.title} project`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href="/portfolio" className="btn-primary text-sm">
                        View Project
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">{project.category}</span>
                    <h3 className="text-xl heading-primary mb-3">{project.title}</h3>
                    <p className="body-text">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-white text-center">
          <div className="container-narrow">
            <h2 className="heading-primary mb-8 text-white">Ready to Start Your Project?</h2>
            <p className="text-xl body-text mb-10 text-white/90">Contact us today to discuss how our 3D solutions can benefit your organization.</p>
            <Link href="/contact" className="btn-secondary bg-white text-primary hover:bg-gray-100">
              Get In Touch
            </Link>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-16 bg-light-blue dark:bg-gray-800">
          <div className="container-narrow text-center">
            <h3 className="text-2xl heading-primary mb-8">Follow Our Journey</h3>
            <div className="flex justify-center gap-6 text-3xl">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors duration-300 transform hover:scale-110">
                <AiFillTwitterCircle aria-label="Twitter" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors duration-300 transform hover:scale-110">
                <AiFillLinkedin aria-label="LinkedIn" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors duration-300 transform hover:scale-110">
                <AiFillYoutube aria-label="YouTube" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
