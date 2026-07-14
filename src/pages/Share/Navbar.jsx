import { signOut } from "firebase/auth";
import { FaGripfire } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import auth from "../../Firebase/Firebase.Config";
import { logoutUser } from "../../Redux/features/userSlice";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  // states
  const { userEmail } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for animations
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const authButtonsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  // Navigation links data
  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "All Courses" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
    ...(userEmail
      ? [
          { to: "/teacher", label: "Teacher Enrollment" },
          { to: "/dashboard/interface", label: "Dashboard" },
        ]
      : []),
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Navbar slide down animation
    tl.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );

    // Logo animation with rotation and scale
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    );

    // Navigation links stagger animation
    tl.fromTo(
      navLinksRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.4",
    );

    // Auth buttons animation
    tl.fromTo(
      authButtonsRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.3",
    );

    // Continuous logo floating animation
    gsap.to(logoRef.current, {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  // Scroll-based navbar transformation
  useEffect(() => {
    gsap.to(navbarRef.current, {
      backgroundColor: isScrolled
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(255, 255, 255, 0.8)",
      backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
      WebkitBackdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
      boxShadow: isScrolled
        ? "0 10px 30px rgba(0, 0, 0, 0.1)"
        : "0 4px 20px rgba(0, 0, 0, 0.05)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isScrolled]);

  // Mobile menu animations
  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);

      gsap.set(mobileMenuRef.current, { display: "block" });
      gsap.set(overlayRef.current, { display: "block" });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }).fromTo(
        mobileMenuRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.2",
      );
    } else {
      const tl = gsap.timeline();
      tl.to(mobileMenuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      })
        .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2")
        .set([mobileMenuRef.current, overlayRef.current], { display: "none" });

      setIsMobileMenuOpen(false);
    }
  };

  // Hover animations for nav links
  const handleNavLinkHover = (element, isEntering) => {
    if (isEntering) {
      gsap.to(element, {
        y: -3,
        scale: 1.05,
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

  // Button hover animations
  const handleButtonHover = (element, isEntering, variant = "default") => {
    if (isEntering) {
      if (variant === "logout") {
        gsap.to(element, {
          scale: 1.05,
          backgroundColor: "#DC2626",
          color: "#FFFFFF",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(element, {
          scale: 1.05,
          backgroundColor: "#000000",
          color: "#FFFFFF",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(element, {
        scale: 1,
        backgroundColor: "transparent",
        color: variant === "logout" ? "#DC2626" : "#000000",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // handle logout with animation
  const handleLogout = () => {
    const tl = gsap.timeline();

    tl.to(navbarRef.current, {
      y: -100,
      opacity: 0.5,
      duration: 0.5,
      ease: "power3.in",
    });

    tl.call(() => {
      signOut(auth);
      dispatch(logoutUser());
      navigate(-1);
      toast.success("Logout Successfully");
    });

    tl.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  // Navigation Link Component
  const NavigationLink = ({ to, label, index, isMobile = false }) => (
    <NavLink
      to={to}
      ref={(el) => (navLinksRef.current[index] = el)}
      className={({ isActive }) =>
        `relative p-3 font-bold transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
            : "text-gray-700 hover:text-orange-500"
        } ${isMobile ? "block w-full py-4 text-center text-lg" : ""}`
      }
      onMouseEnter={(e) =>
        !isMobile && handleNavLinkHover(e.currentTarget, true)
      }
      onMouseLeave={(e) =>
        !isMobile && handleNavLinkHover(e.currentTarget, false)
      }
    >
      {label}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full" />
    </NavLink>
  );

  return (
    <div className="h-full w-full">
      {/* Main Navbar */}
      <nav
        ref={navbarRef}
        className="fixed left-0 right-0 top-0 z-50 border-b border-gray-300 bg-white/70 backdrop-blur-lg transition-all duration-300"
      >
        <div className="xl:w-8xl navbar mx-auto h-full w-full justify-between sm:w-11/12">
          {/* Left Section */}
          <div className="flex items-center justify-start">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="mr-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-2 text-white shadow-lg hover:shadow-xl lg:hidden"
            >
              <HiMenuAlt3 className="text-xl" />
            </button>

            {/* Logo */}
            <div className="group flex cursor-pointer items-center gap-2">
              <div className="hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-2 shadow-lg group-hover:shadow-xl lg:block">
                <FaGripfire className="text-lg text-white sm:text-xl xl:text-2xl" />
              </div>
              <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-sm font-bold text-transparent sm:text-lg xl:text-2xl">
                Learnio
              </h1>
            </div>
          </div>

          {/* Center Section - Desktop Navigation */}
          <div className="hidden lg:flex">
            <ul className="flex items-center space-x-2">
              {navigationLinks.map((link, index) => (
                <li key={link.to} className="group">
                  <NavigationLink {...link} index={index} />
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Auth Buttons */}
          <div className="flex items-center gap-1 lg:gap-3">
            {userEmail ? (
              <button
                ref={(el) => (authButtonsRef.current[0] = el)}
                onClick={handleLogout}
                className="rounded-xl border-2 border-red-500 px-4 py-2 font-bold text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg"
                onMouseEnter={(e) =>
                  handleButtonHover(e.currentTarget, true, "logout")
                }
                onMouseLeave={(e) =>
                  handleButtonHover(e.currentTarget, false, "logout")
                }
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/register">
                  <button
                    className="transform rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:text-sm lg:text-base"
                    ref={(el) => (authButtonsRef.current[0] = el)}
                    onMouseEnter={(e) =>
                      handleButtonHover(e.currentTarget, true)
                    }
                    onMouseLeave={(e) =>
                      handleButtonHover(e.currentTarget, false)
                    }
                  >
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    ref={(el) => (authButtonsRef.current[1] = el)}
                    className="transform rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:text-sm lg:text-base"
                    onMouseEnter={(e) =>
                      handleButtonHover(e.currentTarget, true)
                    }
                    onMouseLeave={(e) =>
                      handleButtonHover(e.currentTarget, false)
                    }
                  >
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        style={{ display: "none" }}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-2xl backdrop-blur-lg lg:hidden"
        style={{ display: "none" }}
      >
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-3">
                <FaGripfire className="text-2xl text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-2xl font-bold text-transparent">
                Learnio
              </h1>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="rounded-xl bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          <div className="space-y-2">
            {navigationLinks.map((link, index) => (
              <NavigationLink
                key={link.to}
                {...link}
                index={index}
                isMobile={true}
              />
            ))}

            <div className="my-6 space-y-3 border-t border-gray-200 pt-6">
              {userEmail ? (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl border-2 border-red-500 py-3 font-bold text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="block">
                    <button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 font-bold text-white shadow-lg transition-all duration-300">
                      Register
                    </button>
                  </Link>
                  <Link to="/login" className="block">
                    <button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 font-bold text-white shadow-lg transition-all duration-300">
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="sm:h-18 h-16 lg:h-20"></div>
    </div>
  );
};

export default Navbar;
