import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsLightning, BsHeart, BsGlobe, BsLinkedin, BsAward, BsCheckCircle, BsTrophy } from "react-icons/bs";

const leadershipTeam = [
  {
    name: "Dr. Miguel Gasakure",
    role: "Chief Executive Officer",
    avatar: "/images/Miguel-Black-White.jpg",
    bio: "Surgeon at CHUK Rwanda, honored as 'Best Professional and Ethical Employee' 2023-2024. Tech enthusiast and researcher dedicated to advancing healthcare through innovation.",
    linkedin: "https://rw.linkedin.com/in/gasakure-miguel-648987176",
    expertise: ["Healthcare", "Leadership", "Innovation"],
  },
  {
    name: "Igor Mazimpaka",
    role: "Creative Director",
    avatar: "/images/Igor1.jpg",
    bio: "Graphic designer, 3D Developer, CGI Engineer, and professional medical interpreter bringing creative vision to immersive healthcare solutions.",
    linkedin: "https://rw.linkedin.com/in/igor-mazimpaka-ngango-923229bb",
    expertise: ["3D Design", "CGI", "Creative"],
  },
  {
    name: "Junior Ngango",
    role: "Engineering Director",
    avatar: "/images/Jr-Black-White.jpg",
    bio: "Senior Software Engineer with 7+ years experience building enterprise solutions. Technical leader driving EJOD's XR development and innovation.",
    linkedin: "https://rw.linkedin.com/in/junior-ngango",
    expertise: ["Engineering", "XR Dev", "Architecture"],
  },
];


const values = [
  {
    icon: BsLightning,
    title: "Innovation",
    description: "We push the boundaries of what's possible with emerging technologies, staying ahead of the curve to deliver cutting-edge solutions.",
    color: "bg-brand-orange",
  },
  {
    icon: BsHeart,
    title: "Impact",
    description: "Every project we undertake is measured by the real-world difference it makes—in classrooms, hospitals, and communities.",
    color: "bg-accent-coral",
  },
  {
    icon: BsGlobe,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in design, development, and delivery, ensuring world-class quality in everything we do.",
    color: "bg-neon-cyan",
  },
];

const milestones = [
  { 
    year: "2023", 
    title: "Founded", 
    description: "EJOD was established with a vision to revolutionize learning through technology.",
    icon: BsLightning,
  },
  { 
    year: "2024", 
    title: "First Projects", 
    description: "Launched VR training and AR applications for education and healthcare sectors.",
    icon: BsAward,
  },
  { 
    year: "2025", 
    title: "Growing Impact", 
    description: "Expanding services across East African educational and medical institutions.",
    icon: BsTrophy,
  },
];

const stats = [
  { value: "25+", label: "Partner Institutions" },
  { value: "3", label: "XR Platforms Built" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "2+", label: "Years of Innovation" },
];

export default function About() {
  return (
    <main className="min-h-screen bg-white dark:bg-deep-space transition-colors duration-300">
      <Head>
        <title>About Us | ƎJO-D - Pioneers in Immersive Technology</title>
        <meta name="description" content="Learn about EJOD's mission, team, and expertise in creating transformative 3D, VR, and AR solutions for education and healthcare." />
      </Head>

      {/* Hero Section - Premium */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg-light dark:mesh-bg"></div>
        <div className="absolute inset-0 dot-pattern-bg opacity-30 dark:opacity-20"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/15 blur-[120px]"></div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <div className="isometric-badge mb-6">
              <BsGlobe className="text-brand-orange" />
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Pioneers in
              <br />
              <span className="text-brand-orange">Immersive Technology</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-silver-mist leading-relaxed">
              We're a team of engineers, designers, and educators passionate about transforming how the world learns and heals through cutting-edge XR technology.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-midnight/30">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">{stat.value}</div>
                <div className="text-gray-500 dark:text-silver-mist text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Premium */}
      <section className="section-padding bg-white dark:bg-transparent">
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
              <p className="text-gray-600 dark:text-silver-mist text-lg leading-relaxed mb-8">
                From medical students practicing complex procedures in virtual environments to classrooms experiencing history come alive through augmented reality, we're building the future of experiential learning.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="btn-primary group">
                  Our Services
                  <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/portfolio" className="btn-secondary">
                  View Our Work
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="elevated-card p-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-midnight/50 relative">
                  <Image
                    src="/images/Medical_Anatomy_App.png"
                    alt="EJOD immersive experience"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-deep-space/60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-5xl font-bold mb-2">XR</div>
                      <div className="text-sm opacity-80">Extended Reality</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-brand-orange opacity-10 dark:opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-neon-cyan opacity-10 dark:opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Premium */}
      <section className="section-padding bg-gray-50 dark:bg-midnight/30">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-subtitle">Our Values</span>
            <h2 className="section-title">What Drives Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="premium-card text-center group">
                  <div className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-silver-mist">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section - Premium */}
      <section className="section-padding bg-white dark:bg-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-orange/5 dark:bg-brand-orange/10 blur-[150px]"></div>
        <div className="absolute inset-0 grid-pattern-bg opacity-50"></div>
        
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
              <div key={index} className="elevated-card overflow-visible group">
                {/* Image */}
                <div className="relative h-80 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-2xl">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-deep-space/20 group-hover:bg-deep-space/10 transition-colors"></div>
                  
                  {/* LinkedIn overlay */}
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-midnight/90 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-orange hover:text-white shadow-lg"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <BsLinkedin className="text-brand-orange group-hover:text-current" />
                  </a>
                </div>
                
                {/* Content */}
                <div className="px-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-brand-orange font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-silver-mist text-sm mb-4">{member.bio}</p>
                  
                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-brand-orange/5 dark:bg-brand-orange/10 text-brand-orange rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Premium */}
      <section className="section-padding bg-gray-50 dark:bg-midnight/30">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title">Milestones</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={index} className="relative pl-16 pb-12 last:pb-0 group">
                  {/* Timeline line */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-brand-orange/20"></div>
                  )}
                  
                  {/* Timeline icon */}
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="text-white text-xl" />
                  </div>
                  
                  {/* Content */}
                  <div className="premium-card ml-4">
                    <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-3">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-silver-mist">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="section-padding bg-white dark:bg-transparent relative">
        <div className="absolute inset-0 dot-pattern-bg opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-brand-orange/5 dark:bg-brand-orange/10 blur-[150px]"></div>
        </div>
        
        <div className="container-narrow relative z-10 text-center">
          <div className="isometric-badge mx-auto mb-8">
            <BsHeart className="text-brand-orange" />
            <span>Join us</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Join Our
            <span className="text-brand-orange"> Journey?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-silver-mist mb-10 max-w-2xl mx-auto">
            Whether you're looking to collaborate on a project or join our team, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary group">
              Get in Touch
              <BsArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              See Our Work
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 dark:text-silver-mist">
            <span className="flex items-center gap-2">
              <BsCheckCircle className="text-success-green" />
              Open to partnerships
            </span>
            <span className="flex items-center gap-2">
              <BsCheckCircle className="text-success-green" />
              Always learning
            </span>
            <span className="flex items-center gap-2">
              <BsCheckCircle className="text-success-green" />
              Impact-driven
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}