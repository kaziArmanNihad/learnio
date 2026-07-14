import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Loading";
import {
  useGetEnrollmentsQuery,
  useUpdateActiveEnrollmentsMutation,
  useUpdateRejectEnrollmentsMutation,
} from "../../../../Redux/features/api/enrollmentsApi";
import { useMemo } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdAttachMoney, MdOutlineMoneyOff } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { HiSparkles } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewEnrollments = () => {
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK Query Hooks
  const { data, isLoading, isError, error, refetch } = useGetEnrollmentsQuery();
  const [updateActiveEnrollments] = useUpdateActiveEnrollmentsMutation();
  const [updateRejectEnrollments] = useUpdateRejectEnrollmentsMutation();

  // Filter enrollments for current teacher
  const enrollments = useMemo(
    () =>
      data?.filter(
        (enrollment) => enrollment.courseTeacherEmail === userEmail,
      ) || [],
    [data, userEmail],
  );

  // Loading
  if (isLoading) return <Loading />;

  // Error handling
  if (isError) {
    console.error("Error fetching enrollments:", error);
    toast.error("Failed to load enrollments.");
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
        <div className="rounded-2xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading Enrollments
          </h2>
          <p className="mb-6 text-gray-600">
            Something went wrong while fetching enrollments.
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
  if (enrollments.length === 0) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl" />
        <div className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-sky-500 p-6 shadow-2xl">
              <HiSparkles className="text-4xl text-white" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Enrollments Yet
            </h1>
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              {userName}, you currently have no enrollments to review.
            </p>
            <Link to="/dashboard/interface">
              <button className="group w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:w-auto sm:text-lg">
                <span className="flex items-center justify-center gap-3">
                  Go to Interface
                  <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handlers
  const handleActive = (id) => {
    updateActiveEnrollments(id)
      .unwrap()
      .then(() => toast.success("Enrollment activated successfully!"))
      .catch((err) => toast.error(err?.data?.message || "Action failed."));
  };

  const handleReject = (id) => {
    updateRejectEnrollments(id)
      .unwrap()
      .then(() => toast.success("Enrollment rejected successfully!"))
      .catch((err) => toast.error(err?.data?.message || "Action failed."));
  };

  // Main UI
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-4 sm:p-6 lg:p-8">
      {/* Background Effects */}
      <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Review{" "}
            <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              Enrollments
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            📋 Approve or reject enrollment requests for your courses.
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
                    Course
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Price ($)
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {enrollments.map((enrollment, index) => (
                  <tr
                    key={enrollment._id}
                    className="transition-colors duration-200 hover:bg-blue-50/50"
                  >
                    <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                      {index + 1}
                    </td>

                    <td className="flex items-center gap-3 px-4 py-4">
                      <div className="h-14 w-20 overflow-hidden rounded-xl ring-2 ring-blue-300 ring-offset-2">
                        <img
                          src={enrollment.courseImage}
                          alt={enrollment.courseTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {enrollment.courseTitle}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">
                      ${enrollment.coursePrice}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">
                      {enrollment.userName}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">
                      {enrollment.userEmail}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {enrollment.paymentStatus === "unpaid" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase text-orange-700 shadow-md">
                          Unpaid <MdOutlineMoneyOff className="text-sm" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold uppercase text-green-700 shadow-md">
                          Paid <MdAttachMoney className="text-sm" />
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {enrollment.enrollmentStatus === "pending" ? (
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleActive(enrollment._id)}
                            title="Approve"
                            className="rounded-full bg-green-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
                          >
                            <FaRegCheckCircle className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleReject(enrollment._id)}
                            title="Reject"
                            className="rounded-full bg-red-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-600"
                          >
                            <IoMdCloseCircle className="text-sm" />
                          </button>
                        </div>
                      ) : enrollment.enrollmentStatus === "active" ? (
                        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase text-blue-700 shadow-md">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-bold uppercase text-red-700 shadow-md">
                          Rejected
                        </span>
                      )}
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

export default ReviewEnrollments;
