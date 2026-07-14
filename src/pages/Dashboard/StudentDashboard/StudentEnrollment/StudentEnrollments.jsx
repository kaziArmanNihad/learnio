import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import {
  useDeleteEnrollmentsMutation,
  useGetEnrollmentsQuery,
} from "../../../../Redux/features/api/enrollmentsApi";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaMoneyCheck,
  FaRegTrashAlt,
  FaGraduationCap,
  FaBookOpen,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { HiSparkles, HiCurrencyDollar } from "react-icons/hi";
import {
  BsStars,
  BsCheckCircle,
  BsArrowRight,
  BsClock,
  BsGrid3X3Gap,
  BsList,
} from "react-icons/bs";
import { MdPending, MdVerified, MdDashboard } from "react-icons/md";
import toast from "react-hot-toast";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const StudentEnrollments = () => {
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'
  const [isDeleting, setIsDeleting] = useState(null);

  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // Refs for animations
  const enrollmentsRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const filtersRef = useRef(null);
  const contentRef = useRef(null);
  const rowsRef = useRef([]);
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);

  const emptyRef = useRef(null);
  const emptyIconRef = useRef(null);
  const emptyButtonRef = useRef(null);

  // RTK Query hooks
  const { data, isLoading, isError, error, refetch } = useGetEnrollmentsQuery();
  const [deleteEnrollments] = useDeleteEnrollmentsMutation();

  // ⚠️ FIX: Remove the infinite re-fetch loop
  // The original useEffect was: useEffect(() => { if (data) { refetch(); } }, [data]);
  // This is removed, as RTK Query automatically manages data fetching and caching.

  // Filter enrollments only for the current user
  const allEnrollments = useMemo(
    () =>
      data?.filter((enrollment) => enrollment.userEmail === userEmail) || [],
    [data, userEmail],
  );

  // Filter and search enrollments
  const filteredEnrollments = useMemo(() => {
    // ⚠️ FIX: Reset refs for dynamic elements when data changes
    rowsRef.current = [];
    cardsRef.current = [];

    let filtered = allEnrollments;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (enrollment) =>
          enrollment.courseTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          enrollment.courseTeacherName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((enrollment) => {
        switch (filterStatus) {
          case "paid":
            return enrollment.paymentStatus === "paid";
          case "unpaid":
            return enrollment.paymentStatus === "unpaid";
          case "active":
            return enrollment.enrollmentStatus === "active";
          case "pending":
            return (
              enrollment.enrollmentStatus === "pending" ||
              enrollment.enrollmentStatus === "pending"
            );
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [allEnrollments, searchTerm, filterStatus]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEnrollments = allEnrollments.length;
    const paidEnrollments = allEnrollments.filter(
      (e) => e.paymentStatus === "paid",
    ).length;
    const activeEnrollments = allEnrollments.filter(
      (e) => e.enrollmentStatus === "active",
    ).length;
    const totalSpent = allEnrollments
      .filter((e) => e.paymentStatus === "paid")
      .reduce((sum, e) => sum + (parseFloat(e.coursePrice) || 0), 0);

    return [
      {
        number: totalEnrollments.toString(),
        label: "Total Enrollments",
        icon: FaBookOpen,
      },
      {
        number: paidEnrollments.toString(),
        label: "Paid Courses",
        icon: RiMoneyDollarBoxFill,
      },
      {
        number: activeEnrollments.toString(),
        label: "Active Courses",
        icon: BsCheckCircle,
      },
      {
        number: `$${totalSpent.toFixed(0)}`,
        label: "Total Spent",
        icon: HiCurrencyDollar,
      },
    ];
  }, [allEnrollments]);

  // Handle delete
  const handleDelete = useCallback(
    async (id, courseTitle) => {
      const result = await Swal.fire({
        title: "Delete Enrollment?",
        text: `Are you sure you want to delete your enrollment for "${courseTitle}"? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "rounded-2xl",
          title: "text-xl font-bold",
          content: "text-gray-600",
        },
      });

      if (result.isConfirmed) {
        setIsDeleting(id);
        try {
          await deleteEnrollments(id).unwrap();
          toast.success("🗑️ Enrollment deleted successfully!");
        } catch (err) {
          console.error("Failed to delete enrollment", err);
          // ⚠️ FIX: Add safe fallback message for toast
          toast.error(
            err?.data?.message || err?.error || "Failed to delete enrollment",
          );
        } finally {
          setIsDeleting(null);
        }
      }
    },
    [deleteEnrollments],
  ); // Added deleteEnrollments to the dependency array

  // Create particle system
  useEffect(() => {
    // ⚠️ FIX: Add full cleanup on unmount for memory leak prevention
    const clearParticles = () => {
      particlesRef.current.forEach((particle) => {
        gsap.killTweensOf(particle); // Kill GSAP tweens
        particle.remove();
      });
      particlesRef.current = [];
    };

    const createParticles = () => {
      // Clear existing particles first
      clearParticles();
      if (!enrollmentsRef.current) return; // ⚠️ FIX: Add guard for element existence

      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 pointer-events-none";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        enrollmentsRef.current.appendChild(particle);
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

    if (enrollmentsRef.current && allEnrollments.length > 0) {
      createParticles();
    }

    // Cleanup function runs on unmount
    return () => {
      clearParticles();
    };
  }, [allEnrollments.length]);

  // Main animations
  useEffect(() => {
    if (!allEnrollments.length && !isLoading) return;

    // ⚠️ FIX: Add guards for element existence for GSAP animations
    if (
      !badgeRef.current ||
      !titleRef.current ||
      !filtersRef.current ||
      !contentRef.current
    )
      return;

    // Clear any existing timelines/tweens before creating a new one
    gsap.killTweensOf([
      badgeRef.current,
      titleRef.current,
      filtersRef.current,
      contentRef.current,
      statsRef.current,
      rowsRef.current,
      cardsRef.current,
    ]);

    const tl = gsap.timeline({ delay: 0.3 });

    // Badge animation
    tl.fromTo(
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
      },
    );

    // Title animation
    tl.fromTo(
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
      },
      "-=0.5",
    );

    // Stats animation
    tl.fromTo(
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
      },
      "-=0.3",
    );

    // Filters animation
    tl.fromTo(
      filtersRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.2",
    );

    // Content animation
    tl.fromTo(
      contentRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4",
    );

    // Animate table rows or cards
    // Filter out null values in the refs arrays
    const elements = (
      viewMode === "table" ? rowsRef.current : cardsRef.current
    ).filter(Boolean);

    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1, // Start animation after the main content is in place
        },
      );
    }

    const badge = badgeRef.current;
    const title = titleRef.current;
    const filters = filtersRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    const rows = rowsRef.current;
    const cards = cardsRef.current;
    // Cleanup function for GSAP tweens
    return () => {
      tl.kill();
      gsap.killTweensOf([badge, title, filters, content, stats, rows, cards]);
    };
  }, [allEnrollments.length, viewMode, isLoading, filteredEnrollments.length]);

  // Animation for the Empty State
  // ❌ FIX: Empty state animation logic moved here, using the globally declared refs
  useEffect(() => {
    // Only run this effect if allEnrollments is truly empty and not loading
    if (allEnrollments.length === 0 && !isLoading) {
      // ⚠️ FIX: Add guards for element existence for GSAP animations
      if (!emptyRef.current || !emptyIconRef.current || !emptyButtonRef.current)
        return;

      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        emptyRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.8)",
        },
      );

      tl.fromTo(
        emptyIconRef.current,
        {
          scale: 0,
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.5",
      );

      tl.fromTo(
        emptyButtonRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3",
      );

      const empty = emptyRef.current;
      const emptyIcon = emptyIconRef.current;
      const emptyButton = emptyButtonRef.current;

      return () => {
        tl.kill();
        gsap.killTweensOf([empty, emptyIcon, emptyButton]);
      };
    }
  }, [allEnrollments.length, isLoading]); // Dependency array includes the condition for running

  // Empty state rendering
  if (allEnrollments.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-pink-400/5 blur-3xl" />
          <div
            className="absolute bottom-1/4 right-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div ref={emptyRef} className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            {/* Empty Icon */}
            <div
              ref={emptyIconRef}
              className="mb-6 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-6 shadow-2xl"
            >
              <FaGraduationCap className="text-4xl text-white" />
            </div>
            {/* Title */}
            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Enrollments Yet
            </h1>
            {/* Message */}
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              Hello {userName}! You haven&#39;t enrolled in any courses yet.
              Start your learning journey by exploring our amazing courses.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-2">
              <Link to="/courses">
                <button
                  type="button"
                  className="group w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/50 sm:w-auto sm:text-lg"
                >
                  <span className="flex items-center justify-center gap-3">
                    <HiSparkles className="text-xl" />
                    Explore Courses
                    <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>

              <Link to="/dashboard/interface">
                <button
                  type="button"
                  className="group w-full rounded-2xl border-2 border-blue-300 px-8 py-4 text-base font-bold text-gray-700 transition-all duration-300 hover:border-blue-400 hover:bg-blue-500 hover:text-white sm:w-auto sm:text-lg"
                >
                  <span className="flex items-center justify-center gap-3">
                    <MdDashboard className="text-xl" />
                    Interface
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get status badge
  const getStatusBadge = (status, type = "payment") => {
    // ... (logic remains the same)
    if (type === "payment") {
      return status === "paid" ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-800">
          <BsCheckCircle className="text-xs" />
          Paid
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-800">
          <BsClock className="text-xs" />
          Unpaid
        </span>
      );
    } else {
      const isPending = status === "pending" || status === "pending";
      return isPending ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-800">
          <MdPending className="text-xs" />
          Pending
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-800">
          <MdVerified className="text-xs" />
          Active
        </span>
      );
    }
  };

  // Card component for mobile/card view
  const EnrollmentCard = ({ enrollment, index }) => (
    <div
      // ⚠️ FIX: Resetting refs in useMemo ensures alignment with the current filtered list
      ref={(el) => (cardsRef.current[index] = el)}
      className="rounded-2xl border border-gray-300 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800">
            {enrollment.courseTitle}
          </h3>
          <div className="mb-3 flex items-center gap-2 text-gray-600">
            <FaUser className="text-sm" />
            <span className="text-sm">{enrollment.courseTeacherName}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800">
            ${enrollment.coursePrice}
          </div>
        </div>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Payment Status:</span>
          {getStatusBadge(enrollment.paymentStatus, "payment")}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Enrollment Status:</span>
          {getStatusBadge(enrollment.enrollmentStatus, "enrollment")}
        </div>
      </div>

      <div className="flex gap-3">
        {enrollment.paymentStatus === "unpaid" ? (
          <Link to={`/dashboard/payment/${enrollment._id}`} className="flex-1">
            <button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                <FaMoneyCheck />
                Pay Now
              </span>
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="flex-1 cursor-not-allowed rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-500"
          >
            <span className="flex items-center justify-center gap-2">
              <RiMoneyDollarBoxFill />
              Paid
            </span>
          </button>
        )}

        <button
          onClick={() => handleDelete(enrollment._id, enrollment.courseTitle)}
          disabled={
            enrollment.paymentStatus === "paid" || isDeleting === enrollment._id
          }
          className={`rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
            enrollment.paymentStatus === "paid"
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-red-500 text-white hover:scale-105 hover:bg-red-600"
          }`}
        >
          {isDeleting === enrollment._id ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <FaRegTrashAlt />
          )}
        </button>
      </div>
    </div>
  );

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.error("Error when fetching data from getEnrollmentsQuery:", error);
    // ⚠️ FIX: Add safe fallback message for toast
    toast.error(
      error?.data?.message || error?.error || "Failed to load enrollments",
    );
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Failed to load enrollments
          </h2>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={enrollmentsRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div
          className="absolute bottom-1/4 right-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Enhanced Header */}
          <div ref={headerRef} className="mb-8 text-center sm:mb-12">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-100 to-sky-100 px-4 py-2"
            >
              <BsStars className="text-sm text-blue-500" />
              <span className="text-sm font-bold uppercase tracking-wider text-blue-500">
                My Learning
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              My{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Enrollments
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              📚 Track your learning progress, manage payments, and access your
              enrolled courses all in one place.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:mb-12 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  ref={(el) => (statsRef.current[index] = el)}
                  className="rounded-2xl border border-gray-300 bg-white/80 p-4 text-center shadow-lg backdrop-blur-sm sm:p-6"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 shadow-lg">
                    <IconComponent className="text-lg text-white sm:text-xl" />
                  </div>
                  <div className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                    {stat.number}
                  </div>
                  <div className="text-xs font-medium text-gray-600 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters and Search */}
          <div
            ref={filtersRef}
            className="mb-8 rounded-2xl border border-gray-300 bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6"
          >
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses or teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-300 py-3 pl-10 pr-4 transition-all duration-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Filter Dropdown */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-xl border-2 border-gray-300 px-4 py-3 transition-all duration-300 focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Enrollments</option>
                  <option value="paid">Paid Only</option>
                  <option value="unpaid">Unpaid Only</option>
                  <option value="active">Active Only</option>
                  <option value="pending">Pending Only</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex rounded-xl bg-gray-100 p-1">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`rounded-lg p-2 transition-all duration-300 ${
                      viewMode === "table"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:text-blue-500"
                    }`}
                  >
                    <BsList className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`rounded-lg p-2 transition-all duration-300 ${
                      viewMode === "cards"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:text-blue-500"
                    }`}
                  >
                    <BsGrid3X3Gap className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {filteredEnrollments.length} of {allEnrollments.length}{" "}
                enrollments
              </span>
              {searchTerm && <span>Results for &#34;{searchTerm}&#34;</span>}
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            {filteredEnrollments.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-6 inline-flex rounded-full bg-gray-100 p-6">
                  <FaSearch className="text-4xl text-gray-400" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  No enrollments found
                </h3>
                <p className="mb-6 text-gray-600">
                  {searchTerm
                    ? `No enrollments match "${searchTerm}" with the current filters.`
                    : "No enrollments match the current filters."}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  className="rounded-xl bg-blue-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-600"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "cards" ? (
              // Cards View
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {/* Ensure cardsRef is populated correctly for the animation */}
                {filteredEnrollments.map((enrollment, index) => (
                  <EnrollmentCard
                    key={enrollment._id}
                    enrollment={enrollment}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              // Table View
              <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white/90 shadow-lg backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                          Teacher
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Ensure rowsRef is populated correctly for the animation */}
                      {filteredEnrollments.map((enrollment, index) => (
                        <tr
                          key={enrollment._id}
                          ref={(el) => (rowsRef.current[index] = el)}
                          className="transition-colors duration-200 hover:bg-blue-50/50"
                        >
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="text-sm font-medium text-gray-900">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="max-w-xs truncate text-sm font-medium text-gray-900">
                              {enrollment.courseTitle}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <FaUser className="mr-2 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                {enrollment.courseTeacherName}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="text-lg font-bold text-gray-900">
                              ${enrollment.coursePrice}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center">
                            {enrollment.paymentStatus === "unpaid" ? (
                              <Link to={`/dashboard/payment/${enrollment._id}`}>
                                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-blue-600">
                                  <FaMoneyCheck />
                                  Pay
                                </button>
                              </Link>
                            ) : (
                              <button
                                disabled
                                className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-bold text-gray-500"
                              >
                                <RiMoneyDollarBoxFill />
                                Paid
                              </button>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center">
                            {getStatusBadge(
                              enrollment.enrollmentStatus,
                              "enrollment",
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center">
                            <button
                              onClick={() =>
                                handleDelete(
                                  enrollment._id,
                                  enrollment.courseTitle,
                                )
                              }
                              disabled={
                                enrollment.paymentStatus === "paid" ||
                                isDeleting === enrollment._id
                              }
                              className={`rounded-lg p-2 transition-all duration-300 ${
                                enrollment.paymentStatus === "paid"
                                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                  : "bg-red-500 text-white hover:scale-105 hover:bg-red-600"
                              }`}
                            >
                              {isDeleting === enrollment._id ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                              ) : (
                                <FaRegTrashAlt />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollments;
