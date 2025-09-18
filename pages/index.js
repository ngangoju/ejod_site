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
    description: "Interactive VR for exploring human anatomy with quizzes.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    category: "VR Education",
  },
  {
    id: 2,
    title: "School VR Tour",
    description: "Virtual campus tours for prospective students.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    category: "VR Tour",
  },
  {
    id: 3,
    title: "Surgical Training Simulator",
    description: "AR simulator for practicing surgical procedures.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    category: "AR Medical",
  },
];

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen font-roboto">
      <Head>
        <title>ƎJO-D - 3D Solutions for Education and Medical</title>
        <meta name="description" content="ƎJO-D is a tech company bringing innovative 3D solutions in education and medical sectors." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="relative h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            alt="3D Augmented Reality in Education"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-10">
              <h1 className="text-5xl md:text-7xl font-poppins font-bold mb-4">Innovative 3D Solutions</h1>
              <p className="text-xl md:text-2xl font-poppins mb-8">Transforming Education and Healthcare</p>
              <Link href="/services" className="bg-accent text-white px-8 py-4 rounded-full hover:bg-green-700 transition text-lg font-semibold">
                Explore Services
              </Link>
            </div>
          </div>
        </section>

        {/* About Teaser */}
        <section className="py-20 px-10 text-center bg-light-blue dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-poppins font-bold text-primary mb-6">Who We Are</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-roboto">
              ƎJO-D specializes in 3D technologies for education and medical fields. Our solutions empower users with interactive, immersive experiences that drive innovation and improve outcomes.
            </p>
            <Link href="/about" className="bg-primary text-white px-8 py-4 rounded-full hover:bg-blue-800 transition text-lg font-semibold">
              Meet Our Team
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-poppins font-bold text-center text-primary mb-12">Our Core Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                    <Icon className="text-7xl text-accent mx-auto mb-6" aria-hidden="true" />
                    <h3 className="text-2xl font-poppins font-semibold mb-4 text-primary">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-roboto">{service.description}</p>
                    <Link href="/services" className="inline-block mt-6 text-accent hover:text-primary transition font-semibold text-lg">
                      Learn More →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Teaser */}
        <section className="py-20 px-10 bg-light-blue dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-poppins font-bold text-center text-primary mb-12">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={`${project.title} project`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href="/portfolio" className="text-white text-lg font-semibold border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-primary transition-colors">
                        View Project
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm mb-2 font-semibold">{project.category}</span>
                    <h3 className="text-xl font-poppins font-semibold mb-2 text-primary">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-roboto mb-4">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-10 bg-primary text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-poppins font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl font-roboto mb-8">Contact us today to discuss how our 3D solutions can benefit your organization.</p>
            <Link href="/contact" className="bg-accent text-white px-8 py-4 rounded-full hover:bg-green-700 transition text-lg font-semibold">
              Get In Touch
            </Link>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-12 text-center bg-light-blue dark:bg-gray-800">
          <div className="flex justify-center gap-8 text-4xl text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-primary transition-colors"><AiFillTwitterCircle aria-label="Twitter" /></a>
            <a href="#" className="hover:text-primary transition-colors"><AiFillLinkedin aria-label="LinkedIn" /></a>
            <a href="#" className="hover:text-primary transition-colors"><AiFillYoutube aria-label="YouTube" /></a>
          </div>
        </section>
      </main>
    </div>
  );
}