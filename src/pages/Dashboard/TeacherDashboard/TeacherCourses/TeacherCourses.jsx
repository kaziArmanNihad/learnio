import { useSelector } from "react-redux";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../../../Redux/features/api/coursesApi";
import Loading from "../../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";

const TeacherCourses = () => {
  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK Query
  const { data, isLoading, isError, error, refetch } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

  // Filter courses belonging to the logged-in teacher
  const courses = useMemo(
    () =>
      data?.filter((course) => course.courseTeacherEmail === userEmail) || [],
    [data, userEmail],
  );

  // Loading state
  if (isLoading) return <Loading />;

  // Error handling
  if (isError) {
    console.error("Error fetching courses:", error);
    toast.error(error?.data?.message || "Failed to load courses");
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-2xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading Courses
          </h2>
          <p className="mb-6 text-gray-600">
            A problem occurred while fetching your courses. Please try again.
          </p>
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

  // Empty state
  if (courses.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
        {/* Background effects */}
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl" />

        <div className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-sky-500 p-6 shadow-2xl">
              <HiSparkles className="text-4xl text-white" />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Courses Yet!
            </h1>
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              {userName}, you haven’t added any courses yet.
            </p>

            <div className="space-y-4">
              <Link to="/dashboard/addCourse">
                <button className="group w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:w-auto sm:text-lg">
                  <span className="flex items-center justify-center gap-3">
                    <HiSparkles className="text-xl" />
                    Add Your First Course
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

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This course will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(id)
          .unwrap()
          .then(() => {
            toast.success("Course deleted successfully!");
          })
          .catch((err) => {
            console.error("Delete Error:", err);
            toast.error(err?.data?.message || "Failed to delete course.");
          });
      }
    });
  };

  // Main content
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-4 sm:p-6 lg:p-8">
      {/* Background effects */}
      <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              Courses
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            📚 Manage your uploaded courses and track their status.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white/90 shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Price ($)
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {courses.map((course, index) => (
                  <tr
                    key={course._id}
                    className="transition-colors duration-200 hover:bg-blue-50/50"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-gray-800">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4">
                      <div className="h-14 w-24 overflow-hidden rounded-xl ring-2 ring-blue-300 ring-offset-2">
                        <img
                          src={course.courseImage}
                          alt={course.courseTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="block max-w-xs truncate text-sm font-medium uppercase text-gray-800">
                        {course.courseTitle}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                      ${course.coursePrice}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                      {course.courseStudentsCount}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      {course.courseStatus === "pending" ? (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-bold uppercase text-yellow-700 shadow-md">
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold uppercase text-green-700 shadow-md">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(course._id)}
                        type="button"
                        className="rounded-full bg-red-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-600"
                        title="Delete Course"
                      >
                        <FaRegTrashAlt className="text-sm" />
                      </button>
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

export default TeacherCourses;
