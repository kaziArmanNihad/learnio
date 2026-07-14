import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaMobileAlt, FaPaintBrush, FaAward } from "react-icons/fa";
import { BsArrowRight, BsStars } from "react-icons/bs";
import { MdSpeed, MdSecurity, MdSupport } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Service = () => {
  const serviceRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresRef = useRef([]);
  const ctaRef = useRef(null);

  const services = [
    {
      icon: <FaCode className="text-3xl" />,
      title: "Web Development",
      description:
        "We build fast, scalable, and secure websites using modern frameworks like React, Next.js, and Node.js to ensure the best performance and user experience.",
      features: [
        "React & Next.js",
        "Node.js Backend",
        "Database Design",
        "API Integration",
      ],
      color: "from-blue-500 to-cyan-500",
      bgPattern: "🌐",
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "App Development",
      description:
        "From iOS to Android, we create high-performing mobile apps that bring your ideas to life with intuitive design and seamless functionality.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-Platform",
        "App Store Optimization",
      ],
      color: "from-green-500 to-emerald-500",
      bgPattern: "📱",
    },
    {
      icon: <FaPaintBrush className="text-3xl" />,
      title: "Web Design",
      description:
        "Our design team crafts visually stunning and user-friendly interfaces, focusing on responsive design and accessibility for all devices.",
      features: [
        "UI/UX Design",
        "Responsive Design",
        "Brand Identity",
        "User Research",
      ],
      color: "from-purple-500 to-pink-500",
      bgPattern: "🎨",
    },
  ];

  const additionalFeatures = [
    {
      icon: <MdSpeed className="text-xl" />,
      title: "Lightning Fast",
      description: "Optimized performance for speed",
    },
    {
      icon: <MdSecurity className="text-xl" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security standards",
    },
    {
      icon: <MdSupport className="text-xl" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance",
    },
    {
      icon: <FaAward className="text-xl" />,
      title: "Award Winning",
      description: "Industry-recognized excellence",
    },
  ];

  // Particles: smooth continuous drift instead of a hard reset/jump on repeat
  useEffect(() => {
    const ctx = gsap.context(() => {
      const particles = [];

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-orange-400 rounded-full opacity-0 pointer-events-none";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.willChange = "transform, opacity";
        serviceRef.current?.appendChild(particle);
        particles.push(particle);

        // Fade in -> gentle continuous float -> fade out -> reposition -> repeat
        // Using a timeline avoids the abrupt "jump back to start" look
        const tl = gsap.timeline({
          repeat: -1,
          delay: Math.random() * 3,
          defaults: { ease: "sine.inOut" },
        });

        tl.to(particle, { opacity: 0.25, duration: 1.2 })
          .to(
            particle,
            {
              y: -120,
              x: `+=${(Math.random() - 0.5) * 40}`,
              duration: Math.random() * 3 + 4,
              ease: "sine.inOut",
            },
            "<",
          )
          .to(particle, { opacity: 0, duration: 1 }, "-=1")
          .set(particle, {
            y: 0,
            x: 0,
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          });
      }

      return () => particles.forEach((p) => p.remove());
    }, serviceRef);

    return () => ctx.revert();
  }, []);

  // Main scroll animations, coordinated as timelines so nothing fires out of sync
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header sequence: badge -> title -> subtitle, slightly overlapped for fluidity
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      headerTl
        .fromTo(
          badgeRef.current,
          { scale: 0.6, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.35",
        )
        .fromTo(
          subtitleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.45",
        );

      // Service cards - subtle, springy but controlled (no heavy 3D rotation, which
      // tends to look choppy without a matching CSS perspective set on the parent)
      gsap.set(cardsRef.current, { transformPerspective: 800, force3D: true });

      gsap.fromTo(
        cardsRef.current,
        { y: 70, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Feature tiles
      gsap.fromTo(
        featuresRef.current,
        { y: 35, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current[0],
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, serviceRef);

    return () => ctx.revert();
  }, []);

  // Smooth, interruption-safe hover using quickTo (reuses a single tween per
  // property instead of spawning a new gsap.to() on every mouse event)
  const attachCardHover = (el) => {
    if (!el) return;
    const y = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    const scale = gsap.quickTo(el, "scale", {
      duration: 0.4,
      ease: "power3.out",
    });
    const rotationY = gsap.quickTo(el, "rotationY", {
      duration: 0.5,
      ease: "power3.out",
    });

    el.addEventListener("mouseenter", () => {
      y(-12);
      scale(1.02);
      rotationY(4);
    });
    el.addEventListener("mouseleave", () => {
      y(0);
      scale(1);
      rotationY(0);
    });
  };

  const attachButtonHover = (el) => {
    if (!el) return;
    const y = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" });
    const scale = gsap.quickTo(el, "scale", {
      duration: 0.3,
      ease: "power2.out",
    });

    el.addEventListener("mouseenter", () => {
      y(-2);
      scale(1.04);
    });
    el.addEventListener("mouseleave", () => {
      y(0);
      scale(1);
    });
  };

  return (
    <section
      ref={serviceRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 py-12 sm:py-16 lg:py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl xl:w-4/5">
        {/* Section Header */}
        <div className="text-center sm:mb-16 lg:mb-20">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 sm:mb-6"
          >
            <BsStars className="text-sm text-orange-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500">
              Our Services
            </h3>
          </div>

          <h2
            ref={titleRef}
            className="text-3xl font-extrabold text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            What We{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>

          <p
            ref={subtitleRef}
            className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl"
          >
            🚀 Comprehensive digital solutions tailored to bring your vision to
            life with cutting-edge technology and innovative design.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:mb-16 sm:gap-8 md:grid-cols-2 lg:mb-20 lg:grid-cols-3 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
                attachCardHover(el);
              }}
              className="group relative flex cursor-pointer flex-col items-start overflow-hidden rounded-3xl border border-gray-300 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-colors duration-300 will-change-transform hover:shadow-2xl sm:p-8"
            >
              <div className="absolute right-4 top-4 text-6xl opacity-5 transition-opacity duration-300 group-hover:opacity-10">
                {service.bgPattern}
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
              />

              <div
                className={`relative inline-flex bg-gradient-to-r p-4 ${service.color} mb-6 rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <div className="text-white">{service.icon}</div>
              </div>

              <h3 className="relative mb-4 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-500 sm:text-2xl">
                {service.title}
              </h3>

              <p className="relative mb-6 leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                {service.description}
              </p>

              <div className="relative mb-6">
                <h4 className="mb-3 text-sm font-semibold text-gray-800">
                  Key Features:
                </h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div
                        className={`h-1.5 w-1.5 bg-gradient-to-r ${service.color} rounded-full`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                ref={attachButtonHover}
                className={`relative mt-auto w-full rounded-xl bg-gradient-to-r ${service.color} px-6 py-3 font-semibold text-white shadow-lg transition-shadow duration-300 will-change-transform hover:shadow-xl`}
              >
                <span className="flex items-center justify-center gap-2">
                  Learn More
                  <BsArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} scale-x-0 transform transition-transform duration-500 ease-out group-hover:scale-x-100`}
              />
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:mb-16 sm:gap-6 lg:mb-20 lg:grid-cols-4 lg:gap-8">
          {additionalFeatures.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => (featuresRef.current[index] = el)}
              className="rounded-2xl border border-gray-300 bg-white/80 p-4 text-center shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl sm:p-6"
            >
              <div className="mb-3 inline-flex rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 p-3 shadow-lg">
                <div className="text-white">{feature.icon}</div>
              </div>
              <h4 className="mb-2 text-sm font-bold text-gray-800 sm:text-base">
                {feature.title}
              </h4>
              <p className="text-xs text-gray-600 sm:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
