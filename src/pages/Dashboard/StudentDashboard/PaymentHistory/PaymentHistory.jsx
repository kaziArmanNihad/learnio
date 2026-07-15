import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  useDeletePaymentsMutation,
  useGetPaymentsQuery,
} from "../../../../Redux/features/api/paymentApi";
import Loading from "../../../../components/Loading/Loading";
import { FaRegTrashAlt, FaHistory, FaSearch, FaUser } from "react-icons/fa";
import { HiCurrencyDollar, HiSparkles } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom"; // Correct import for Link
import toast from "react-hot-toast";

const PaymentHistory = () => {
  // Redux state
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  // RTK Query hooks
  const { data, isLoading, isError, error, refetch } = useGetPaymentsQuery();
  const [deletePayments] = useDeletePaymentsMutation();

  // Filter payments only for the current user
  const payments = useMemo(
    () =>
      data?.filter(
        (paymentHistory) => paymentHistory.userEmail === userEmail,
      ) || [],
    [data, userEmail],
  );

  // Handle delete (using useCallback for memoization and stability)
  const handleDelete = useCallback(
    (id, courseTitle) => {
      Swal.fire({
        title: "Delete History?",
        text: `Are you sure you want to delete the payment history for "${courseTitle}"? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444", // Red 500
        cancelButtonColor: "#6b7280", // Gray 500
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "rounded-2xl",
          title: "text-xl font-bold",
          content: "text-gray-600",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          deletePayments(id)
            .unwrap()
            .then(() => {
              toast.success("🗑️ Payment history deleted successfully!");
            })
            .catch((err) => {
              console.error("Failed to delete payment history: ", err);
              // ⚠️ FIX: Add safe fallback message for toast
              toast.error(
                err?.data?.message ||
                  err?.error ||
                  "Failed to delete payment history",
              );
            });
        }
      });
    },
    [deletePayments],
  );

  // Handle loading
  if (isLoading) {
    return <Loading />;
  }

  // Handle error
  if (isError) {
    console.error("Error in fetching data from getPaymentquery: ", error);
    // ⚠️ FIX: Add safe fallback message for toast
    toast.error(
      error?.data?.message || error?.error || "Failed to load payment history",
    );

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-lg rounded-2xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading History
          </h2>
          <p className="mb-6 text-gray-600">
            A problem occurred while fetching your payment history. Please try
            again.
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

  // Handle empty enrollments (Improved UI)
  if (payments.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
        {/* Background Elements */}
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-cyan-400/5 blur-3xl" />

        <div className="relative z-10 mx-auto w-11/12 max-w-lg">
          <div className="rounded-3xl border border-gray-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
            {/* Empty Icon */}
            <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-sky-500 p-6 shadow-2xl">
              <FaHistory className="text-4xl text-white" />
            </div>

            {/* Title */}
            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
              No Payments Recorded
            </h1>

            {/* Message */}
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
              Hello {userName}! You don&#39;t have any payment history yet. This
              is where you&#39;ll see successful course transactions.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link to="/courses">
                <button className="group w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:w-auto sm:text-lg">
                  <span className="flex items-center justify-center gap-3">
                    <HiSparkles className="text-xl" />
                    Find New Courses
                    <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>

              <Link to="/dashboard/interface">
                <button className="group w-full rounded-2xl border-2 border-gray-300 px-8 py-4 text-base font-bold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 sm:w-auto sm:text-lg">
                  <span className="flex items-center justify-center gap-3">
                    <FaSearch className="text-xl" />
                    Go to Dashboard
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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-4 sm:p-6 lg:p-8">
      {/* Background Elements */}
      <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-blue-400/5 to-sky-400/5 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Payment{" "}
            <span className="bg-orange-500 bg-clip-text text-transparent">
              History
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            🧾 A complete record of your successful course payments.
          </p>
        </div>

        {/* Table Container (Modern Styling) */}
        <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white/90 shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-500 to-purple-500 text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    SL
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="transition-colors duration-200 hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="max-w-xs truncate text-sm font-medium text-gray-900">
                        {payment.courseTitle}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center">
                        <FaUser className="mr-2 text-xs text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {payment.courseTeacherName}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-base font-bold text-green-600">
                        <HiCurrencyDollar className="text-sm" />
                        {parseFloat(payment.coursePrice).toFixed(2)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="font-mono text-sm tracking-wider text-gray-600">
                        {payment.transectionId}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <button
                        onClick={() =>
                          handleDelete(payment._id, payment.courseTitle)
                        }
                        type="button"
                        className="rounded-full bg-red-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-600"
                        title="Delete History"
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

export default PaymentHistory;
