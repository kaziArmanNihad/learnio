import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaGithub, FaPhone, FaClock } from "react-icons/fa";
import { IoIosSend, IoMdMail } from "react-icons/io";
import { HiSparkles, HiChat } from "react-icons/hi";
import { BsStars, BsCheckCircle, BsArrowRight } from "react-icons/bs";
import { MdSupport, MdHeadset } from "react-icons/md";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Refs for animations
  const contactRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contactCardsRef = useRef([]);
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const statsRef = useRef([]);
  const particlesRef = useRef([]);

  // Enhanced contact information
  const contactInfo = [
    {
      icon: <IoMdMail className="text-2xl" />,
      title: "Email Address",
      value: "learnio@gmail.com",
      description: "Send us an email anytime",
      color: "from-blue-500 to-cyan-500",
      link: "mailto:learnio@gmail.com",
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      title: "LinkedIn",
      value: "linkedin.com/in/Learnio",
      description: "Connect with us professionally",
      color: "from-blue-600 to-blue-800",
      link: "https://linkedin.com/in/Learnio",
    },
    {
      icon: <FaGithub className="text-2xl" />,
      title: "GitHub",
      value: "github.com/taniya004488",
      description: "Check out our projects",
      color: "from-gray-700 to-gray-900",
      link: "https://github.com/taniya004488",
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone Support",
      value: "+1 (555) 123-4567",
      description: "Call us during business hours",
      color: "from-green-500 to-green-600",
      link: "tel:+15551234567",
    },
  ];

  // Support statistics
  const stats = [
    { number: "24/7", label: "Support", icon: MdSupport },
    { number: "<1hr", label: "Response Time", icon: MdHeadset },
    { number: "98%", label: "Satisfaction", icon: BsCheckCircle },
    { number: "1000+", label: "Happy Users", icon: HiSparkles },
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
        contactRef.current?.appendChild(particle);
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
        y: 60,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
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
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Contact cards animation
    gsap.fromTo(
      contactCardsRef.current,
      {
        x: -80,
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
          trigger: contactCardsRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Form animation
    gsap.fromTo(
      formRef.current,
      {
        x: 100,
        opacity: 0,
        scale: 0.95,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Input fields animation
    gsap.fromTo(
      inputsRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
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

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animate button
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  // Card hover animations
  const handleCardHover = (element, isEntering) => {
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

  // Input focus animations
  const handleInputFocus = (element, isFocusing) => {
    if (isFocusing) {
      gsap.to(element, {
        scale: 1.02,
        borderColor: "#f97316",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        borderColor: "#d1d5db",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={contactRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 p-4 font-sans sm:p-6 lg:p-12"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Enhanced Header */}
        <div ref={headerRef} className="mb-12 text-center sm:mb-16 lg:mb-20">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 sm:mb-8"
          >
            <BsStars className="text-sm text-orange-500" />
            <span className="text-sm font-bold uppercase tracking-wider text-orange-600">
              Get In Touch
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="mb-6 text-3xl font-bold text-gray-800 sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Let&#39;s{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Connect!
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:mb-12 sm:text-lg lg:text-xl"
          >
            🚀 We&#39;d love to hear from you! Whether you have questions about
            courses, need support, or want to share feedback, our team is here
            to help. Reach out through any channel below or fill out our contact
            form.
          </p>

          {/* Stats Grid */}
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
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

        {/* Enhanced Contact Form Section */}
        <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white/90 shadow-2xl backdrop-blur-sm lg:grid lg:grid-cols-5 lg:gap-0">
          {/* Left side - Contact Info (Enhanced) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 p-6 text-white sm:p-8 lg:col-span-2 xl:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3 sm:mb-8">
                <div className="rounded-xl bg-white/20 p-3">
                  <HiChat className="text-2xl sm:text-3xl" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  Contact Information
                </h2>
              </div>

              <p className="mb-8 text-base leading-relaxed opacity-90 sm:mb-12 sm:text-lg">
                Choose your preferred way to connect with us. We&#39;re
                available through multiple channels to ensure you get the
                support you need.
              </p>

              {/* Enhanced Contact Cards */}
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    ref={(el) => (contactCardsRef.current[index] = el)}
                    className="group flex cursor-pointer items-center rounded-2xl border border-gray-300 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:p-5"
                    onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                    onMouseLeave={(e) =>
                      handleCardHover(e.currentTarget, false)
                    }
                    onClick={() => window.open(info.link, "_blank")}
                  >
                    <div className="flex-shrink-0 rounded-xl bg-white/20 p-3 transition-transform duration-300 group-hover:scale-110">
                      {info.icon}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-semibold opacity-90 sm:text-base">
                        {info.title}
                      </h3>
                      <p className="mt-1 text-sm font-bold sm:text-base">
                        {info.value}
                      </p>
                      <p className="mt-1 text-xs opacity-75 sm:text-sm">
                        {info.description}
                      </p>
                    </div>
                    <BsArrowRight className="text-lg opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-8 rounded-2xl border border-gray-300 bg-white/10 p-4 backdrop-blur-sm sm:mt-12 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <FaClock className="text-xl" />
                  <h3 className="text-lg font-bold">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm opacity-90">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Enhanced Form */}
          <div
            ref={formRef}
            className="bg-white/80 p-6 backdrop-blur-sm sm:p-8 md:p-12 lg:col-span-3"
          >
            <div className="mb-6 sm:mb-8">
              <h3 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl">
                Send us a Message
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we&#39;ll get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name *
                  </label>
                  <input
                    ref={(el) => (inputsRef.current[0] = el)}
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-sm transition-all duration-300 focus:border-orange-500 focus:outline-none sm:text-base"
                    onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                    onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address *
                  </label>
                  <input
                    ref={(el) => (inputsRef.current[1] = el)}
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-sm transition-all duration-300 focus:border-orange-500 focus:outline-none sm:text-base"
                    onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                    onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  ref={(el) => (inputsRef.current[2] = el)}
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-sm transition-all duration-300 focus:border-orange-500 focus:outline-none sm:text-base"
                  onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                  onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Message *
                </label>
                <textarea
                  ref={(el) => (inputsRef.current[3] = el)}
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  required
                  className="w-full resize-none rounded-xl border-2 border-gray-300 px-4 py-3 text-sm transition-all duration-300 focus:border-orange-500 focus:outline-none sm:text-base"
                  onFocus={(e) => handleInputFocus(e.currentTarget, true)}
                  onBlur={(e) => handleInputFocus(e.currentTarget, false)}
                />
              </div>

              <div>
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full transform overflow-hidden rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 sm:px-8 sm:text-base ${
                    isSubmitting
                      ? "cursor-not-allowed bg-gray-400"
                      : submitStatus === "success"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 hover:from-orange-600 hover:to-orange-700"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <BsCheckCircle className="text-xl" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <IoIosSend className="text-xl" />
                        Send Message
                        <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="mt-6 rounded-xl border border-green-300 bg-green-100 p-4 text-center text-green-800">
                <BsCheckCircle className="mr-2 inline-block text-xl" />
                Thank you! We&#39;ll get back to you within 24 hours.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
