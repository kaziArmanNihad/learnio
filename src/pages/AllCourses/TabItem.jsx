import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router";
import { FaStar, FaUsers, FaPlay, FaBookmark, FaClock } from "react-icons/fa";
import { HiAcademicCap, HiLightningBolt } from "react-icons/hi";
import { BsArrowRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdVerified, MdTrendingUp, MdAccessTime } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 6;

const TabItem = ({
  Course,
  searchTerm = "",
  sortBy = "newest",
  viewMode = "grid",
}) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort courses
  const processedCourses = useMemo(() => {
    let filtered = Course || [];

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.courseTeacherName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          course.courseDescription
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "popular":
          return (b.courseStudentsCount || 0) - (a.courseStudentsCount || 0);
        case "rating":
          return (b.rating || 4.5) - (a.rating || 4.5);
        default:
          return 0;
      }
    });

    return sorted;
  }, [Course, searchTerm, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(processedCourses.length / PAGE_SIZE),
  );

  // Reset to page 1 whenever the search term or sort changes (a fresh result
  // set). Category changes remount this component entirely via react-tabs,
  // so page 1 there is already the default.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  // If the result set shrinks (e.g. a narrower search) past the current
  // page, snap back to the last valid page instead of showing a blank grid.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return processedCourses.slice(start, start + PAGE_SIZE);
  }, [processedCourses, currentPage]);

  // Reset every render so stale/null entries never accumulate in the ref
  // array (avoids GSAP's "reading '_gsap' of null" if a page has fewer
  // than PAGE_SIZE cards).
  cardsRef.current = [];

  // Animate the current page's cards in, and give the grid a small
  // fade+shift so page changes read as one motion rather than a hard cut.
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginatedCourses]);

  const goToPage = (page) => {
    const target = Math.min(Math.max(page, 1), totalPages);
    if (target === currentPage) return;
    setCurrentPage(target);
    // Scroll the grid back into view so the new page doesn't land off-screen
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Reusable, interruption-safe hover
  const attachHover = (el, config) => {
    if (!el) return;
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const scaleTo = gsap.quickTo(el, "scale", {
      duration: 0.35,
      ease: "power3.out",
    });
    el.addEventListener("mouseenter", () => {
      yTo(config.y ?? 0);
      scaleTo(config.scale ?? 1);
    });
    el.addEventListener("mouseleave", () => {
      yTo(0);
      scaleTo(1);
    });
  };

  const getMockRating = (course) => {
    return (4.2 + (course.courseStudentsCount % 10) * 0.08).toFixed(1);
  };

  const getMockDuration = (course) => {
    const durations = ["4h 30m", "6h 15m", "8h 45m", "3h 20m", "5h 10m"];
    return durations[course.courseStudentsCount % durations.length];
  };

  const getDifficultyLevel = (course) => {
    const levels = ["Beginner", "Intermediate", "Advanced"];
    return levels[course.courseStudentsCount % levels.length];
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Beginner":
        return "from-green-500 to-emerald-500";
      case "Intermediate":
        return "from-yellow-500 to-orange-500";
      case "Advanced":
        return "from-red-500 to-pink-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  // Windowed page numbers: first, last, current +/-1, with ellipses between
  const getPageNumbers = () => {
    const pages = [];
    const window = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - window && i <= currentPage + window)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "…") {
        pages.push("…");
      }
    }
    return pages;
  };

  if (processedCourses.length === 0) {
    return (
      <div className="py-12 text-center sm:py-16 lg:py-20">
        <div className="mb-6 inline-flex rounded-full bg-gray-100 p-6">
          <HiAcademicCap className="text-4xl text-gray-400" />
        </div>
        <h3 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">
          {searchTerm ? "No courses found" : "No courses available"}
        </h3>
        <p className="mx-auto mb-6 max-w-md text-gray-600">
          {searchTerm
            ? `No courses match "${searchTerm}". Try adjusting your search terms.`
            : "Courses for this category will be available soon."}
        </p>
        {searchTerm && (
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-orange-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-orange-600"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  const rangeStart = (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, processedCourses.length);

  return (
    <div ref={containerRef} className="w-full">
      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 sm:text-xl">
            Showing {rangeStart}–{rangeEnd} of {processedCourses.length} Course
            {processedCourses.length !== 1 ? "s" : ""}
          </h3>
          {searchTerm && (
            <p className="text-sm text-gray-600">Results for {searchTerm}</p>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Sorted by:</span>
          <span className="font-semibold capitalize text-orange-500">
            {sortBy === "newest"
              ? "Newest"
              : sortBy === "oldest"
                ? "Oldest"
                : sortBy}
          </span>
        </div>
      </div>

      {/* Courses Grid */}
      <div
        ref={gridRef}
        className={`grid place-items-center gap-6 sm:gap-8 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "mx-auto max-w-4xl grid-cols-1"
        }`}
      >
        {paginatedCourses.map((course, index) => {
          const rating = getMockRating(course);
          const duration = getMockDuration(course);
          const difficulty = getDifficultyLevel(course);
          const difficultyColor = getDifficultyColor(difficulty);

          return (
            <div
              key={course._id || index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
                attachHover(el, { y: -10, scale: 1.02 });
              }}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-300 bg-white/90 shadow-xl backdrop-blur-sm transition-shadow duration-500 will-change-transform hover:shadow-2xl ${
                viewMode === "grid"
                  ? "h-auto w-full max-w-sm"
                  : "flex h-auto w-full flex-col sm:flex-row"
              }`}
            >
              {/* Background Gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Image Section */}
              <div
                className={`relative ${
                  viewMode === "grid"
                    ? "h-48 w-full sm:h-56"
                    : "h-48 w-full flex-shrink-0 sm:h-full sm:w-64"
                } overflow-hidden rounded-t-3xl ${viewMode === "list" ? "sm:rounded-l-3xl sm:rounded-tr-none" : ""}`}
              >
                <img
                  src={course.courseImage}
                  alt={course.courseTitle}
                  className="course-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                    <FaPlay className="ml-0.5 text-lg text-orange-500" />
                  </button>
                </div>

                <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
                  <div
                    className={`bg-gradient-to-r px-3 py-1 ${difficultyColor} rounded-full text-xs font-bold text-white shadow-lg`}
                  >
                    {difficulty}
                  </div>

                  <div className="flex gap-2">
                    <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                      <FaBookmark className="text-sm" />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                    <FaClock className="text-xs" />
                    {duration}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div
                className={`relative flex-1 p-4 sm:p-6 ${
                  viewMode === "list" ? "flex flex-col justify-between" : ""
                }`}
              >
                <div className="mb-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-sm text-yellow-500" />
                      <span className="text-sm font-bold text-gray-800">
                        {rating}
                      </span>
                      <span className="text-xs text-gray-500">(124)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <FaUsers className="text-sm" />
                      <span className="text-sm">
                        {course.courseStudentsCount}
                      </span>
                    </div>
                  </div>

                  <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-500 sm:text-xl">
                    {course.courseTitle}
                  </h2>

                  <div className="mb-3 flex items-center gap-2">
                    <MdVerified className="text-sm text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">
                      {course.courseTeacherName}
                    </span>
                  </div>

                  {viewMode === "list" && course.courseDescription && (
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {course.courseDescription}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MdAccessTime className="text-sm" />
                    <span>Updated recently</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdTrendingUp className="text-sm" />
                    <span>Popular</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      ${course.coursePrice}
                    </span>
                    {course.coursePrice > 50 && (
                      <span className="text-sm text-gray-500 line-through">
                        ${(course.coursePrice * 1.5).toFixed(0)}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/courses/${course._id}`}
                    state={{ from: location.pathname }}
                  >
                    <button
                      ref={(el) => attachHover(el, { scale: 1.05 })}
                      className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-shadow duration-300 will-change-transform hover:shadow-xl sm:px-6 sm:py-3 sm:text-base"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                      <span className="relative z-10 flex items-center gap-2">
                        View Details
                        <BsArrowRight className="text-sm transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </button>
                  </Link>
                </div>

                {course.courseStudentsCount > 100 && (
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                    <HiLightningBolt className="text-xs" />
                    Popular
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2 sm:mt-14">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-2.5 text-gray-600 transition-all duration-300 hover:border-orange-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-gray-600 sm:p-3"
            aria-label="Previous page"
          >
            <BsChevronLeft />
          </button>

          {getPageNumbers().map((page, i) =>
            page === "…" ? (
              <span
                key={`ellipsis-${i}`}
                className="px-1 text-sm font-medium text-gray-400 sm:px-2"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`h-10 w-10 rounded-xl text-sm font-bold transition-all duration-300 sm:h-11 sm:w-11 ${
                  page === currentPage
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "border-2 border-gray-300 bg-white text-gray-600 hover:border-orange-400 hover:text-orange-500"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-2.5 text-gray-600 transition-all duration-300 hover:border-orange-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:text-gray-600 sm:p-3"
            aria-label="Next page"
          >
            <BsChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default TabItem;
