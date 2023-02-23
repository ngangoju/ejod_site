import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
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
    quote:
      "A software Engineer who constantly seeks out creative solutions to every problems.",
  },
];

export default function Home() {
  const [isDarkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!isDarkMode);
  }

  return (
    <div>
      <Head>
        <title>ƎJO-D Website</title>
        <meta
          name="description"
          content="Ǝjo-D is a tech company bringing 3D solutions in education and medical sectors"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`bg-blue-100 px-10 ${
          isDarkMode ? "bg-gray-800 text-white" : ""
        }`}
      >
        <section className="relative">
          <nav className="pt-10 mb-12 flex justify-between">
            <h1 className="text-xl font-semibold">ƎJO-D</h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={toggleDarkMode}
                  className="cursor-pointer"
                />
              </li>
              <li>
                <a
                  href="#"
                  className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-4 py-2 rounded-md ml-8"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </section>
        <section className="p-10 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-8 items-center">
          <div className="sm:mb-20 w-auto h-80 md:h-full md:mb-0 sm:pt-0">
            <Image
              src="/ar.svg"
              alt="Illustration of virtual reality headset and globe"
              className="w-full"
              width={900}
              height={600}
            />
            <p className="text-gray-500 text-center my-2">
              Explore new worlds with EJO-D&apos;s immersive 3D and VR experiences
            </p>
          </div>
          <div className="md:p-0 sm:mt-6">
            <div className="max-w-lg mx-auto">
              <div className="animate-left">
                <h1 className="text-4xl font-bold">
                  Blast off to new worlds with EJO-D, the premier African 3D and
                  VR content creation startup
                </h1>
                <p className="my-6">
                  Our talented team of designers and artists create jaw-dropping
                  3D and VR experiences that bring your ideas to life with
                  creativity and flair. From architectural visualization to
                  product prototyping, we transport you to places you&apos;ve never
                  been before. As an African startup, we&apos;re proud to showcase
                  the boundless creativity and innovation of our continent. Join
                  us on a journey to the unknown!
                </p>
                <div className="text-center">
                  <Link href="#">
                    <a className="btn btn-primary mr-4">Get in touch</a>
                  </Link>
                  <span className="text-gray-500">
                    Or send us a message at{" "}
                    <a href="mailto:info@ejo-d.com" className="inline-block">
                      info@ejo-d.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="text-center p-10 my-12">
          <h2 className="mb-5 text-2xl text-center font-medium">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {leadershipTeam.map((member, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-lg p-6 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "dark:bg-white text-gray-600"
                }`}
              >
                <Image
                  src={member.avatar}
                  className="w-32 h-32 rounded-full mx-auto"
                  width={200}
                  height={200}
                  alt="CEO avatar"
                />
                <h3 className="text-lg font-medium text-center py-2">
                  {member.name}
                </h3>
                <p className="text-center font-medium py-2">{member.role}</p>
                <p className="text-center py-2 px-8">{member.quote}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          {" "}
          <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 z-10">
            <AiFillTwitterCircle />
            <AiFillLinkedin />
            <AiFillYoutube />
          </div>
        </section>
        <section className="text-center p-10 my-12">
          <div>
            <h3 className="text-3xl py-1">Services we offer</h3>
            <p className="text-md py-2 leading-8">
              Since the beginning of my journey as a freelance designer and
              developer, I&apos;ve done remote work for
              <span className="text-teal-500"> agencies </span>
              consulted for <span className="text-teal-500">startups </span>
              and collaborated with talanted people to create digital products
              for both business and consumer use.
            </p>
            <p className="text-md py-2 leading-8">
              I offer from a wide range of services, including brand design,
              programming and teaching.
            </p>
          </div>
          <div className="lg:flex gap-10">
            <div
              className={`text-center shadow-lg p-10 rounded-xl my-10  flex-1 ${
                isDarkMode ? "bg-gray-700" : "dark:bg-white "
              }`}
            >
              <Image
                src="https://raw.githubusercontent.com/developedbyed/react-portofolio-with-tailwind/main/public/design.png"
                alt="design"
                width={100}
                height={100}
              />
              <h3 className="text-lg font-medium pt-8 pb-2  ">
                Beautiful Designs
              </h3>
              <p className="py-2">
                Creating elegant designs suited for your needs following core
                design theory.
              </p>
            </div>
            <div
              className={`text-center shadow-lg p-10 rounded-xl my-10 flex-1 ${
                isDarkMode ? "bg-gray-700" : "dark:bg-white "
              }`}
            >
              <Image
                src="https://raw.githubusercontent.com/developedbyed/react-portofolio-with-tailwind/main/public/code.png"
                alt="code"
                width={100}
                height={100}
              />
              <h3 className="text-lg font-medium pt-8 pb-2 ">
                Code your dream project
              </h3>
              <p className="py-2">
                Do you have an idea for your next great website? Let&apos;s make
                it a reality.
              </p>
            </div>
            <div
              className={`text-center shadow-lg p-10 rounded-xl my-10 flex-1 ${
                isDarkMode ? "bg-gray-700" : "dark:bg-white "
              }`}
            >
              <Image
                src="https://raw.githubusercontent.com/developedbyed/react-portofolio-with-tailwind/main/public/consulting.png"
                alt="consulting"
                width={100}
                height={100}
              />
              <h3 className="text-lg font-medium pt-8 pb-2 ">Consulting</h3>
              <p className="py-2">
                Are you interested in feedback for your current project? I can
                give you tips and tricks to level it up.
              </p>
            </div>
          </div>
        </section>
        <section className={`text-center p-10`}>
          <div>
            <h3 className="text-3xl py-1">Portfolio</h3>
            <p className="text-md py-2 leading-8">
              Since the beginning of my journey as a freelance designer and
              developer, I&apos;ve done remote work for
              <span className="text-teal-500"> agencies </span>
              consulted for <span className="text-teal-500">startups </span>
              and collaborated with talanted people to create digital products
              for both business and consumer use.
            </p>
            <p className="text-md py-2 leading-8">
              I offer from a wide range of services, including brand design,
              programming and teaching.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}