import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGripfire,
  FaCheckCircle,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt, HiAcademicCap } from "react-icons/hi";
import { BsRocket, BsStars, BsTrophy } from "react-icons/bs";
import { Link } from "react-router";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const LearnioOffers = () => {
  // Refs for animations
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const benefitsRef = useRef(null);
  const benefitItemsRef = useRef([]);
  const imagesRef = useRef([]);
  const statsRef = useRef([]);
  const particlesRef = useRef([]);

  // Image data with enhanced information
  const imgContainer = [
    {
      img: "https://i.pinimg.com/736x/ff/4e/63/ff4e634f1fc5dfe0c573fc6e131957d3.jpg",
      title: "Expert Instructors",
      description: "Learn from industry professionals",
    },
    {
      img: "https://i.pinimg.com/736x/7e/54/eb/7e54eb0da4a3b1a80e5bead21fdf1b4b.jpg",
      title: "Interactive Learning",
      description: "Hands-on projects and real-world applications",
    },
    {
      img: "https://i.pinimg.com/736x/36/1c/2f/361c2ff2affc361eae7acf7cb1e81553.jpg",
      title: "Global Community",
      description: "Connect with learners worldwide",
    },
  ];

  // Enhanced benefits data
  const benefits = [
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Expert-Led Courses",
      description:
        "Learn directly from experienced professionals and industry leaders with real-world expertise.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <HiLightningBolt className="text-2xl" />,
      title: "Flexible Learning",
      description:
        "Study at your own pace, anytime and anywhere with our mobile-friendly platform.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <BsTrophy className="text-2xl" />,
      title: "Affordable Education",
      description:
        "Access premium content without breaking the bank. Quality education for everyone.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <BsRocket className="text-2xl" />,
      title: "Career Growth",
      description:
        "Boost your career prospects with certificates and skills that employers value.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Statistics data
  const stats = [
    { number: "50K+", label: "Happy Students", icon: FaUsers },
    { number: "1000+", label: "Quality Courses", icon: HiAcademicCap },
    { number: "95%", label: "Success Rate", icon: BsTrophy },
    { number: "24/7", label: "Support", icon: HiSparkles },
  ];

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        aboutRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -100,
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
    // Title animation
    gsap.fromTo(
      titleRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
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
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
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

    // Benefits section animation
    gsap.fromTo(
      benefitsRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Benefit items stagger animation
    gsap.fromTo(
      benefitItemsRef.current,
      {
        y: 40,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Images animation
    gsap.fromTo(
      imagesRef.current,
      {
        y: 100,
        opacity: 0,
        rotationY: 45,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imagesRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Stats animation
    gsap.fromTo(
      statsRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.5,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  // Image hover effects
  const handleImageHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        y: -10,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  // Benefit card hover effects
  const handleBenefitHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={aboutRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="xl:w-8xl relative z-10 mx-auto w-11/12 max-w-7xl space-y-12 py-12 sm:space-y-16 sm:py-16 lg:space-y-20 lg:py-20">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-8 lg:gap-12 xl:flex-row">
          {/* Brand Section */}
          <div className="w-full space-y-6 text-left sm:space-y-8 xl:w-1/2 xl:p-5">
            <div ref={titleRef} className="space-y-4">
              <div className="flex items-center gap-3 text-3xl font-black sm:text-4xl lg:text-5xl xl:text-3xl">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-75 blur" />
                  <div className="relative rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-3 shadow-xl">
                    <FaGripfire className="text-white" />
                  </div>
                </div>
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Learnio
                </span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2">
                <BsStars className="text-sm text-orange-500" />
                <span className="text-sm font-medium text-orange-600">
                  Transforming Education Since 2024
                </span>
              </div>
            </div>

            <p
              ref={descriptionRef}
              className="text-base leading-relaxed text-gray-600 sm:text-lg lg:text-lg"
            >
              🚀 Learnio is an innovative online learning platform where
              students can connect with expert teachers and purchase
              high-quality courses across a wide range of subjects. Whether
              you&#39;re looking to boost your career, pick up a new hobby, or
              master in-demand skills, Learnio provides a flexible, affordable,
              and engaging learning experience.
            </p>
            <p
              ref={descriptionRef}
              className="text-base leading-relaxed text-gray-600 sm:text-lg lg:text-lg"
            >
              Learnio will be always there for you&#39;r help . Adipisci
              nesciunt aut eaque alias, quaerat itaque sapiente suscipit facilis
              voluptatibus reiciendis amet vel ut. Vitae possimus facere
              repellat, harum inventore perspiciatis? Corrupti distinctio optio
              dolore voluptatem amet nobis suscipit vel quam modi numquam ipsam.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="w-full space-y-6 sm:space-y-8 xl:w-1/2 xl:p-5">
            <h2
              ref={benefitsRef}
              className="text-left text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-3xl"
            >
              With Learnio, you&#39;ll{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                gain
              </span>
              :
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  ref={(el) => (benefitItemsRef.current[index] = el)}
                  className={`group cursor-pointer rounded-2xl border border-gray-300 bg-white/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl sm:p-6 ${index >= 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  onMouseEnter={(e) =>
                    handleBenefitHover(e.currentTarget, true)
                  }
                  onMouseLeave={(e) =>
                    handleBenefitHover(e.currentTarget, false)
                  }
                >
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`inline-flex bg-gradient-to-r p-1.5 ${benefit.color} mb-4 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <div className="text-white">{benefit.icon}</div>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-800 sm:text-sm">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                    {benefit.description}
                  </p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/5 to-pink-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                ref={(el) => (statsRef.current[index] = el)}
                className="rounded-2xl border border-gray-300 bg-white/80 p-4 text-center shadow-lg backdrop-blur-sm sm:p-6"
              >
                <div className="mb-3 inline-flex rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 p-3 shadow-lg">
                  <IconComponent className="text-xl text-white sm:text-2xl" />
                </div>
                <div className="mb-1 text-2xl font-black text-gray-800 sm:text-3xl lg:text-4xl">
                  {stat.number}
                </div>
                <div className="text-xs font-medium text-gray-600 sm:text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Image Gallery */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              Experience the{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Difference
              </span>
            </h3>
            <p className="mx-auto max-w-2xl text-left text-base text-gray-600 sm:text-lg">
              Join thousands of learners who have transformed their careers with
              our platform.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:gap-8 xl:justify-evenly">
            {imgContainer.map((item, index) => (
              <div
                key={index}
                ref={(el) => (imagesRef.current[index] = el)}
                className="group relative w-full hover:cursor-wait sm:w-64 lg:w-72 xl:w-80"
                onMouseEnter={(e) => handleImageHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleImageHover(e.currentTarget, false)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-64 lg:h-96"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full transform p-4 text-white transition-transform duration-300 group-hover:translate-y-0 sm:p-6">
                    <h4 className="mb-2 text-lg font-bold sm:text-xl">
                      {item.title}
                    </h4>
                    <p className="text-sm opacity-90 sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute right-4 top-4 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <FaCheckCircle className="text-lg text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-8 text-center text-white sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          <div className="relative z-10">
            <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl xl:text-5xl">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg lg:text-xl">
              Join our community of learners and unlock your potential today!
            </p>
            <Link to="/courses">
              <button className="hover:shadow-3xl rounded-2xl bg-white px-8 py-4 text-base font-bold text-orange-500 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:text-white sm:px-12 sm:py-5 sm:text-lg lg:text-xl">
                <span className="flex items-center justify-center gap-3">
                  <BsRocket className="text-xl" />
                  Get Started Now
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnioOffers;
