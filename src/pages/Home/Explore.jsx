import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUsers, FaGraduationCap, FaCertificate } from "react-icons/fa";
import { HiLightningBolt, HiAcademicCap, HiStar } from "react-icons/hi";
import { BsTrophy } from "react-icons/bs";
import { MdTrendingUp, MdAccessTime, MdVerified } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const INK = "#17233D"; // headline / dark surfaces
const GOLD = "#C89B3C"; // accent, CTA
const HIGHLIGHT = "#F5D77A"; // marker highlight behind emphasized text
const PAPER = "#F4F6FA"; // page background
const LINE = "#D7DCE6"; // hairlines / dividers

const Explore = () => {
  const exploreRef = useRef(null);
  const imageRef = useRef(null);
  const stampRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const kickerRef = useRef(null);
  const featuresRef = useRef([]);
  const pathLineRef = useRef(null);
  const buttonRef = useRef(null);
  const secondaryButtonRef = useRef(null);
  const statsRef = useRef([]);

  // A learning journey, in order: how you study -> who teaches you -> how you
  // engage -> what you walk away with. The numbering carries real meaning here.
  const features = [
    {
      icon: <MdAccessTime className="text-lg" />,
      title: "Flexible Learning",
      description:
        "Study at your own pace, anytime, anywhere with lifetime access to content.",
    },
    {
      icon: <FaGraduationCap className="text-lg" />,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with real-world experience and proven track records.",
    },
    {
      icon: <HiLightningBolt className="text-lg" />,
      title: "Interactive Content",
      description:
        "Engage with quizzes, projects, and a vibrant community of fellow learners.",
    },
    {
      icon: <FaCertificate className="text-lg" />,
      title: "Certification Ready",
      description:
        "Earn industry-recognized certificates upon successful course completion.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Students", icon: FaUsers },
    { number: "1,000+", label: "Premium Courses", icon: HiAcademicCap },
    { number: "95%", label: "Success Rate", icon: BsTrophy },
    { number: "24/7", label: "Support Available", icon: MdVerified },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -70, opacity: 0, scale: 0.94 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        stampRef.current,
        { rotate: 8, opacity: 0, scale: 0.7 },
        {
          rotate: -4,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current[0],
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      contentTl
        .fromTo(
          kickerRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
        )
        .fromTo(
          titleRef.current,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3",
        )
        .fromTo(
          descriptionRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.4",
        );

      // The learning-path line draws itself, then each numbered stop appears
      // in sequence — the one orchestrated "signature" motion for this design.
      gsap.fromTo(
        pathLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: "power2.inOut",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: featuresRef.current[0],
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        featuresRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current[0],
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, exploreRef);

    return () => ctx.revert();
  }, []);

  const attachHover = (el, { y = 0, scale = 1 } = {}) => {
    if (!el) return;
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });
    const scaleTo = gsap.quickTo(el, "scale", {
      duration: 0.3,
      ease: "power3.out",
    });
    el.addEventListener("mouseenter", () => {
      yTo(y);
      scaleTo(scale);
    });
    el.addEventListener("mouseleave", () => {
      yTo(0);
      scaleTo(1);
    });
  };

  return (
    <div
      ref={exploreRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-12 sm:pb-16 lg:pb-20"
      style={{ backgroundColor: PAPER }}
    >
      {/* Graph-paper texture instead of generic blurred color blobs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(circle, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl xl:w-4/5">
        <div
          className="items-center overflow-hidden rounded-2xl border bg-white shadow-[0_25px_60px_-20px_rgba(23,35,61,0.25)] md:grid md:grid-cols-2 md:gap-8 lg:gap-12"
          style={{ borderColor: LINE }}
        >
          {/* Image Section */}
          <div className="relative p-8 pt-10 sm:p-10 sm:pt-12 lg:p-12 lg:pt-14">
            <div
              ref={stampRef}
              className="absolute left-6 top-2 z-10 -rotate-3 border-2 border-dashed bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest shadow-sm sm:left-8"
              style={{ borderColor: `${INK}55`, color: INK }}
            >
              Course · No. 014
            </div>

            <div
              className="absolute right-6 top-2 z-10 flex items-center gap-1 rounded-full border bg-white px-3 py-1 font-mono text-[10px] font-bold shadow-sm sm:right-8"
              style={{ borderColor: LINE, color: INK }}
            >
              <HiStar style={{ color: GOLD }} />
              4.9
              <span className="font-normal text-slate-400">(12,482)</span>
            </div>

            <div className="relative mt-4">
              <img
                ref={imageRef}
                src="https://i.pinimg.com/736x/14/76/0a/14760a486f3c746fc6e1148f6d06db68.jpg"
                alt="Explore Section image"
                className="h-64 w-full rounded-xl border object-cover shadow-lg sm:h-80 lg:h-96"
                style={{ borderColor: LINE }}
              />
            </div>

            {/* Stats as a transcript, not icon chips */}
            <div
              className="my-6 border-y border-dashed"
              style={{ borderColor: LINE }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    ref={(el) => (statsRef.current[index] = el)}
                    className="flex items-center justify-between border-b border-dashed py-2.5 last:border-b-0"
                    style={{ borderColor: LINE }}
                  >
                    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate-500">
                      <IconComponent style={{ color: GOLD }} />
                      {stat.label}
                    </span>
                    <span
                      className="font-mono text-base font-bold"
                      style={{ color: INK }}
                    >
                      {stat.number}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Trust indicators */}
            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
              style={{ borderColor: LINE }}
            >
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MdTrendingUp
                  className="text-lg"
                  style={{ color: "#3E8E63" }}
                />
                Growing Community
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MdVerified className="text-lg" style={{ color: GOLD }} />
                Verified Content
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 md:pr-8 lg:p-12 lg:pr-12">
            <p
              ref={kickerRef}
              className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: GOLD }}
              />
              Online Learning Platform
            </p>

            <h1
              ref={titleRef}
              className="mb-6 font-serif text-2xl font-bold leading-tight sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
              style={{ color: INK }}
            >
              Unlock your potential with our{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">online courses.</span>
                <span
                  className="absolute inset-x-0 bottom-1 -z-0 h-[0.38em] -rotate-1"
                  style={{ backgroundColor: `${HIGHLIGHT}CC` }}
                />
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="mb-8 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Our platform gives you the resources to learn new skills, advance
              your career, and pursue your passions — at your own pace, guided
              by people who&#39;ve done the work.
            </p>

            {/* Feature list as a numbered learning path */}
            <div className="relative mb-9 pl-1">
              <div
                ref={pathLineRef}
                className="absolute bottom-2 left-5 top-2 w-px"
                style={{ backgroundColor: `${INK}33`, transformOrigin: "top" }}
              />
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    ref={(el) => {
                      featuresRef.current[index] = el;
                      attachHover(el, { y: -2 });
                    }}
                    className="group relative flex cursor-pointer items-start gap-4"
                  >
                    <div
                      className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 bg-white font-mono text-sm font-bold shadow-sm"
                      style={{ borderColor: INK, color: INK }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div
                      className="flex-1 rounded-lg border bg-white/70 p-3.5 shadow-sm transition-shadow duration-300 group-hover:shadow-md"
                      style={{ borderColor: LINE }}
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <span style={{ color: GOLD }}>{feature.icon}</span>
                        <h3 className="font-bold" style={{ color: INK }}>
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
