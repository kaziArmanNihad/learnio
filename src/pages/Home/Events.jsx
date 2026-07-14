import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUsers, FaGraduationCap, FaClock } from "react-icons/fa";
import { HiSparkles, HiUserGroup } from "react-icons/hi";
import { BsArrowRight, BsStars, BsPeople, BsCalendar3 } from "react-icons/bs";
import { MdEvent, MdGroups } from "react-icons/md";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  // Refs for animations
  const eventsRef = useRef(null);
  const bannerImageRef = useRef(null);
  const bannerTextRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const ctaRef = useRef(null);
  const particlesRef = useRef([]);

  // Enhanced event cards data
  const eventCards = [
    {
      img: "https://i.pinimg.com/736x/4f/10/c5/4f10c581256bb3cab09b290c63d612c5.jpg",
      title: "Free Seminars",
      description:
        "Gain insights and knowledge from industry experts without any cost. Join interactive sessions with Q&A opportunities.",
      icon: <FaGraduationCap className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
      date: "Every Saturday",
      duration: "2 hours",
      attendees: "50+ people",
      features: [
        "Industry Experts",
        "Q&A Sessions",
        "Networking",
        "Certificates",
      ],
    },
    {
      img: "https://i.pinimg.com/736x/c9/34/f6/c934f6587b45bd577703addc053e2e99.jpg",
      title: "Community Get-Togethers",
      description:
        "Build connections with fellow learners and educators in a fun, engaging environment. Share experiences and learn together.",
      icon: <HiUserGroup className="text-2xl" />,
      color: "from-green-500 to-emerald-500",
      date: "Monthly",
      duration: "3 hours",
      attendees: "100+ people",
      features: [
        "Networking",
        "Fun Activities",
        "Group Projects",
        "Mentorship",
      ],
    },
    {
      img: "https://i.pinimg.com/736x/56/91/23/56912343c1839a73d72b66f2a4a55088.jpg",
      title: "Free Workshops",
      description:
        "Experience the Learnio way of learning with complimentary hands-on lessons. Get practical skills you can use immediately.",
      icon: <MdGroups className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      date: "Bi-weekly",
      duration: "4 hours",
      attendees: "30+ people",
      features: [
        "Hands-on Learning",
        "Take-home Projects",
        "Expert Guidance",
        "Free Resources",
      ],
    },
  ];

  // Statistics data
  const stats = [
    { number: "500+", label: "Events Hosted", icon: MdEvent },
    { number: "10K+", label: "Participants", icon: BsPeople },
    { number: "95%", label: "Satisfaction Rate", icon: HiSparkles },
    { number: "50+", label: "Expert Speakers", icon: FaUsers },
  ];

  // Create subtle particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        eventsRef.current?.appendChild(particle);
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
    // Banner image animation
    gsap.fromTo(
      bannerImageRef.current,
      {
        x: 150,
        opacity: 0,
        rotationY: 30,
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
          trigger: bannerImageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Banner text animation
    gsap.fromTo(
      bannerTextRef.current,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bannerTextRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Title animation
    gsap.fromTo(
      titleRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Description animation
    gsap.fromTo(
      descriptionRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Event cards stagger animation
    gsap.fromTo(
      cardsRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 45,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
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

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  // Card hover animations
  const handleCardHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -15,
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

  // Image hover effect
  const handleImageHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        rotationY: 8,
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

  return (
    <div
      ref={eventsRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto h-full w-full max-w-7xl py-12 sm:py-16 lg:w-11/12 lg:py-20 xl:w-4/5">
        {/* Enhanced Banner Section */}
        <div className="mb-16 flex flex-col items-center justify-center gap-8 sm:mb-20 sm:gap-12 lg:mb-24 lg:flex-row lg:justify-between lg:gap-16">
          {/* Text Content */}
          <div
            ref={bannerTextRef}
            className="h-full w-11/12 space-y-6 sm:space-y-8 lg:w-1/2"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2">
              <BsStars className="text-sm text-orange-500" />
              <span className="text-sm font-bold text-orange-600">
                COMMUNITY EVENTS
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Learnio Events
              </span>{" "}
              – Learn, Connect, and Grow!
            </h1>

            <p
              ref={descriptionRef}
              className="text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl"
            >
              🚀 At Learnio, we believe that education is more than just
              courses. It&#39;s about building a vibrant learning community.
              That&#39;s why we organize exclusive{" "}
              <strong>Learnio Events</strong> to bring students and teachers
              together for meaningful interactions and experiences. Whether
              you&#39;re looking to explore new skills, network with like-minded
              individuals, or get a taste of what Learnio has to offer, our
              events are designed to inspire and empower.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4 lg:grid-cols-2">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    ref={(el) => (statsRef.current[index] = el)}
                    className="rounded-xl border border-gray-300 bg-white/80 p-3 text-center shadow-lg backdrop-blur-sm sm:p-4"
                  >
                    <div className="mb-2 inline-flex rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 p-2 shadow-md">
                      <IconComponent className="text-sm text-white sm:text-base" />
                    </div>
                    <div className="text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
                      {stat.number}
                    </div>
                    <div className="text-xs font-medium text-gray-600 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Image */}
          <div className="relative h-full w-11/12 lg:w-1/2">
            <div className="relative">
              <img
                ref={bannerImageRef}
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fit.unm.edu%2Fassets%2Fimg%2Fstudents-image.jpg&f=1&nofb=1&ipt=af3adddbb6e8724356270c135404070190c008cf5a626f008749c5125d5fe06c&ipo=images"
                alt="Event page"
                className="h-64 w-full rounded-3xl rounded-bl-[100px] border border-gray-300 object-cover shadow-2xl sm:h-80 sm:rounded-bl-[150px] lg:h-96 lg:rounded-bl-[200px] xl:h-[500px]"
                onMouseEnter={(e) => handleImageHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleImageHover(e.currentTarget, false)}
              />

              {/* Overlay Badge */}
              <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-sm font-bold text-gray-800">
                    Live Events
                  </span>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 rounded-3xl rounded-bl-[200px] bg-gradient-to-tr from-orange-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* Enhanced Event Cards */}
        <div className="grid grid-cols-1 gap-6 px-4 sm:gap-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-0">
          {eventCards.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-300 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl sm:p-8"
              onMouseEnter={(e) =>
                handleCardHover(e.currentTarget, true, index)
              }
              onMouseLeave={(e) =>
                handleCardHover(e.currentTarget, false, index)
              }
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
              />

              {/* Image */}
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-56"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon Overlay */}
                <div
                  className={`absolute right-4 top-4 bg-gradient-to-r p-3 ${item.color} transform rounded-xl opacity-0 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-100`}
                >
                  <div className="text-white">{item.icon}</div>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h4 className="mb-3 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-500 sm:text-2xl">
                  {item.title}
                </h4>

                <p className="mb-6 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 sm:text-base">
                  {item.description}
                </p>

                {/* Event Details */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <BsCalendar3 className={`text-orange-500`} />
                    <span>
                      <strong>Schedule:</strong> {item.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FaClock className={`text-orange-500`} />
                    <span>
                      <strong>Duration:</strong> {item.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FaUsers className={`text-orange-500`} />
                    <span>
                      <strong>Attendees:</strong> {item.attendees}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h5 className="mb-3 text-sm font-semibold text-gray-800">
                    What You&#39;ll Get:
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {item.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-xs text-gray-600"
                      >
                        <div
                          className={`h-1.5 w-1.5 bg-gradient-to-r ${item.color} rounded-full`}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join Button */}
                <button
                  className={`w-full bg-gradient-to-r px-6 py-3 ${item.color} rounded-xl font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl group-hover:scale-105`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Join Event
                    <BsArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>

              {/* Bottom Accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} scale-x-0 transform transition-transform duration-500 group-hover:scale-x-100`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
