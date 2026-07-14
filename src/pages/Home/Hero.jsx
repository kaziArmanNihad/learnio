import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { FaUsers, FaGraduationCap, FaTrophy } from "react-icons/fa";
import { BsArrowRight, BsPlayCircle, BsStars } from "react-icons/bs";
import { TfiCup } from "react-icons/tfi";

const Hero = () => {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const floatingCardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const floatingCard = floatingCardRef.current;
    tl.fromTo(
      badgeRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
    );

    tl.fromTo(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.2",
    );

    tl.fromTo(
      descriptionRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.5",
    );

    tl.fromTo(
      buttonsRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      "-=0.4",
    );

    tl.fromTo(
      statsRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      "-=0.3",
    );

    tl.fromTo(
      imageRef.current,
      {
        x: 60,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=1",
    );

    if (floatingCard) {
      gsap.to(floatingCard, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      tl.kill();

      if (floatingCard) {
        gsap.killTweensOf(floatingCard);
      }
    };
  }, []);

  const stats = [
    {
      icon: FaUsers,
      value: "50K+",
      label: "Students",
    },
    {
      icon: FaGraduationCap,
      value: "1000+",
      label: "Courses",
    },
    {
      icon: FaTrophy,
      value: "95%",
      label: "Success Rate",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-100 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-100 opacity-40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-2">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-4">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2"
            >
              <BsStars className="text-orange-500" />
              <span className="text-sm font-semibold text-orange-600">
                Trusted by 50,000+ learners worldwide
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-4xl"
            >
              Unlock Your
              <span className="block text-orange-500">Potential</span>
              One Skill at a Time
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="max-w-xl text-lg leading-relaxed text-gray-600"
            >
              Learn from industry experts, build real-world skills, and
              accelerate your career with flexible online courses designed for
              modern learners.
            </p>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-col gap-4 sm:flex-row">
              <Link to="/courses">
                <button className="group flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:translate-y-[-2px] hover:bg-orange-600">
                  Start Learning
                  <BsArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <Link to="/courses">
                <button className="group flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-800 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50">
                  <BsPlayCircle />
                  Browse Courses
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="mx-auto grid max-w-md grid-cols-3 gap-4 sm:gap-6 lg:mx-0 lg:gap-8"
            >
              {" "}
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-gray-300 bg-white p-3 text-center shadow-sm sm:p-4"
                  >
                    {" "}
                    <div className="mb-2 inline-flex rounded-lg bg-orange-100 p-2">
                      {" "}
                      <IconComponent className="text-lg text-orange-500 sm:text-base" />{" "}
                    </div>{" "}
                    <div className="mb-1 text-xl font-bold text-gray-800 sm:text-2xl lg:text-2xl xl:text-2xl">
                      {" "}
                      {stat.value}{" "}
                    </div>{" "}
                    <div className="text-xs text-gray-600 sm:text-sm">
                      {" "}
                      {stat.label}{" "}
                    </div>{" "}
                  </div>
                );
              })}{" "}
            </div>
          </div>

          {/* Right Content */}
          <div ref={imageRef} className="relative flex justify-center">
            {/* Main Image */}
            <div className="relative w-full max-w-lg">
              <img
                src="/HeroImageOne.jpg"
                alt="Students learning online"
                className="w-full rounded-3xl shadow-2xl"
              />

              {/* Floating Card */}
              <div
                ref={floatingCardRef}
                className="absolute -bottom-16 -left-8 rounded-xl border border-white/50 bg-white/90 p-3 shadow-lg backdrop-blur-md sm:-bottom-6 sm:-left-6 sm:rounded-2xl sm:p-5 sm:shadow-xl"
              >
                <div className="flex items-center justify-center gap-2 text-lg font-bold text-gray-900 sm:gap-3 sm:text-2xl">
                  95%
                  <TfiCup className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  Course Completion Rate
                </div>
              </div>

              {/* Top Badge */}
              <div className="absolute -right-3 -top-8 rounded-xl border border-white/50 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md sm:-right-5 sm:top-6 sm:rounded-2xl sm:px-5 sm:py-4 sm:shadow-xl">
                <div className="text-xs font-semibold text-gray-800 sm:text-sm">
                  ⭐ Top Rated Platform
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute left-5 top-5 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 sm:left-10 sm:top-10 sm:rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
