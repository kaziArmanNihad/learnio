import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEye, FaHeart, FaGripfire, FaAddressBook } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BsRocket, BsStars, BsTrophy } from "react-icons/bs";
import { MdTrendingUp, MdGroups, MdSchool } from "react-icons/md";
import { Link } from "react-router";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

function About() {
  // Refs for animations
  const aboutRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const particlesRef = useRef([]);
  const floatingElementsRef = useRef([]);

  // Enhanced cards data
  const cards = [
    {
      id: "mission",
      title: "Our Mission",
      description:
        "Our mission is to provide accessible, high-quality education to everyone, everywhere, breaking down barriers to learning.",
      icon: <FaAddressBook className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
      stats: { number: "50K+", label: "Students" },
    },
    {
      id: "vision",
      title: "Our Vision",
      description:
        "We envision a future where curiosity is the only prerequisite for knowledge, and learning knows no boundaries.",
      icon: <FaEye className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      stats: { number: "1K+", label: "Courses" },
    },
    {
      id: "purpose",
      title: "Our Purpose",
      description:
        "Our purpose is to ignite a passion for learning. By offering a diverse range of courses and a supportive community, we empower individuals to acquire new skills, pursue their passions, and achieve their full potential.",
      icon: <FaHeart className="text-2xl" />,
      color: "from-orange-500 to-red-500",
      stats: { number: "95%", label: "Success Rate" },
      fullWidth: true,
    },
  ];

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        aboutRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -150,
          opacity: 0,
          duration: Math.random() * 5 + 4,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 4,
        });
      }
    };

    createParticles();

    return () => {
      particlesRef.current.forEach((particle) => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  // Main animations
  useEffect(() => {
    // Badge animation
    gsap.fromTo(
      badgeRef.current,
      {
        scale: 0,
        opacity: 0,
        rotation: -180,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Title animation with character reveal
    gsap.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
        rotationX: -45,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Cards stagger animation
    gsap.fromTo(
      cardsRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.8,
        rotationY: 45,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Stats animation
    gsap.fromTo(
      statsRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.5,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Floating elements
    gsap.fromTo(
      floatingElementsRef.current,
      {
        scale: 0,
        opacity: 0,
        rotation: -90,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Continuous floating animation
    gsap.to(floatingElementsRef.current, {
      y: "random(-15, 15)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: {
        amount: 2,
        from: "random",
      },
    });
  }, []);

  // Card hover animations
  const handleCardHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -12,
        scale: 1.03,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={aboutRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="from-orange-400/8 to-pink-400/8 absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r blur-3xl sm:h-96 sm:w-96" />
        <div
          className="from-blue-400/8 to-purple-400/8 absolute bottom-1/4 right-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r blur-3xl sm:h-96 sm:w-96"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-8xl xl:w-8xl relative z-10 mx-auto w-11/12 py-12 sm:py-16 lg:py-2">
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Content Section */}
          <div className="flex flex-col space-y-6 sm:space-y-8">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2"
            >
              <BsStars className="text-sm text-orange-500" />
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                About Us
              </p>
            </div>

            {/* Enhanced Title */}
            <div className="space-y-4">
              <h1
                ref={titleRef}
                className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl"
              >
                Your Journey to Lifelong Learning Starts Here. Discover a World
                of{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Knowledge.
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 opacity-50 blur-lg" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                🚀 Empowering minds through innovative education and fostering a
                global community of lifelong learners.
              </p>
            </div>

            {/* peragraph */}
            <p className="text-justify">
              At Learnio, we believe that education should be accessible,
              engaging, and transformative for everyone. Our platform is
              designed to connect learners with high-quality courses created by
              experienced instructors, empowering individuals to develop new
              skills, advance their careers, and achieve their personal goals.
              Whether you&#39;re exploring a new passion, preparing for your
              next professional opportunity, or expanding your knowledge,
              Learnio provides a flexible and supportive learning environment
              tailored to your needs. With a growing community of learners and
              educators, we are committed to making lifelong learning simple,
              effective, and inspiring for people around the world.
            </p>
          </div>

          {/* Right Cards Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-2 xl:gap-4">
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-300 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl sm:p-8 ${
                  card.fullWidth ? "sm:col-span-2" : ""
                }`}
                onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                />

                {/* Card Header */}
                <div className="mb-4 flex items-center gap-4 sm:mb-6">
                  <div
                    className={`bg-gradient-to-r p-3 ${card.color} rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <div className="text-white">{card.icon}</div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-500 sm:text-lg">
                      {card.title}
                    </h2>
                    {card.stats && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-bold text-orange-500">
                          {card.stats.number}
                        </span>
                        {card.stats.label}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 sm:text-base">
                  {card.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-20">
                  <HiLightningBolt className="text-2xl text-orange-500" />
                </div>

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} scale-x-0 transform transition-transform duration-500 group-hover:scale-x-100`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}

        <div className="mt-16 text-center sm:mt-20 lg:mt-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-8 text-white sm:p-12 lg:p-16">
            {/* Decorative dot-grid pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Soft glow blobs */}
            <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-purple-300/30 blur-3xl" />

            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center gap-3 sm:mb-6">
                <div className="rounded-xl bg-white/20 p-3 ring-1 ring-white/30">
                  <FaGripfire className="text-2xl sm:text-3xl" />
                </div>
                <h3 className="text-lg font-bold sm:text-2xl lg:text-4xl">
                  Join the Learnio Community
                </h3>
              </div>

              <p className="mx-auto mb-6 max-w-2xl text-center text-base opacity-90 sm:mb-8 sm:text-lg lg:text-xl">
                Be part of a global movement that&#39;s reshaping education and
                empowering learners worldwide.
              </p>

              {/* Overlapping student avatars */}
              <div className="mb-8 flex items-center justify-center">
                <div className="flex -space-x-3">
                  {[
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    "https://randomuser.me/api/portraits/women/68.jpg",
                    "https://randomuser.me/api/portraits/men/26.jpg",
                    "https://i.pinimg.com/736x/8e/72/cc/8e72ccddf7f836088b4d432efbd320d9.jpg",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Learnio student"
                      className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md sm:h-12 sm:w-12"
                    />
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/25 text-xs font-bold backdrop-blur-sm sm:h-12 sm:w-12 sm:text-sm">
                    +2.5k
                  </div>
                </div>
              </div>

              <Link to="/contact">
                <button className="group rounded-2xl bg-white px-8 py-4 text-base font-bold text-orange-500 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white sm:px-12 sm:py-5 sm:text-lg lg:text-xl">
                  <span className="flex items-center justify-center gap-3">
                    <BsRocket className="text-xl transition-transform duration-300 group-hover:rotate-12" />
                    Start Your Journey
                    <HiSparkles className="text-xl transition-transform duration-300 group-hover:scale-125" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
