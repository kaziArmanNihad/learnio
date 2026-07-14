import baseApi from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),
    postPayments: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payments",
        method: "POST",
        body: paymentInfo,
      }),
      invalidatesTags: ["Payments"],
    }),
    deletePayments: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
    // Payment intent api
    postPaymentIntent: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payments/create-payment-intent",
        method: "POST",
        body: paymentInfo,
      }),
      invalidatesTags: ["Enrollments", "Payments"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  usePostPaymentsMutation,
  useDeletePaymentsMutation,
  usePostPaymentIntentMutation,
} = paymentApi;
