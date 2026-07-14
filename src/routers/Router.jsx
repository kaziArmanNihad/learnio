import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AllCourses from "../pages/AllCourses/AllCourses";
import CourseDetails from "../pages/AllCourses/CourseDetails";
import TeacherEnrollment from "../pages/TeacherEnrollment/TeacherEnrollment";
import Register from "../pages/Authintication/Register/Register";
import Login from "../pages/Authintication/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import Interface from "../pages/Dashboard/Interface";
import StudentEnrollments from "../pages/Dashboard/StudentDashboard/StudentEnrollment/StudentEnrollments";
import Payment from "../pages/Dashboard/StudentDashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/StudentDashboard/PaymentHistory/PaymentHistory";
import AddCourse from "../pages/Dashboard/TeacherDashboard/AddCourse/AddCourse";
import Profile from "../pages/Dashboard/Profile/Profile";
import UpdateProfile from "../pages/Dashboard/Profile/UpdateProfile";
import TeacherCourses from "../pages/Dashboard/TeacherDashboard/TeacherCourses/TeacherCourses";
import ReviewEnrollments from "../pages/Dashboard/TeacherDashboard/ReviewEnrollments/ReviewEnrollments";
import NotFound from "../pages/NotFound/NotFound";
import AdminAnalytics from "../pages/Dashboard/AdminDashboard/AdminAnalytics/AdminAnalytics";
import TeacherRequiests from "../pages/Dashboard/AdminDashboard/TeacherRequiests/TeacherRequiests";
import CourseReview from "../pages/Dashboard/AdminDashboard/CourseReview/CourseReview";

import ActiveCourseReview from "../pages/Dashboard/AdminDashboard/CourseReview/ActiveCourseReview";
import RejectCourseReview from "../pages/Dashboard/AdminDashboard/CourseReview/RejectCourseReview";
import Users from "../pages/Dashboard/AdminDashboard/Users/Users";
import Contact from "../pages/Contact/Contact";
import PendingCourseReview from "../pages/Dashboard/AdminDashboard/CourseReview/PenddingCourseReview";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <AllCourses />,
      },
      {
        path: "/courses/:id",
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/teacher",
        element: (
          <PrivateRoute>
            <TeacherEnrollment />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/interface",
        element: (
          <PrivateRoute>
            <Interface />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: "/dashboard/analytics",
        element: <AdminAnalytics />,
      },
      {
        path: "/dashboard/teacherRequiests",
        element: (
          <PrivateRoute>
            <TeacherRequiests />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/courseReview",
        element: (
          <PrivateRoute>
            <CourseReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/courseReview/pending",
        element: (
          <PrivateRoute>
            <PendingCourseReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/courseReview/active",
        element: (
          <PrivateRoute>
            <ActiveCourseReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/courseReview/reject",
        element: (
          <PrivateRoute>
            <RejectCourseReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      // teacher routes
      {
        path: "/dashboard/addCourse",
        element: (
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/teacherCourses",
        element: (
          <PrivateRoute>
            <TeacherCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/ReviewEnrollments",
        element: (
          <PrivateRoute>
            <ReviewEnrollments />
          </PrivateRoute>
        ),
      },
      // student routes
      {
        path: "/dashboard/studentEnrollments",
        element: (
          <PrivateRoute>
            <StudentEnrollments />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/studentPaymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
