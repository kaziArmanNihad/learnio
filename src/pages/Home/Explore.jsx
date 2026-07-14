import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaPlay,
  FaUsers,
  FaGraduationCap,
  FaCertificate,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt, HiAcademicCap } from "react-icons/hi";
import { BsStars, BsTrophy } from "react-icons/bs";
import { MdTrendingUp, MdAccessTime, MdVerified } from "react-icons/md";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
  // Refs for animations
  const exploreRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef([]);
  const buttonRef = useRef(null);
  const statsRef = useRef([]);
  const badgeRef = useRef(null);
  const particlesRef = useRef([]);

  // Enhanced features data
  const features = [
    {
      icon: <MdAccessTime className="text-xl" />,
      title: "Flexible Learning",
      description:
        "Study at your own pace, anytime, anywhere with lifetime access to content.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaGraduationCap className="text-xl" />,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with real-world experience and proven track records.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <HiLightningBolt className="text-xl" />,
      title: "Interactive Content",
      description:
        "Engage with quizzes, projects, and a vibrant community of fellow learners.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaCertificate className="text-xl" />,
      title: "Certification Ready",
      description:
        "Earn industry-recognized certificates upon successful course completion.",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Statistics data
  const stats = [
    { number: "50K+", label: "Active Students", icon: FaUsers },
    { number: "1000+", label: "Premium Courses", icon: HiAcademicCap },
    { number: "95%", label: "Success Rate", icon: BsTrophy },
    { number: "24/7", label: "Support Available", icon: MdVerified },
  ];

  // Create subtle particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        exploreRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -120,
          opacity: 0,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 3,
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
    // Image animation with 3D effect
    gsap.fromTo(
      imageRef.current,
      {
        x: -100,
        opacity: 0,
        rotationY: -30,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

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
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Title animation
    gsap.fromTo(
      titleRef.current,
      {
        x: 100,
        opacity: 0,
        scale: 0.9,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Description animation
    gsap.fromTo(
      descriptionRef.current,
      {
        x: 80,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Features stagger animation
    gsap.fromTo(
      featuresRef.current,
      {
        x: 60,
        opacity: 0,
        scale: 0.9,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Button animation
    gsap.fromTo(
      buttonRef.current,
      {
        x: 60,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
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
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  // Image hover effect
  const handleImageHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  // Button hover effect
  const handleButtonHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Feature hover effect
  const handleFeatureHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        x: 5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={exploreRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 py-12 sm:pb-16 lg:pb-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl xl:w-4/5">
        <div className="items-center overflow-hidden rounded-3xl border border-gray-300 bg-white/50 shadow-2xl backdrop-blur-sm md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="relative p-6 sm:p-8 lg:p-12">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="absolute left-8 top-8 z-10 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-1.5 backdrop-blur-sm"
            >
              <BsStars className="text-sm text-orange-500" />
              <span className="text-xs font-bold text-orange-600">
                PREMIUM CONTENT
              </span>
            </div>

            <div className="relative">
              <img
                ref={imageRef}
                src="https://i.pinimg.com/736x/14/76/0a/14760a486f3c746fc6e1148f6d06db68.jpg"
                alt="Explore Section image"
                className="h-64 w-full rounded-2xl border border-gray-300 object-cover shadow-2xl sm:h-80 lg:h-96"
                onMouseEnter={(e) => handleImageHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleImageHover(e.currentTarget, false)}
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group rounded-full bg-white/90 p-4 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 sm:p-6">
                  <FaPlay className="ml-1 text-2xl text-orange-500 sm:text-3xl" />
                </button>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </div>

            {/* Stats Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    ref={(el) => (statsRef.current[index] = el)}
                    className="rounded-xl border border-gray-300 bg-white/80 p-3 text-center shadow-lg backdrop-blur-sm"
                  >
                    <div className="mb-2 inline-flex rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 p-2 shadow-md">
                      <IconComponent className="text-sm text-white" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 md:pr-8 lg:p-12 lg:pr-12">
            {/* Title */}
            <h1
              ref={titleRef}
              className="mb-6 text-2xl font-bold leading-tight text-gray-800 sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
            >
              Unlock your potential with our{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                online courses.
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg"
            >
              🚀 Our platform provides you with the best resources to learn new
              skills, advance your career, and pursue your passions. Get started
              today and join a community of learners who are transforming their
              futures.
            </p>

            {/* Enhanced Features List */}
            <div className="mb-8 space-y-4 sm:space-y-5">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className="group flex cursor-pointer items-start gap-4 rounded-xl border border-gray-300 bg-white/60 p-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg sm:p-4"
                  onMouseEnter={(e) =>
                    handleFeatureHover(e.currentTarget, true)
                  }
                  onMouseLeave={(e) =>
                    handleFeatureHover(e.currentTarget, false)
                  }
                >
                  <div
                    className={`flex-shrink-0 bg-gradient-to-r p-2.5 ${feature.color} rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-500">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Button */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                ref={buttonRef}
                className="bg-ornage-500 group relative transform overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:bg-white hover:text-orange-500"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center justify-center gap-1">
                  <HiSparkles className="text-xl" />
                  Explore Courses
                </span>
              </button>

              <button className="bg-ornage-500 group relative transform overflow-hidden rounded-2xl border border-orange-500 bg-orange-500 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:bg-white hover:text-orange-500">
                <span className="flex items-center justify-center gap-1">
                  <FaPlay className="text-sm" />
                  Watch Preview
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex items-center gap-6 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <MdTrendingUp className="text-xl text-green-500" />
                <span className="text-sm text-gray-600">Growing Community</span>
              </div>
              <div className="flex items-center gap-2">
                <MdVerified className="text-xl text-blue-500" />
                <span className="text-sm text-gray-600">Verified Content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
