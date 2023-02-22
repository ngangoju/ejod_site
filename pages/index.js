import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

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
    avatar: "./images/Miguel-Black-White.jpg",
    quote: "Miguel",
  },
  {
    name: "Igor Mazimpaka",
    role: "COO",
    avatar: "./images/Igor1.jpg",
    quote: "Igor",
  },
  {
    name: "Junior Ngango",
    role: "CTO",
    avatar: "./images/Jr-Black-White.jpg",
    quote: "A software Engineer who constantly seeks out creative solutions to every problems.",
  },
];

export default function Home() {
  // const [quote, setQuote] = useState("");

  // useEffect(() => {
  //   async function getQuote() {
  //     try {
  //       const res = await fetch(
  //         "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"
  //       );
  //       const data = await res.json();
  //       const { q } = data[0]; // Destructure the data object to get the "q" value
  //       setQuote(q);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   getQuote();
  // }, []);
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
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
            <Carousel
              responsive={responsive}
              className="w-full h-full"
              containerClass="relative"
            >
              <div>
                <img
                  src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="3D Image"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/6474473/pexels-photo-6474473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="VR Image"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1533310266094-8898a03807dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="AR Image"
                  className="h-full w-full object-cover"
                />
              </div>
            </Carousel>
          </div> */}
        <section className="p-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
          {/* Hero Images */}
          <div className="md:p-0 w-auto h-80 md:h-full sm:mt-0 sm:pt-0">
            <Image src="./ar.svg" alt="Illustration" className="w-full" />
          </div>

          {/* Hero Content */}
          <div className="md:p-0 sm:mt-10">
            <div className="max-w-lg mx-auto">
              <div className="animate-left">
                <h1 className="text-3xl md:text-5xl font-bold m-4">
                  We specialize in UI/UX, Web Development, Digital Marketing.
                </h1>
                <p className="mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque fringilla magna mauris. Nulla fermentum viverra sem eu
                  rhoncus consequat varius nisi quis, posuere magna.
                </p>
                <div className="text-center">
                  <a href="#" className="btn btn-primary mr-4">
                    Get Started Now
                  </a>
                  <span className="text-gray-500">
                    <a href="#" className="inline-block">
                      Call us (250) 786 686 - 391
                    </a>
                    <span className="inline-block ml-2">
                      For any question or concern
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="px-10 flex">
  <img src="./ar.svg" alt="Illustration" className="w-1/2" />
  <div className="w-1/2 pl-4">
    <h3 className="text-2xl font-medium">Heading</h3>
    <p className="text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, 
      magna eu convallis tincidunt, augue odio ullamcorper ante, eget 
      tincidunt nulla ipsum vel quam.
    </p>
  </div>
</div> */}

        <section className="text-center p-10 my-12">
          <h2 className="mb-5 text-2xl text-center font-medium">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <Image
                  src={member.avatar}
                  className="w-32 h-32 rounded-full mx-auto"
                  alt="CEO avatar"
                />
                <h3 className="text-lg font-medium text-center py-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-center font-medium py-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center py-2">{member.quote}</p>
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
        <section>
          <div>
            <h3 className="text-3xl py-1 dark:text-white ">Services I offer</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              Since the beginning of my journey as a freelance designer and
              developer, I&apos;ve done remote work for
              <span className="text-teal-500"> agencies </span>
              consulted for <span className="text-teal-500">startups </span>
              and collaborated with talanted people to create digital products
              for both business and consumer use.
            </p>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services, including brand design,
              programming and teaching.
            </p>
          </div>
          <div className="lg:flex gap-10">
            <div className="text-center shadow-lg p-10 rounded-xl my-10  dark:bg-white flex-1">
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
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
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
                Do you have an idea for your next great website? Let&apos;s make it a
                reality.
              </p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
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
        <section className="py-10">
          <div>
            <h3 className="text-3xl py-1 dark:text-white ">Portofolio</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              Since the beginning of my journey as a freelance designer and
              developer, I&apos;ve done remote work for
              <span className="text-teal-500"> agencies </span>
              consulted for <span className="text-teal-500">startups </span>
              and collaborated with talanted people to create digital products
              for both business and consumer use.
            </p>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services, including brand design,
              programming and teaching.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
