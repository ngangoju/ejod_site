import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>Portfolio - ƎJO-D</title>
        <meta name="description" content="View our portfolio of 3D, VR, and AR projects in education and medical fields." />
      </Head>
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Portfolio</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Explore selected projects showcasing our expertise in delivering innovative 3D solutions for education and healthcare.
          </p>
        </div>
      </section>
      <section className="py-20 px-10 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Image
                  src={project.image}
                  alt={`${project.title} project`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  priority={false}
                />
                <div className="p-6">
                  <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm mb-2">{project.category}</span>
                  <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <Link href="#" className="text-accent hover:text-primary transition font-medium">View Project →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
