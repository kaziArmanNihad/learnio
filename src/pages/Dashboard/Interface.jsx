import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import Loading from "../../components/Loading/Loading";
import { useMemo, useEffect, useRef } from "react";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { BsStars } from "react-icons/bs";
import {
  MdAdminPanelSettings,
  MdVerified,
  MdTrendingUp,
  MdLock,
  MdPayment,
} from "react-icons/md";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsersCog,
  FaBookOpen,
  FaUserCircle,
  FaBookReader,
} from "react-icons/fa";

const ROLE_META = {
  admin: { label: "Admin Dashboard", icon: <MdAdminPanelSettings /> },
  teacher: { label: "Teacher Dashboard", icon: <FaChalkboardTeacher /> },
  student: { label: "Student Dashboard", icon: <FaUserGraduate /> },
};

const Interface = () => {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const listItemsRef = useRef([]);

  const { userName, userEmail } = useSelector((state) => state.userSlice);
  const { data, isLoading, isError, error } = useGetUsersQuery();

  const user = useMemo(
    () => data?.find((u) => u.userEmail === userEmail) || {},
    [data, userEmail],
  );

  const roleMeta = ROLE_META[user.userRole] || ROLE_META.student;

  listItemsRef.current = [];

  useEffect(() => {
    if (!user.userRole || !titleRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const listItems = listItemsRef.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          descriptionRef.current,
          ...listItems,
        ],
        { opacity: 1, y: 0 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      )
        .fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          listItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3",
        );

      // Hover motion via quickTo; shadow/border stay on CSS transitions so
      // GSAP and CSS never fight over the same property.
      listItems.forEach((item) => {
        const yTo = gsap.quickTo(item, "y", {
          duration: 0.3,
          ease: "power2.out",
        });
        item.addEventListener("mouseenter", () => yTo(-2));
        item.addEventListener("mouseleave", () => yTo(0));
      });
    }, titleRef);

    return () => ctx.revert();
  }, [user.userRole]);

  const getRoleContent = () => {
    switch (user.userRole) {
      case "admin":
        return {
          title: {
            before: "Your ",
            highlight: "Admin Dashboard",
            after:
              " is your central command center for overseeing and optimizing the platform's operations.",
          },
          items: [
            {
              icon: <FaUsersCog />,
              title: "Monitor User Activity:",
              description:
                "Access a comprehensive overview of all registered users, including teachers, students, and other administrators.",
            },
            {
              icon: <MdVerified />,
              title: "Approve Courses for Publication:",
              description:
                "Review and approve courses submitted by teachers to ensure quality and relevance before they go live.",
            },
            {
              icon: <MdTrendingUp />,
              title: "Track Metrics and Insights:",
              description:
                "View key performance metrics, such as course engagement and user growth, to make informed decisions.",
            },
          ],
        };
      case "teacher":
        return {
          title: {
            before: "As a teacher, your ",
            highlight: "Dashboard",
            after: " is your dedicated hub for managing your teaching journey.",
          },
          items: [
            {
              icon: <FaBookOpen />,
              title: "Manage Your Courses:",
              description:
                "Create and add new courses to share your expertise. Edit and update course content effortlessly to ensure it's always relevant and engaging.",
            },
            {
              icon: <FaUserGraduate />,
              title: "Monitor Enrollments:",
              description:
                "Stay informed by tracking how many students have enrolled in each of your courses, providing insights into their popularity and impact.",
            },
            {
              icon: <MdLock />,
              title: "Activate Course Access:",
              description:
                "Manage student access by activating courses for students who have successfully completed their payments, ensuring a seamless learning experience.",
            },
          ],
        };
      default:
        return {
          title: {
            before: "As a student, your ",
            highlight: "Dashboard",
            after: " is your personal hub for managing your learning journey.",
          },
          items: [
            {
              icon: <FaUserCircle />,
              title: "Manage Your Profile:",
              description:
                "View and update your profile information to keep it accurate and up-to-date.",
            },
            {
              icon: <FaBookReader />,
              title: "Access Your Courses:",
              description:
                "Explore all your enrolled courses. Seamlessly enroll in new courses and complete payments for enrollment directly through the dashboard.",
            },
            {
              icon: <MdPayment />,
              title: "Track Your Payment History:",
              description:
                "Stay informed by reviewing your payment history, ensuring transparency and easy access to your financial records.",
            },
          ],
        };
    }
  };

  const roleContent = getRoleContent();

  if (isError) {
    console.error("Error when fetching data from getUsersQuery: ", error);
    toast.error(
      error?.data?.message || error?.error || "Failed to load user data.",
    );
    return (
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-100 opacity-40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-100 opacity-40 blur-3xl" />
        </div>
        <div className="relative mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-6 py-20 text-center lg:px-8">
          <div className="rounded-xl border border-gray-300 bg-white p-8 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Couldn&#39;t load your dashboard
            </h2>
            <p className="text-gray-600">
              Please refresh the page to try again.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-24">
        {/* Badge — same solid orange-50 pill as Hero, not a gradient */}
        <div
          ref={badgeRef}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2"
        >
          <BsStars className="text-orange-500" />
          <span className="flex items-center gap-1.5 text-sm font-semibold text-orange-600">
            {roleMeta.icon} {roleMeta.label}
          </span>
        </div>

        <h1
          ref={titleRef}
          className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-4xl"
        >
          <Typewriter
            options={{
              strings: `Welcome to your ${user.userRole ? user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1) : ""} Dashboard, ${userName}`,
              autoStart: true,
              cursor: "|",
              cursorClassName: "animate-pulse text-orange-500",
            }}
          />
        </h1>

        {/* Description */}
        <div ref={descriptionRef} className="mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-gray-600">
            {roleContent.title.before}
            <strong className="font-semibold text-orange-500">
              {roleContent.title.highlight}
            </strong>
            {roleContent.title.after}
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-4 text-left sm:gap-6">
          {roleContent.items.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                if (el) listItemsRef.current[index] = el;
              }}
              className="flex items-start gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-sm transition-shadow duration-300 will-change-transform hover:shadow-md sm:p-5"
            >
              <div className="mb-0 inline-flex flex-shrink-0 rounded-lg bg-orange-100 p-2.5">
                <span className="text-lg text-orange-500">{item.icon}</span>
              </div>

              <div className="flex-1">
                <span className="text-base font-bold text-gray-900 sm:text-lg">
                  {item.title}
                </span>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interface;
