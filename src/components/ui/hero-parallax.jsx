import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiSparkles, HiNewspaper } from "react-icons/hi";
import { BsStars, BsArrowRight, BsEye } from "react-icons/bs";
import { FaCalendar, FaUser } from "react-icons/fa";
import { Link } from "react-router";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-100, 100]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="via-50/30 relative flex h-full w-full flex-col self-auto overflow-hidden bg-gradient-to-br from-white to-orange-50/20 pb-16 antialiased [perspective:1000px] [transform-style:preserve-3d] sm:pb-20 lg:pb-28"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div
          className="absolute bottom-1/4 right-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="h-full w-full"
      >
        <motion.div className="mb-12 flex flex-row-reverse space-x-8 space-x-reverse sm:mb-16 sm:space-x-12 lg:mb-20 lg:space-x-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="mb-8 flex flex-row space-x-8 sm:mb-10 sm:space-x-12 lg:mb-10 lg:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-8 space-x-reverse sm:space-x-12 lg:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const ctaRef = useRef(null);

  // Statistics data
  const stats = [
    { number: "500+", label: "Articles", icon: HiNewspaper },
    { number: "1M+", label: "Readers", icon: BsEye },
    { number: "Weekly", label: "Updates", icon: FaCalendar },
    { number: "Expert", label: "Authors", icon: FaUser },
  ];

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
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
        delay: 0.3,
      },
    );

    // Title animation with character reveal
    gsap.fromTo(
      titleRef.current,
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
        ease: "power3.out",
        delay: 0.6,
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
        delay: 0.9,
      },
    );

    // Stats animation
    gsap.fromTo(
      statsRef.current,
      {
        y: 40,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1.2,
      },
    );

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        delay: 1.5,
      },
    );
  }, []);

  const handleButtonHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        y: -2,
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

  return (
    <div
      ref={headerRef}
      className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Enhanced Header Content */}
      <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 sm:mb-8"
        >
          <BsStars className="text-sm text-orange-500" />
          <span className="text-sm font-bold uppercase tracking-wider text-orange-600">
            Latest Insights
          </span>
        </div>

        {/* Enhanced Title */}
        <h1
          ref={titleRef}
          className="mb-6 text-2xl font-bold leading-tight sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
        >
          Insights and Updates <br />
          Stay Informed with{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Learnio.
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 opacity-50 blur-lg" />
          </span>
        </h1>

        {/* Enhanced Description */}
        <p
          ref={descriptionRef}
          className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:mb-12 sm:text-lg lg:mx-0 lg:text-xl"
        >
          🚀 Discover the latest trends, stories, and breakthroughs in education
          and beyond. Explore our curated articles and news, paired with
          engaging visuals, to inspire your learning journey and keep you up to
          date with industry innovations.
        </p>

        {/* Statistics Grid */}
        <div className="mx-auto mb-8 grid max-w-2xl grid-cols-2 gap-4 sm:mb-12 sm:grid-cols-4 sm:gap-6 lg:mx-0">
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

        {/* Call to Action */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
          <Link to="https://medium.com/search?q=react.js" target="_blank">
            <button
              ref={ctaRef}
              className="group w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-orange-500/50 sm:w-auto sm:text-lg"
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                <HiSparkles className="text-xl" />
                Explore All Articles
                <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Card entrance animation
    gsap.fromTo(
      cardRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const handleCardHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element.querySelector(".card-overlay"), {
        opacity: 0.9,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(element.querySelector(".card-title"), {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(element.querySelector(".card-image"), {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(element.querySelector(".card-overlay"), {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(element.querySelector(".card-title"), {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(element.querySelector(".card-image"), {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product border-300 relative h-48 w-72 flex-shrink-0 overflow-hidden rounded-3xl border shadow-2xl sm:h-56 sm:w-80 lg:h-60 lg:w-96"
      onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
      onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full group-hover/product:shadow-2xl"
      >
        <img
          src={product.thumbnail}
          className="card-image absolute inset-0 h-full w-full cursor-pointer object-cover object-center transition-transform duration-500"
          alt={product.title}
        />
      </a>

      {/* Enhanced Overlay */}
      <div className="card-overlay pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300" />

      {/* Enhanced Content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
        {/* Category Badge */}
        <div className="mb-2 opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            <HiNewspaper className="text-xs" />
            {product.category || "Article"}
          </span>
        </div>

        {/* Title */}
        <h2 className="card-title translate-y-5 transform text-lg font-bold leading-tight text-white opacity-0 transition-all duration-300 sm:text-xl">
          {product.title}
        </h2>

        {/* Meta Info */}
        <div className="mt-2 flex items-center gap-4 opacity-0 transition-opacity delay-100 duration-300 group-hover/product:opacity-100">
          {product.date && (
            <span className="flex items-center gap-1 text-xs text-white/80">
              <FaCalendar className="text-xs" />
              {product.date}
            </span>
          )}
          {product.readTime && (
            <span className="flex items-center gap-1 text-xs text-white/80">
              <BsEye className="text-xs" />
              {product.readTime}
            </span>
          )}
        </div>
      </div>

      {/* Gradient Border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/50 to-purple-500/50 p-0.5">
          <div className="h-full w-full rounded-3xl bg-transparent" />
        </div>
      </div>
    </motion.div>
  );
};
