import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUsers } from "react-icons/fa";
import CoursePieChart from "../../../../components/CoursePieChart";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { useGetUsersQuery } from "../../../../Redux/features/api/usersApi";
import { useGetCoursesQuery } from "../../../../Redux/features/api/coursesApi";
import Loading from "../../../../components/Loading/Loading";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const AdminAnalytics = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const statCardRefs = useRef([]);
  const pieChartSectionRef = useRef(null);

  // Reset every render so the array never carries a stale/null entry into
  // GSAP (avoids the "reading '_gsap' of null" crash).
  statCardRefs.current = [];

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorObj,
  } = useGetUsersQuery();
  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
    error: coursesErrorObj,
  } = useGetCoursesQuery();

  const isLoading = usersLoading || coursesLoading;
  const isError = usersError || coursesError;

  // Real counts instead of hardcoded numbers — the header claims "real-time
  // analytics," so the numbers should actually be that.
  const counts = useMemo(() => {
    const studentCount =
      users?.filter((u) => u.userRole === "student").length ?? 0;
    const teacherCount =
      users?.filter((u) => u.userRole === "teacher").length ?? 0;
    const activeCourseCount =
      courses?.filter((c) => c.courseStatus === "active").length ?? 0;
    return { studentCount, teacherCount, activeCourseCount };
  }, [users, courses]);

  const animateCounter = (element, target, duration = 2) => {
    gsap.fromTo(
      element,
      { innerText: 0 },
      {
        innerText: target,
        duration,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function () {
          element.innerText = Math.ceil(element.innerText).toLocaleString();
        },
      },
    );
  };

  const stats = [
    {
      title: "Active Students",
      counterClass: "counter-students",
      value: counts.studentCount,
      Icon: FaUsers,
      accent: "from-blue-500 to-cyan-500",
    },
    {
      title: "Instructors",
      counterClass: "counter-teachers",
      value: counts.teacherCount,
      Icon: LiaChalkboardTeacherSolid,
      accent: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Courses",
      counterClass: "counter-courses",
      value: counts.activeCourseCount,
      Icon: SiGoogleclassroom,
      accent: "from-purple-500 to-pink-500",
    },
  ];

  useEffect(() => {
    if (isLoading || isError) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards = statCardRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(
        [
          containerRef.current,
          titleRef.current,
          pieChartSectionRef.current,
          ...cards,
        ],
        { opacity: 1, y: 0, scale: 1 },
      );
      stats.forEach((stat) => {
        const el = document.querySelector(`.${stat.counterClass}`);
        if (el) el.innerText = stat.value.toLocaleString();
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, pieChartSectionRef.current], {
        opacity: 0,
        y: 50,
      });
      gsap.set(cards, { opacity: 0, y: 30, scale: 0.95 });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
        .to(
          titleRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.2",
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        )
        .to(
          pieChartSectionRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        );

      tl.call(
        () => {
          stats.forEach((stat) => {
            const el = document.querySelector(`.${stat.counterClass}`);
            if (el) animateCounter(el, stat.value);
          });
        },
        [],
        ">-0.5",
      );

      // Hover: GSAP only handles the lift (quickTo, interruption-safe).
      // The shadow itself is a plain CSS transition (see card className) so
      // GSAP and CSS never animate the same property at once.
      cards.forEach((card) => {
        const yTo = gsap.quickTo(card, "y", {
          duration: 0.3,
          ease: "power2.out",
        });
        card.addEventListener("mouseenter", () => yTo(-8));
        card.addEventListener("mouseleave", () => yTo(0));
      });

      gsap.utils.toArray(".stat-icon").forEach((icon, index) => {
        gsap.to(icon, {
          y: -5,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.4,
        });
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, counts]);

  if (isLoading) return <Loading />;

  if (isError) {
    console.error(
      "Error fetching analytics data:",
      usersErrorObj || coursesErrorObj,
    );
    toast.error("Failed to load analytics data.");
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 p-4">
        <div className="rounded-2xl border border-gray-300 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-2 text-xl font-bold text-red-600">
            Couldn&#39;t load analytics
          </h2>
          <p className="text-gray-600">Please refresh the page to try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden p-4 text-gray-800 opacity-0 sm:p-6 lg:p-2"
    >
      {/* Background — same static blur treatment used across the dashboard */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/10 to-transparent blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-purple-400/10 to-transparent blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto my-10 flex max-w-7xl flex-col gap-12">
        {/* Header */}
        <div ref={titleRef} className="text-center">
          <h1 className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            Admin Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Real-time platform analytics and enrollment statistics.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              ref={(el) => {
                if (el) statCardRefs.current[index] = el;
              }}
              className="flex transform-gpu cursor-pointer items-center gap-6 rounded-2xl border border-gray-300 bg-white/90 p-6 shadow-md backdrop-blur-sm transition-shadow duration-300 will-change-transform hover:shadow-xl"
            >
              <div
                className={`rounded-full bg-gradient-to-r p-4 ${stat.accent} shadow-md`}
              >
                <stat.Icon className="stat-icon h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p
                  className={`text-4xl font-bold tracking-tighter text-gray-800 ${stat.counterClass}`}
                >
                  0
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div
          ref={pieChartSectionRef}
          className="rounded-2xl border border-gray-300 bg-white/90 p-6 shadow-lg backdrop-blur-sm md:p-8"
        >
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Course Distribution
          </h2>
          <div className="flex h-80 w-full items-center justify-center md:h-96">
            <CoursePieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
