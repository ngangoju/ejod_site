import Head from "next/head";
import Image from "next/image";

const leadershipTeam = [
  {
    name: "Miguel Gasakure",
    role: "CEO",
    avatar: "/images/Miguel-Black-White.jpg",
    quote: "Miguel",
  },
  {
    name: "Igor Mazimpaka",
    role: "COO",
    avatar: "/images/Igor1.jpg",
    quote: "Igor",
  },
  {
    name: "Junior Ngango",
    role: "CTO",
    avatar: "/images/Jr-Black-White.jpg",
    quote: "A software Engineer who constantly seeks out creative solutions to every problems.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>About Us - ƎJO-D</title>
        <meta name="description" content="Learn about ƎJO-D's mission, team, and expertise in 3D solutions for education and medical sectors." />
      </Head>
      <section className="px-10">
        <div className="max-w-4xl mx-auto text-center pt-28">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About ƎJO-D</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            ƎJO-D is a innovative tech company dedicated to bringing cutting-edge 3D solutions to the education and medical sectors. Our team of experts combines creativity and technical prowess to deliver immersive experiences that transform learning and healthcare.
          </p>
        </div>
      </section>
      <section className="py-20 px-10 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center">
                <Image
                  src={member.avatar}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  alt={`${member.name}, ${member.role}`}
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-accent mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 italic">"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}