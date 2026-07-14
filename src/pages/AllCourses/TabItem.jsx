import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router";
import { FaStar, FaUsers, FaPlay, FaBookmark, FaClock } from "react-icons/fa";
import { HiSparkles, HiAcademicCap, HiLightningBolt } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { MdVerified, MdTrendingUp, MdAccessTime } from "react-icons/md";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const TabItem = ({
  Course,
  searchTerm = "",
  sortBy = "newest",
  viewMode = "grid",
}) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Filter and sort courses
  const processedCourses = useMemo(() => {
    let filtered = Course || [];

    // Apply search filter
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

    // Apply sorting
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

  // Animate cards when they appear
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      // Reset previous animations
      gsap.set(cardsRef.current, { clearProps: "all" });

      // Animate cards with stagger
      gsap.fromTo(
        cardsRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
          rotationY: 15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [processedCourses]);

  // Card hover animations
  const handleCardHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -10,
        scale: 1.02,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out",
      });

      // Animate image
      const image = element.querySelector(".course-image");
      if (image) {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(element, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      // Reset image
      const image = element.querySelector(".course-image");
      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  // Button hover animations
  const handleButtonHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Generate mock rating for demonstration
  const getMockRating = (course) => {
    return (4.2 + (course.courseStudentsCount % 10) * 0.08).toFixed(1);
  };

  // Generate mock duration
  const getMockDuration = (course) => {
    const durations = ["4h 30m", "6h 15m", "8h 45m", "3h 20m", "5h 10m"];
    return durations[course.courseStudentsCount % durations.length];
  };

  // Get difficulty level
  const getDifficultyLevel = (course) => {
    const levels = ["Beginner", "Intermediate", "Advanced"];
    return levels[course.courseStudentsCount % levels.length];
  };

  // Get difficulty color
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

  // No courses found state
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

  return (
    <div ref={containerRef} className="w-full">
      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 sm:text-xl">
            {processedCourses.length} Course
            {processedCourses.length !== 1 ? "s" : ""} Found
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
        className={`grid place-items-center gap-6 sm:gap-8 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "mx-auto max-w-4xl grid-cols-1"
        }`}
      >
        {processedCourses.map((course, index) => {
          const rating = getMockRating(course);
          const duration = getMockDuration(course);
          const difficulty = getDifficultyLevel(course);
          const difficultyColor = getDifficultyColor(difficulty);

          return (
            <div
              key={course._id || index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-300 bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${
                viewMode === "grid"
                  ? "h-auto w-full max-w-sm"
                  : "flex h-auto w-full flex-col sm:flex-row"
              }`}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

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
                  className="course-image h-full w-full object-cover transition-transform duration-500"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                    <FaPlay className="ml-0.5 text-lg text-orange-500" />
                  </button>
                </div>

                {/* Top Badges */}
                <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
                  {/* Difficulty Badge */}
                  <div
                    className={`bg-gradient-to-r px-3 py-1 ${difficultyColor} rounded-full text-xs font-bold text-white shadow-lg`}
                  >
                    {difficulty}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                      <FaBookmark className="text-sm" />
                    </button>
                  </div>
                </div>

                {/* Bottom Badge */}
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
                {/* Course Header */}
                <div className="mb-4">
                  {/* Rating and Students */}
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

                  {/* Title */}
                  <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-500 sm:text-xl">
                    {course.courseTitle}
                  </h2>

                  {/* Instructor */}
                  <div className="mb-3 flex items-center gap-2">
                    <MdVerified className="text-sm text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">
                      {course.courseTeacherName}
                    </span>
                  </div>

                  {/* Description (List view only) */}
                  {viewMode === "list" && course.courseDescription && (
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {course.courseDescription}
                    </p>
                  )}
                </div>

                {/* Course Stats */}
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

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  {/* Price */}
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

                  {/* Details Button */}
                  <Link
                    to={`/courses/${course._id}`}
                    state={{ from: location.pathname }}
                  >
                    <button
                      className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl sm:px-6 sm:py-3 sm:text-base"
                      onMouseEnter={(e) =>
                        handleButtonHover(e.currentTarget, true)
                      }
                      onMouseLeave={(e) =>
                        handleButtonHover(e.currentTarget, false)
                      }
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                      <span className="relative z-10 flex items-center gap-2">
                        View Details
                        <BsArrowRight className="text-sm transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Popular Badge */}
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

      {/* Load More Button (if needed) */}
      {processedCourses.length >= 12 && (
        <div className="mt-8 text-center sm:mt-12">
          <button className="group rounded-2xl border-2 border-orange-300 bg-white/80 px-8 py-4 font-bold text-orange-600 backdrop-blur-sm transition-all duration-300 hover:border-orange-400 hover:bg-orange-50">
            <span className="flex items-center gap-3">
              <HiSparkles className="text-xl" />
              Load More Courses
              <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TabItem;
