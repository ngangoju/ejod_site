import Head from "next/head";
import { Md3DRotation, Md360, MdViewInAr } from "react-icons/md";

const services = [
  {
    icon: Md3DRotation,
    title: "3D Modeling",
    description: "We create high-fidelity 3D models for educational tools and medical visualizations, enabling interactive learning and precise anatomical representations.",
  },
  {
    icon: Md360,
    title: "VR Simulations",
    description: "Immersive virtual reality experiences for training in medical procedures and educational scenarios, providing safe and engaging environments.",
  },
  {
    icon: MdViewInAr,
    title: "AR Tools",
    description: "Augmented reality applications that overlay digital information on the real world, revolutionizing classroom interactions and patient consultations.",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>Services - ƎJO-D</title>
        <meta name="description" content="Explore our 3D solutions including modeling, VR simulations, and AR tools for education and medical sectors." />
      </Head>
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            At ƎJO-D, we specialize in innovative 3D technologies tailored for education and healthcare. Discover how our services can transform your operations.
          </p>
        </div>
      </section>
      <section className="py-20 px-10 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <Icon className="text-6xl text-accent mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2 text-primary">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}