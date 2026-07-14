import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetCourseQuery } from "../../Redux/features/api/coursesApi";
import Loading from "../../components/Loading/Loading";
import {
  FaGripfire,
  FaUsers,
  FaStar,
  FaPlay,
  FaBookmark,
  FaShare,
} from "react-icons/fa";
import { HiSparkles, HiAcademicCap, HiShieldCheck } from "react-icons/hi";
import {
  BsStars,
  BsArrowRight,
  BsArrowLeft,
  BsCalendar3,
} from "react-icons/bs";
import { MdVerified, MdLanguage, MdAccessTime, MdGroup } from "react-icons/md";
import { useSelector } from "react-redux";
import { usePostEnrollmentsMutation } from "../../Redux/features/api/enrollmentsApi";
import Swal from "sweetalert2";
import { useGetUsersQuery } from "../../Redux/features/api/usersApi";
import toast from "react-hot-toast";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const CourseDetails = () => {
  // States
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const pastLocation = location?.state?.from || "/courses";
  const navigate = useNavigate();

  // Refs for animations
  const detailsRef = useRef(null);
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const detailsCardsRef = useRef([]);
  const featuresRef = useRef([]);
  const buttonsRef = useRef([]);
  const brandRef = useRef(null);
  const particlesRef = useRef([]);

  // Redux state
  const { userName, userEmail, userPhoto } = useSelector(
    (state) => state.userSlice,
  );

  // RTK query hooks
  const { data: course, isLoading, isError, error } = useGetCourseQuery(id);
  const { data: usersData } = useGetUsersQuery();
  const [postEnrollments] = usePostEnrollmentsMutation();

  // Collecting user data
  const user = useMemo(
    () => usersData?.find((user) => user.userEmail === userEmail),
    [usersData, userEmail],
  );
  const userRole = user?.userRole;

  // Course features/highlights
  const courseFeatures = [
    {
      icon: <HiAcademicCap className="text-xl" />,
      title: "Expert Instructor",
      description: "Learn from industry professionals",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MdAccessTime className="text-xl" />,
      title: "Lifetime Access",
      description: "Learn at your own pace",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <MdVerified className="text-xl" />,
      title: "Certificate",
      description: "Get certified upon completion",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <HiShieldCheck className="text-xl" />,
      title: "Money Back",
      description: "30-day money back guarantee",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Create particle system
  useEffect(() => {
    const createParticles = () => {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 pointer-events-none";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        detailsRef.current?.appendChild(particle);
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

    if (detailsRef.current && course) {
      createParticles();
    }

    return () => {
      particlesRef.current.forEach((particle) => particle.remove());
      particlesRef.current = [];
    };
  }, [course]);

  // Main animations
  useEffect(() => {
    if (!course) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Hero section animation
    tl.fromTo(
      heroRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
    );

    // Image animation with 3D effect
    tl.fromTo(
      imageRef.current,
      {
        scale: 0.8,
        opacity: 0,
        rotationY: -30,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.7",
    );

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
      "-=0.5",
    );

    // Title animation
    tl.fromTo(
      titleRef.current,
      {
        y: 50,
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

    // Content animation
    tl.fromTo(
      contentRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    // Details cards stagger
    tl.fromTo(
      detailsCardsRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
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

    // Features animation
    tl.fromTo(
      featuresRef.current,
      {
        y: 40,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    );

    // Buttons animation
    tl.fromTo(
      buttonsRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.6)",
      },
      "-=0.2",
    );

    // Brand animation
    tl.fromTo(
      brandRef.current,
      {
        scale: 0.5,
        opacity: 0,
        rotationY: 45,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
      },
      "-=0.8",
    );
  }, [course]);

  // Handle Loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.log("Error:", error);
    toast.error(error.message || "Failed to load course details");
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Course not found
          </h2>
          <button
            onClick={() => navigate("/courses")}
            className="rounded-lg bg-orange-500 px-6 py-3 text-white transition-colors hover:bg-orange-600"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Handle Enrollments
  const handleEnrollmentBtn = async (data) => {
    if (userRole === "admin" || userRole === "teacher") {
      toast.error("Only students can enroll in courses.");
      return;
    }

    const result = await Swal.fire({
      title: "Enroll in Course?",
      text: `You're about to enroll in "${data.courseTitle}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Enroll Now!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        title: "text-xl font-bold",
        content: "text-gray-600",
      },
    });

    if (result.isConfirmed) {
      setIsEnrolling(true);

      const enrollmentInfo = {
        courseId: data._id,
        courseTitle: data.courseTitle,
        courseTeacherName: data.courseTeacherName,
        courseTeacherEmail: data.courseTeacherEmail,
        courseImage: data.courseImage,
        coursePrice: data.coursePrice,
        userName,
        userEmail,
        userPhoto,
        paymentStatus: "unpaid",
        enrollmentStatus: "pending",
      };

      try {
        await postEnrollments(enrollmentInfo).unwrap();

        // Success animation
        gsap.to(buttonsRef.current[0], {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });

        navigate(-1);
        toast.success("🎉 Enrollment successful! Welcome to the course!");
      } catch (error) {
        console.log("Error:", error);
        toast.error(error.message || "Enrollment failed. Please try again.");
      } finally {
        setIsEnrolling(false);
      }
    }
  };

  // Button hover animations
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

  // Feature hover animations
  const handleFeatureHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -5,
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

  // Image hover effect
  const handleImageHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(element, {
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={detailsRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-orange-400/5 to-pink-400/5 blur-3xl sm:h-96 sm:w-96" />
        <div
          className="absolute bottom-1/4 right-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-purple-400/5 blur-3xl sm:h-96 sm:w-96"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 mx-auto my-10 flex h-full w-11/12 max-w-7xl flex-col gap-8 sm:gap-12 lg:w-4/5">
        {/* Enhanced Hero Section */}
        <div ref={heroRef} className="relative">
          {/* Course Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-gray-300 shadow-2xl sm:h-80 md:h-96 lg:h-[500px]">
            <img
              ref={imageRef}
              src={course.courseImage}
              alt={course.courseTitle}
              className="h-full w-full object-cover transition-transform duration-500"
              onMouseEnter={(e) => handleImageHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleImageHover(e.currentTarget, false)}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="group rounded-full bg-white/90 p-4 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 sm:p-6">
                <FaPlay className="ml-1 text-2xl text-orange-500 sm:text-3xl" />
              </button>
            </div>

            {/* Course Badge */}
            <div
              ref={badgeRef}
              className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-2 backdrop-blur-sm sm:left-6 sm:top-6 sm:px-4"
            >
              <BsStars className="text-sm text-orange-500" />
              <span className="text-xs font-bold text-orange-600 sm:text-sm">
                PREMIUM COURSE
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
              <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                <FaBookmark className="text-lg" />
              </button>
              <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                <FaShare className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
        >
          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-2">
            {/* Course Header */}
            <div>
              <h1
                ref={titleRef}
                className="mb-4 text-2xl font-bold leading-tight text-gray-800 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
              >
                {course.courseTitle}
              </h1>

              {/* Course Meta */}
              <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-600 sm:gap-6">
                <div className="flex items-center gap-2">
                  <MdVerified className="text-blue-500" />
                  <span className="text-sm font-medium sm:text-base">
                    {course.courseTeacherName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-green-500" />
                  <span className="text-sm sm:text-base">
                    {course.courseStudentsCount} students
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="text-sm sm:text-base">
                    4.8 (1,234 reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MdLanguage className="text-purple-500" />
                  <span className="text-sm sm:text-base">English</span>
                </div>
              </div>
            </div>

            {/* Course Details Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {[
                {
                  icon: MdVerified,
                  label: "Instructor",
                  value: course.courseTeacherName,
                  color: "text-blue-500",
                },
                {
                  icon: MdGroup,
                  label: "Email",
                  value: course.courseTeacherEmail,
                  color: "text-green-500",
                },
                {
                  icon: FaUsers,
                  label: "Students",
                  value: `${course.courseStudentsCount} enrolled`,
                  color: "text-purple-500",
                },
                {
                  icon: BsCalendar3,
                  label: "Last Updated",
                  value: "2 weeks ago",
                  color: "text-orange-500",
                },
              ].map((detail, index) => {
                const IconComponent = detail.icon;
                return (
                  <div
                    key={detail.label}
                    ref={(el) => (detailsCardsRef.current[index] = el)}
                    className="rounded-2xl border border-gray-300 bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-gray-100 p-2">
                        <IconComponent className={`text-lg ${detail.color}`} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 sm:text-sm">
                          {detail.label}
                        </p>
                        <p className="text-sm font-bold text-gray-800 sm:text-base">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Course Description */}
            <div className="rounded-2xl border border-gray-300 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:p-8">
              <h3 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">
                About This Course
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                {showFullDescription
                  ? course.courseDescription
                  : `${course.courseDescription?.slice(0, 200)}...`}
              </p>
              {course.courseDescription?.length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600 sm:text-base"
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </button>
              )}
            </div>

            {/* Course Features */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {courseFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className="group cursor-pointer rounded-2xl border border-gray-300 bg-white/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl sm:p-6"
                  onMouseEnter={(e) =>
                    handleFeatureHover(e.currentTarget, true)
                  }
                  onMouseLeave={(e) =>
                    handleFeatureHover(e.currentTarget, false)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`bg-gradient-to-r p-3 ${feature.color} rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 sm:text-base">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-600 sm:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* Price Card */}
            <div className="sticky top-6 rounded-2xl border border-gray-300 bg-white/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="mb-6 text-center sm:mb-8">
                <div className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                  ${course.coursePrice}
                </div>
                <p className="text-sm text-gray-600 sm:text-base">
                  One-time payment
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  ref={(el) => (buttonsRef.current[0] = el)}
                  onClick={() => handleEnrollmentBtn(course)}
                  disabled={isEnrolling}
                  className={`group relative w-full transform overflow-hidden rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-2xl transition-all duration-300 focus:outline-none sm:text-base ${
                    isEnrolling
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  }`}
                  onMouseEnter={(e) =>
                    !isEnrolling && handleButtonHover(e.currentTarget, true)
                  }
                  onMouseLeave={(e) =>
                    !isEnrolling && handleButtonHover(e.currentTarget, false)
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isEnrolling ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Enrolling...
                      </>
                    ) : (
                      <>
                        <HiSparkles className="text-xl" />
                        Enroll Now
                        <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>

                <button
                  ref={(el) => (buttonsRef.current[1] = el)}
                  onClick={() => navigate(pastLocation)}
                  className="group w-full rounded-2xl border-2 border-gray-300 px-6 py-4 text-sm font-bold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 sm:text-base"
                  onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                  onMouseLeave={(e) =>
                    handleButtonHover(e.currentTarget, false)
                  }
                >
                  <span className="flex items-center justify-center gap-3">
                    <BsArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to Courses
                  </span>
                </button>
              </div>

              {/* Money Back Guarantee */}
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <HiShieldCheck className="text-lg" />
                  <span className="text-sm font-medium">
                    30-day money back guarantee
                  </span>
                </div>
              </div>
            </div>

            {/* Learnio Brand */}
            <div
              ref={brandRef}
              className="rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-6 text-center text-white sm:p-8"
            >
              <div className="mb-4 inline-flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-3">
                  <FaGripfire className="text-2xl" />
                </div>
                <span className="text-xl font-bold sm:text-2xl">Learnio</span>
              </div>
              <p className="text-sm opacity-90 sm:text-base">
                Join thousands of learners advancing their careers with
                expert-led courses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
