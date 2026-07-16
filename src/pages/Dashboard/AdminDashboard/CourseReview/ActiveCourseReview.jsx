import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loading from "../../../../components/Loading/Loading";
import { useGetCoursesQuery } from "../../../../Redux/features/api/coursesApi";

import { FaSearch, FaUser, FaRegCheckCircle } from "react-icons/fa";
import { HiCurrencyDollar, HiSparkles } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

const ActiveCourseReview = () => {
  const navigate = useNavigate();

  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCoursesQuery();

  const activeCourses = useMemo(
    () => courses?.filter((course) => course.courseStatus === "active") || [],
    [courses],
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
        "Failed to load active courses data",
    );

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-green-50/20 p-4">
        <div className="max-w-lg rounded-2xl border border-gray-300 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading Active Courses
          </h2>
          <p className="mb-6 text-gray-600">
            A problem occurred while fetching active courses. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-green-500 px-6 py-3 text-white transition-colors duration-300 hover:bg-green-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (activeCourses.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-green-50/20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-green-400/10 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-6 shadow-2xl">
              <FaSearch className="text-4xl text-white" />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Active Courses Found
            </h1>

            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              There are currently no approved courses in the system.
            </p>

            <div className="space-y-4">
              <Link to="/dashboard/courseReview">
                <button className="group w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-transform duration-300 hover:scale-105 sm:w-auto sm:text-lg">
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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-green-50/20 p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-green-400/10 to-transparent blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Active{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Courses
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            ✅ All approved and currently running courses. Total:{" "}
            <span className="font-bold text-green-600">
              {activeCourses.length}
            </span>
          </p>
        </div>

        {/* Navigation/Action Row */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h3 className="text-xl font-bold text-gray-700">
            Active Courses: {activeCourses.length}
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

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white/90 shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeCourses.map((course, index) => (
                  <tr
                    key={course._id}
                    className="transition-colors duration-200 hover:bg-green-50/50"
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
                      <div className="flex items-center justify-center">
                        <span className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 text-xs font-bold uppercase text-white shadow-sm">
                          <FaRegCheckCircle className="text-sm" />
                          Active
                        </span>
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

export default ActiveCourseReview;
