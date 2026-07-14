import toast from "react-hot-toast";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGripfire,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BsRocket } from "react-icons/bs";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  // Refs for animations
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef([]);
  const socialRef = useRef([]);
  const particlesRef = useRef([]);
  const waveRef = useRef(null);

  // Enhanced toast handler
  const handleClick = () => {
    toast.error("This is not a real link!", {
      style: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
      },
      icon: "⚡",
      duration: 3000,
    });
  };

  // Footer data structure
  const footerSections = [
    {
      title: "Services",
      icon: <BsRocket className="text-lg" />,
      items: [
        { name: "Web Development", icon: "🌐" },
        { name: "App Development", icon: "📱" },
        { name: "Game Development", icon: "🎮" },
      ],
    },
    {
      title: "Company",
      icon: <HiSparkles className="text-lg" />,
      items: [
        { name: "About us", icon: "ℹ️" },
        { name: "Contact", icon: "📞" },
        { name: "Teach on Learnio", icon: "👨‍🏫" },
        { name: "Careers", icon: "💼" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, color: "from-blue-600 to-blue-800", name: "Facebook" },
    {
      icon: FaInstagram,
      color: "from-pink-500 to-purple-600",
      name: "Instagram",
    },
    { icon: FaTwitter, color: "from-blue-400 to-blue-600", name: "Twitter" },
    { icon: FaLinkedin, color: "from-blue-700 to-blue-900", name: "LinkedIn" },
  ];

  // Particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-0";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        footerRef.current?.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          scale: Math.random() * 3 + 1,
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2,
        });
      }
    };

    createParticles();

    return () => {
      particlesRef.current.forEach((particle) => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  // Hover animations for social icons
  const handleSocialHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.3,
        y: -8,
        rotation: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Link hover animations
  const handleLinkHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        x: 10,
        color: "#f97316",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        x: 0,
        color: "#374151",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative mt-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl" />
        <div
          className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-purple-400/5 to-blue-400/5 blur-3xl"
          style={{ animationDelay: "2s" }}
        />

        {/* Animated wave */}
        <div className="absolute left-0 top-0 h-1 w-full overflow-hidden">
          <div
            ref={waveRef}
            className="h-full w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"
            style={{ width: "200%", transform: "translateX(-100%)" }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 border-t-2 border-gray-300">
        {/* Top Section */}
        <div className="mx-auto max-w-6xl gap-5 px-6 py-16 lg:flex lg:justify-between lg:px-12">
          {/* Enhanced Brand Section */}
          <div ref={brandRef} className="mb-12 max-w-md lg:mb-0">
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-75 blur" />
                <div className="relative rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-3 shadow-xl">
                  <FaGripfire className="text-2xl text-white" />
                </div>
              </div>
              <h2 className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-3xl font-black text-transparent">
                Learnio
              </h2>
            </div>
            <p className="mb-6 leading-7 text-gray-600">
              🚀 Unlock your potential with expert-led courses. Learn new
              skills, boost your career, and pursue your passions — all in one
              place.
            </p>

            {/* Newsletter signup */}
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-gray-400 bg-white/80 px-4 py-3 backdrop-blur transition-all duration-300 focus:border-orange-500 focus:outline-none"
              />
              <button
                onClick={handleClick}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-orange-500/25"
              >
                <HiLightningBolt className="text-lg" />
              </button>
            </div>
          </div>

          {/* Enhanced Links Grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-16">
            {footerSections.map((section, sectionIndex) => (
              <div
                key={section.title}
                ref={(el) => (linksRef.current[sectionIndex] = el)}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-r from-orange-400/20 to-pink-400/20 p-2">
                    {section.icon}
                  </div>
                  <h6 className="text-xl font-bold text-gray-800">
                    {section.title}
                  </h6>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item.name}
                      onClick={handleClick}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all duration-300 hover:bg-white/50 hover:backdrop-blur"
                      onMouseEnter={(e) =>
                        handleLinkHover(e.currentTarget, true)
                      }
                      onMouseLeave={(e) =>
                        handleLinkHover(e.currentTarget, false)
                      }
                    >
                      <span className="text-lg transition-transform duration-300 group-hover:scale-125">
                        {item.icon}
                      </span>
                      <span className="text-gray-600 transition-colors duration-300 group-hover:text-orange-500">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Social Section */}
        <div className="border-t border-gray-300 bg-white/30 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-8 lg:px-12">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="text-center lg:text-left">
                <p className="font-medium text-gray-600">
                  © {new Date().getFullYear()} Learnio. All rights reserved.
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Made with ❤️ for learners worldwide
                </p>
              </div>

              {/* Enhanced Social Icons */}
              <div className="flex items-center gap-4">
                <span className="mr-2 text-sm font-medium text-gray-600">
                  Follow us:
                </span>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <div
                      key={social.name}
                      ref={(el) => (socialRef.current[index] = el)}
                      onClick={handleClick}
                      className={`group relative bg-gradient-to-r p-3 ${social.color} cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl`}
                      onMouseEnter={(e) =>
                        handleSocialHover(e.currentTarget, true)
                      }
                      onMouseLeave={(e) =>
                        handleSocialHover(e.currentTarget, false)
                      }
                      title={social.name}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <IconComponent className="relative z-10 text-lg text-white" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
