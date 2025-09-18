import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { Md3DRotation, Md360, MdViewInAr } from "react-icons/md";
import Link from "next/link";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
  const [isDarkMode] = useState(false); // Managed in _app

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Head>
        <title>ƎJO-D - 3D Solutions for Education and Medical</title>
        <meta name="description" content="ƎJO-D is a tech company bringing innovative 3D solutions in education and medical sectors." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-10">
        {/* Hero Section with Carousel */}
        <section className="relative py-10">
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
            <Carousel
              responsive={responsive}
              className="w-full h-96 md:h-screen"
              containerClass="relative"
              showThumbs={false}
              autoPlay
              autoPlaySpeed={3000}
              infinite
            >
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="3D Augmented Reality in Education"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Innovative 3D Solutions</h1>
                    <p className="text-xl md:text-2xl mb-6">Transforming Education and Healthcare</p>
                    <Link href="/services" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative h-full">
                <Image
                  src="https://images.pexels.com/photos/6474473/pexels-photo-6474473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="VR Simulation in Medical Training"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">VR Simulations</h1>
                    <p className="text-xl md:text-2xl mb-6">Immersive Learning Experiences</p>
                    <Link href="/services" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1533310266094-8898a03807dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="AR Tools for Interactive Education"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">AR Innovations</h1>
                    <p className="text-xl md:text-2xl mb-6">Bridging Digital and Real Worlds</p>
                    <Link href="/services" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                      Discover AR
                    </Link>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </section>

        {/* About Teaser */}
        <section className="py-20 px-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">Who We Are</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              ƎJO-D specializes in 3D technologies for education and medical fields. Our solutions empower users with interactive, immersive experiences that drive innovation and improve outcomes.
            </p>
            <Link href="/about" className="bg-accent text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
              Meet Our Team
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-10 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Core Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <Icon className="text-6xl text-accent mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-semibold mb-2 text-primary">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                    <Link href="/services" className="block mt-4 text-accent hover:text-primary transition font-medium">
                      Learn More →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio Teaser */}
        <section className="py-20 px-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <Image
                    src={project.image}
                    alt={`${project.title} project`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm mb-2">{project.category}</span>
                    <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <Link href="/portfolio" className="text-accent hover:text-primary transition font-medium">
                      View All Projects →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-10 bg-accent text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8">Contact us today to discuss how our 3D solutions can benefit your organization.</p>
            <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded-md hover:bg-blue-700 transition inline-block">
              Get In Touch
            </Link>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-10 text-center">
          <div className="flex justify-center gap-8 text-5xl text-gray-600 dark:text-gray-400">
            <AiFillTwitterCircle className="hover:text-primary transition cursor-pointer" aria-label="Twitter" />
            <AiFillLinkedin className="hover:text-primary transition cursor-pointer" aria-label="LinkedIn" />
            <AiFillYoutube className="hover:text-primary transition cursor-pointer" aria-label="YouTube" />
          </div>
        </section>
      </main>
    </div>
  );
}
