import { useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import Loading from "../../../../components/Loading/Loading";

import {
  useGetCoursesQuery,
  useUpdateActiveCourseMutation,
  useUpdateRejectCourseMutation,
} from "../../../../Redux/features/api/coursesApi";

import { FaRegCheckCircle, FaHistory, FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { HiCurrencyDollar, HiSparkles } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

const PendingCourseReview = () => {
  const navigate = useNavigate();

  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCoursesQuery();
  const [UpdateActiveCourse] = useUpdateActiveCourseMutation();
  const [UpdateRejectCourse] = useUpdateRejectCourseMutation();

  const pendingCourses = useMemo(
    () => courses?.filter((course) => course.courseStatus === "pending") || [],
    [courses],
  );

  const handleAccept = useCallback(
    (id, title) => {
      Swal.fire({
        title: "Approve Course?",
        text: `Are you sure you want to activate the course: "${title}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Activate",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "rounded-2xl",
          title: "text-xl font-bold",
          content: "text-gray-600",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          UpdateActiveCourse(id)
            .unwrap()
            .then(() => {
              toast.success(`✅ Course "${title}" is now active!`);
            })
            .catch((err) => {
              console.error("Failed to accept course: ", err);
              toast.error(
                err?.data?.message || err?.error || "Failed to activate course",
              );
            });
        }
      });
    },
    [UpdateActiveCourse],
  );

  const handleReject = useCallback(
    (id, title) => {
      Swal.fire({
        title: "Reject Course?",
        text: `Are you sure you want to reject the course: "${title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Reject",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "rounded-2xl",
          title: "text-xl font-bold",
          content: "text-gray-600",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          UpdateRejectCourse(id)
            .unwrap()
            .then(() => {
              toast.success(`❌ Course "${title}" has been rejected.`);
            })
            .catch((err) => {
              console.error("Failed to reject course: ", err);
              toast.error(
                err?.data?.message || err?.error || "Failed to reject course",
              );
            });
        }
      });
    },
    [UpdateRejectCourse],
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error(
      "Error while fetching the courses data from the database : ",
      error,
    );
    toast.error(
      error?.data?.message ||
        error?.error ||
        "Failed to load pending courses data",
    );

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-yellow-50/20 p-4">
        <div className="max-w-lg rounded-2xl border border-gray-300 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading Pending Courses
          </h2>
          <p className="mb-6 text-gray-600">
            A problem occurred while fetching pending courses. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-amber-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-amber-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (pendingCourses.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-yellow-50/20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-yellow-400/10 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-6 shadow-2xl">
              <FaHistory className="text-4xl text-white" />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Pending Courses Found
            </h1>

            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              There are currently no course submissions waiting for review.
            </p>

            <div className="space-y-4">
              <Link to="/dashboard/courseReview">
                <button className="group w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-transform duration-300 hover:scale-105 sm:w-auto sm:text-lg">
                  <span className="flex items-center justify-center gap-3">
                    <HiSparkles className="text-xl" />
                    Review Other Courses
                    <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-yellow-50/20 p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-yellow-400/10 to-transparent blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Pending{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Courses
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            ⚠️ Courses awaiting review and activation. Total:{" "}
            <span className="font-bold text-yellow-600">
              {pendingCourses.length}
            </span>
          </p>
        </div>

        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h3 className="text-xl font-bold text-gray-700">
            Courses to Review: {pendingCourses.length}
          </h3>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="group rounded-2xl border-2 border-gray-300 px-6 py-3 text-base font-bold text-gray-700 transition-colors duration-300 hover:border-gray-400 hover:bg-gray-50 sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <BsArrowRight className="rotate-180 text-lg transition-transform duration-300 group-hover:-translate-x-1" />
              Go Back to Review Hub
            </span>
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white/90 shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider"
                  >
                    SL
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider"
                  >
                    Course Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider"
                  >
                    Teacher Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingCourses.map((course, index) => (
                  <tr
                    key={course._id}
                    className="transition-colors duration-200 hover:bg-yellow-50/50"
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-12 w-16 flex-shrink-0">
                        <img
                          src={course.courseImage}
                          alt={course.courseTitle}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="max-w-xs truncate text-sm font-medium text-gray-900">
                        {course.courseTitle}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-base font-bold text-green-600">
                        <HiCurrencyDollar className="text-sm" />
                        {parseFloat(course.coursePrice).toFixed(2)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center">
                        <FaUser className="mr-2 text-xs text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {course.courseTeacherName}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() =>
                            handleAccept(course._id, course.courseTitle)
                          }
                          type="button"
                          className="rounded-full bg-green-500 p-3 text-white shadow-sm transition-transform duration-300 hover:scale-110 hover:bg-green-600"
                          title="Approve Course"
                        >
                          <FaRegCheckCircle className="text-base" />
                        </button>
                        <button
                          onClick={() =>
                            handleReject(course._id, course.courseTitle)
                          }
                          type="button"
                          className="rounded-full bg-red-500 p-3 text-white shadow-sm transition-transform duration-300 hover:scale-110 hover:bg-red-600"
                          title="Reject Course"
                        >
                          <IoMdCloseCircle className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingCourseReview;
