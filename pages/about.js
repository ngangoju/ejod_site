import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsLightning, BsHeart, BsGlobe, BsLinkedin } from "react-icons/bs";

const leadershipTeam = [
  {
    name: "Dr. Miguel Gasakure",
    role: "Chief Executive Officer",
    avatar: "/images/Miguel-Black-White.jpg",
    bio: "Surgeon at CHUK Rwanda, honored as 'Best Professional and Ethical Employee' 2023-2024. Tech enthusiast and researcher dedicated to advancing healthcare through innovation.",
    linkedin: "https://rw.linkedin.com/in/gasakure-miguel-648987176",
  },
  {
    name: "Igor Mazimpaka",
    role: "Creative Director",
    avatar: "/images/Igor1.jpg",
    bio: "Graphic designer, 3D Developer, CGI Engineer, and professional medical interpreter bringing creative vision to immersive healthcare solutions.",
    linkedin: "https://rw.linkedin.com/in/igor-mazimpaka-ngango-923229bb",
  },
  {
    name: "Junior Ngango",
    role: "Engineering Director",
    avatar: "/images/Jr-Black-White.jpg",
    bio: "Senior Software Engineer with 7+ years experience building enterprise solutions. Technical leader driving EJOD's XR development and innovation.",
    linkedin: "https://rw.linkedin.com/in/junior-ngango",
  },
];


const values = [
  {
    icon: BsLightning,
    title: "Innovation",
    description: "We push the boundaries of what's possible with emerging technologies, staying ahead of the curve to deliver cutting-edge solutions.",
  },
  {
    icon: BsHeart,
    title: "Impact",
    description: "Every project we undertake is measured by the real-world difference it makes—in classrooms, hospitals, and communities.",
  },
  {
    icon: BsGlobe,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in design, development, and delivery, ensuring world-class quality in everything we do.",
  },
];

const milestones = [
  { year: "2023", title: "Founded", description: "EJOD was established with a vision to revolutionize learning through technology." },
  { year: "2024", title: "First Projects", description: "Launched VR training and AR applications for education and healthcare." },
  { year: "2025", title: "Growing Impact", description: "Expanding services across East African educational and medical institutions." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-deep-space transition-colors duration-300">
      <Head>
        <title>About Us | ƎJO-D - Pioneers in Immersive Technology</title>
        <meta name="description" content="Learn about EJOD's mission, team, and expertise in creating transformative 3D, VR, and AR solutions for education and healthcare." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg-light dark:mesh-bg"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/15 blur-[120px]"></div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="section-subtitle">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Pioneers in
              <br />
              <span className="text-cosmic-purple">Immersive Technology</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-silver-mist leading-relaxed">
              We're a team of engineers, designers, and educators passionate about transforming how the world learns and heals through cutting-edge XR technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gray-50 dark:bg-midnight/30">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-subtitle">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Democratizing Access to Immersive Learning
              </h2>
              <p className="text-gray-600 dark:text-silver-mist text-lg leading-relaxed mb-6">
                At ƎJO-D, we believe that geographic and economic barriers should never limit access to world-class education and training. Our mission is to leverage 3D, VR, and AR technologies to create transformative learning experiences accessible to everyone.
              </p>
              <p className="text-gray-600 dark:text-silver-mist text-lg leading-relaxed">
                From medical students practicing complex procedures in virtual environments to classrooms experiencing history come alive through augmented reality, we're building the future of experiential learning.
              </p>
            </div>
            
            <div className="relative">
              <div className="service-card p-2 rounded-2xl">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-midnight/50 relative">
                  <Image
                    src="/images/Medical_Anatomy_App.png"
                    alt="EJOD immersive experience"
                    layout="fill"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-deep-space/80"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-cosmic-purple opacity-10 dark:opacity-20 blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white dark:bg-transparent">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-subtitle">Our Values</span>
            <h2 className="section-title">What Drives Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="service-card text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-cosmic-purple/10 border border-cosmic-purple/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-3xl text-cosmic-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-silver-mist">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50 dark:bg-midnight/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cosmic-purple/5 dark:bg-cosmic-purple/10 blur-[150px]"></div>
        
        <div className="container-wide relative z-10">
          <div className="section-header">
            <span className="section-subtitle">Our Team</span>
            <h2 className="section-title">Leadership</h2>
            <p className="section-description">
              Meet the visionaries driving innovation at ƎJO-D.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="bg-white dark:bg-midnight/50 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden group hover:border-cosmic-purple/30 transition-all duration-500 shadow-sm dark:shadow-none">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    layout="fill"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-deep-space/20"></div>
                  
                  {/* LinkedIn overlay */}
                  <a 
                    href={member.linkedin}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cosmic-purple/50"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <BsLinkedin className="text-white" />
                  </a>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-cosmic-purple font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-silver-mist text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white dark:bg-transparent">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title">Milestones</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative pl-8 pb-12 last:pb-0 group">
                {/* Timeline line */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-px bg-cosmic-purple"></div>
                )}
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-cosmic-purple border-4 border-white dark:border-deep-space group-hover:scale-125 transition-transform"></div>
                
                {/* Content */}
                <div className="service-card p-6 ml-4">
                  <span className="text-cosmic-purple font-bold text-lg">{milestone.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-silver-mist">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50 dark:bg-midnight/30 relative">
        <div className="absolute inset-0 bg-transparent"></div>
        
        <div className="container-narrow relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Join Our
            <span className="text-cosmic-purple"> Journey?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl mx-auto">
            Whether you're looking to collaborate on a project or join our team, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <span className="btn-primary cursor-pointer group">
                Get in Touch
                <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/portfolio">
              <span className="btn-secondary cursor-pointer">
                See Our Work
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}