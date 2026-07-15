import { signOut } from "firebase/auth";
import { CgLogOut, CgProfile } from "react-icons/cg";
import {
  FaChalkboardTeacher,
  FaGripfire,
  FaHome,
  FaRegCreditCard,
  FaUsers,
} from "react-icons/fa";
import { SiCoursera, SiGoogleclassroom } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/features/userSlice";
import { MdAnalytics, MdDashboard, MdPreview } from "react-icons/md";
import auth from "../Firebase/Firebase.Config";
import { HiArchiveBox, HiArchiveBoxArrowDown } from "react-icons/hi2";
import Loading from "../components/Loading/Loading";
import { VscOpenPreview } from "react-icons/vsc";
import { useGetUsersQuery } from "../Redux/features/api/usersApi";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for animations. Desktop and mobile each get their own logo + menu
  // item refs — sharing one ref/array between two simultaneously-rendered
  // trees (both exist in the DOM at once; Tailwind's lg: classes just hide
  // one with CSS) means the second one to render silently overwrites the
  // first, so only one side ever animates.
  const sidebarRef = useRef(null);
  const desktopLogoRef = useRef(null);
  const mobileLogoRef = useRef(null);
  const desktopMenuItemsRef = useRef([]);
  const mobileMenuItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  const { userEmail } = useSelector((state) => state.userSlice);
  const { data, isLoading, isError, error } = useGetUsersQuery();

  // Reset every render so neither array carries a stale/null entry into
  // GSAP (avoids the "reading '_gsap' of null" crash).
  desktopMenuItemsRef.current = [];
  mobileMenuItemsRef.current = [];

  useEffect(() => {
    if (!data || isLoading || isError) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const desktopItems = desktopMenuItemsRef.current.filter(Boolean);
    const mobileItems = mobileMenuItemsRef.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(
        [
          desktopLogoRef.current,
          mobileLogoRef.current,
          sidebarRef.current,
          ...desktopItems,
          ...mobileItems,
        ],
        { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        [desktopLogoRef.current, mobileLogoRef.current],
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
      );

      tl.fromTo(
        sidebarRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      );

      tl.fromTo(
        desktopItems,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3",
      );

      // Subtle float on the desktop logo only — the mobile one sits in a
      // slim sticky header where a bob reads as jittery rather than lively.
      gsap.to(desktopLogoRef.current, {
        y: -8,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Interruption-safe hover for every menu item (desktop + mobile)
      [...desktopItems, ...mobileItems].forEach((item) => {
        const xTo = gsap.quickTo(item, "x", {
          duration: 0.3,
          ease: "power2.out",
        });
        item.addEventListener("mouseenter", () => xTo(8));
        item.addEventListener("mouseleave", () => xTo(0));
      });
    }, sidebarRef);

    return () => ctx.revert();
  }, [data, isLoading, isError]);

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);

      gsap.set(mobileMenuRef.current, { display: "block" });
      gsap.set(overlayRef.current, { display: "block" });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }).fromTo(
        mobileMenuRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.2",
      );
    } else {
      const tl = gsap.timeline();
      tl.to(mobileMenuRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      })
        .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2")
        .set([mobileMenuRef.current, overlayRef.current], { display: "none" });

      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    const tl = gsap.timeline();

    tl.to(sidebarRef.current, {
      x: -300,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    });

    tl.call(() => {
      signOut(auth);
      dispatch(logoutUser());
      navigate("/");
      toast.success("Logout Successfully");
    });
  };

  const getMenuItems = (user) => {
    if (user === "admin") {
      return [
        { to: "/dashboard/interface", icon: MdDashboard, label: "Interface" },
        { to: "/dashboard/analytics", icon: MdAnalytics, label: "Analytics" },
        { to: "/dashboard/profile", icon: CgProfile, label: "Profile" },
        {
          to: "/dashboard/teacherRequiests",
          icon: FaChalkboardTeacher,
          label: "Teacher Requests",
        },
        {
          to: "/dashboard/courseReview",
          icon: VscOpenPreview,
          label: "Course Review",
        },
        { to: "/dashboard/users", icon: FaUsers, label: "Users" },
      ];
    } else if (user === "teacher") {
      return [
        { to: "/dashboard/interface", icon: MdDashboard, label: "Interface" },
        { to: "/dashboard/profile", icon: CgProfile, label: "Profile" },
        {
          to: "/dashboard/addCourse",
          icon: HiArchiveBoxArrowDown,
          label: "Add Course",
        },
        {
          to: "/dashboard/teacherCourses",
          icon: HiArchiveBox,
          label: "My Courses",
        },
        {
          to: "/dashboard/ReviewEnrollments",
          icon: MdPreview,
          label: "Review Enrollments",
        },
      ];
    } else {
      return [
        { to: "/dashboard/interface", icon: MdDashboard, label: "Interface" },
        { to: "/dashboard/profile", icon: CgProfile, label: "Profile" },
        {
          to: "/dashboard/studentEnrollments",
          icon: SiGoogleclassroom,
          label: "My Enrollments",
        },
        {
          to: "/dashboard/studentPaymentHistory",
          icon: FaRegCreditCard,
          label: "Payment History",
        },
      ];
    }
  };

  const commonMenuItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/courses", icon: SiCoursera, label: "All Courses" },
  ];

  // isMobile picks which ref array this instance registers into, so the
  // two simultaneously-mounted menus never collide.
  const MenuItem = ({ to, icon: Icon, label, index, isMobile = false }) => (
    <NavLink
      ref={(el) => {
        if (!el) return;
        if (isMobile) mobileMenuItemsRef.current[index] = el;
        else desktopMenuItemsRef.current[index] = el;
      }}
      to={to}
      className={({ isActive }) =>
        `group relative flex transform items-center gap-4 rounded-2xl p-4 transition-colors duration-300 will-change-transform ${
          isActive
            ? "bg-orange-500 text-white shadow-lg"
            : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
        } ${isMobile ? "mb-2" : "mb-3"}`
      }
    >
      <Icon className={`text-xl ${isMobile ? "text-lg" : ""}`} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log("Error When fetching user data: ", error.error);
    toast.error("Error When fetching user data");
    return null;
  }

  const userInfo = data?.find(
    (user) => user.userEmail.toLowerCase() === userEmail.toLowerCase(),
  );
  const user = userInfo?.userRole;
  const menuItems = getMenuItems(user);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleMobileMenu}
            className="rounded-xl bg-orange-500 p-2 text-white shadow-sm transition-colors duration-300 hover:bg-orange-600"
          >
            <HiMenuAlt3 className="text-xl" />
          </button>
          <div ref={mobileLogoRef} className="flex items-center gap-2">
            <div className="rounded-xl bg-orange-500 p-2">
              <FaGripfire className="text-xl text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Learnio</h1>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        style={{ display: "none" }}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Sidebar */}
      <div
        ref={mobileMenuRef}
        className="fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto bg-white shadow-2xl lg:hidden"
        style={{ display: "none" }}
      >
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-orange-500 p-3">
                <FaGripfire className="text-2xl text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Learnio</h1>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="rounded-xl bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <MenuItem key={item.to} {...item} index={index} isMobile={true} />
            ))}

            <div className="my-6 border-t border-gray-200 pt-6">
              {commonMenuItems.map((item, index) => (
                <MenuItem
                  key={item.to}
                  {...item}
                  index={index + menuItems.length}
                  isMobile={true}
                />
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-4 rounded-2xl p-4 font-medium text-red-600 transition-colors duration-300 hover:bg-red-50"
            >
              <CgLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        ref={sidebarRef}
        className="z-40 hidden h-screen w-80 border-r border-gray-300 bg-white shadow-sm lg:fixed lg:left-0 lg:top-0 lg:block"
      >
        <div className="h-full overflow-y-auto p-8">
          {/* Logo Section */}
          <div className="mb-12 flex items-center justify-center gap-3">
            <div
              ref={desktopLogoRef}
              className="rounded-xl bg-orange-500 p-3 shadow-sm"
            >
              <FaGripfire className="text-2xl text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Learnio</h1>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <MenuItem key={item.to} {...item} index={index} />
            ))}

            <div className="my-8 border-t border-gray-300 pt-4">
              {commonMenuItems.map((item, index) => (
                <MenuItem
                  key={item.to}
                  {...item}
                  index={index + menuItems.length}
                />
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-4 rounded-2xl p-4 font-medium text-red-600 transition-colors duration-300 hover:bg-red-50"
            >
              <CgLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-80">
        <div className="min-h-screen overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
