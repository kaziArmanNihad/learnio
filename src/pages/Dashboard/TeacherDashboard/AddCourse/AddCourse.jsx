import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAddCourseMutation } from "../../../../Redux/features/api/coursesApi";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { FaUserTie, FaBookOpen, FaImage } from "react-icons/fa";

// Small red asterisk so required fields are marked before a person hits
// submit, instead of only surfacing via a validation error afterward.
const Required = () => <span className="text-red-500">*</span>;

const SectionHeader = ({ icon, title }) => (
  <div className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
    <span className="text-orange-500">{icon}</span>
    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700">
      {title}
    </h2>
  </div>
);

const AddCourse = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [addCourse] = useAddCourseMutation();
  const { userName, userEmail } = useSelector((state) => state.userSlice);

  const onSubmit = (data) => {
    const courseInfo = {
      ...data,
      coursePrice: Number(data.coursePrice),
      courseStudentsCount: Number(data.courseStudentsCount),
      courseStatus: "pending",
    };

    addCourse(courseInfo)
      .unwrap()
      .then(() => {
        toast.success("✅ Course added successfully!");
        reset();
      })
      .catch((error) => {
        console.error("Failed to add course:", error);
        toast.error(error?.data?.message || "Failed to add course.");
      });
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 shadow-inner transition-colors duration-200 focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-200";
  const readOnlyClass =
    "w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 shadow-inner focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-200";
  const labelClass = "mb-2 block text-sm font-semibold text-gray-800";
  const errorClass = "mt-2 text-sm font-medium text-red-500";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-orange-50/20 p-6 sm:p-2">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/10 to-transparent blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-purple-400/10 to-transparent blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Add{" "}
            <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              Course
            </span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            🧑‍🏫 Fill in the details below to create a new course.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl border border-gray-300 bg-white/90 p-6 backdrop-blur-sm sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Instructor */}
            <div>
              <SectionHeader icon={<FaUserTie />} title="Instructor" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Teacher Name</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={userName}
                    {...register("courseTeacherName")}
                    className={readOnlyClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Teacher Email</label>
                  <input
                    type="email"
                    readOnly
                    defaultValue={userEmail}
                    {...register("courseTeacherEmail")}
                    className={readOnlyClass}
                  />
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div>
              <SectionHeader icon={<FaBookOpen />} title="Course Details" />
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Course Title <Required />
                    </label>
                    <input
                      type="text"
                      {...register("courseTitle", {
                        required: "Course title is required",
                        maxLength: { value: 22, message: "Max 22 characters" },
                        minLength: { value: 4, message: "Min 4 characters" },
                      })}
                      className={inputClass}
                    />
                    {errors.courseTitle && (
                      <p className={errorClass}>{errors.courseTitle.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      Course Price ($) <Required />
                    </label>
                    <input
                      type="number"
                      {...register("coursePrice", {
                        required: "Price is required",
                        max: { value: 500, message: "Must be ≤ 500" },
                        min: { value: 10, message: "Must be ≥ 10" },
                      })}
                      className={inputClass}
                    />
                    {errors.coursePrice && (
                      <p className={errorClass}>{errors.coursePrice.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Category</label>
                    <select
                      {...register("category")}
                      className={`${inputClass} bg-white`}
                    >
                      <option value="web-development">Web Development</option>
                      <option value="app-development">App Development</option>
                      <option value="game-development">Game Development</option>
                      <option value="uiux-designer">UI/UX Designer</option>
                      {/* Matches the "mechine-learning" id used in the course
                          library's category filter — see note above the form. */}
                      <option value="mechine-learning">Machine Learning</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Student Count</label>
                    <input
                      type="number"
                      readOnly
                      defaultValue={0}
                      {...register("courseStudentsCount")}
                      className={readOnlyClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Media & Description */}
            <div>
              <SectionHeader icon={<FaImage />} title="Media & Description" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Course Image URL <Required />
                  </label>
                  <input
                    type="text"
                    {...register("courseImage", {
                      required: "Course image URL is required",
                    })}
                    className={inputClass}
                  />
                  {errors.courseImage && (
                    <p className={errorClass}>{errors.courseImage.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Description <Required />
                  </label>
                  <input
                    type="text"
                    {...register("courseDescription", {
                      required: "Description is required",
                      maxLength: { value: 300, message: "Max 300 characters" },
                      minLength: { value: 10, message: "Min 10 characters" },
                    })}
                    className={inputClass}
                  />
                  {errors.courseDescription && (
                    <p className={errorClass}>
                      {errors.courseDescription.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons — clear primary/secondary hierarchy instead of two
                equally-loud gradient buttons */}
            <div className="flex flex-col-reverse gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => reset()}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-600 transition-colors duration-300 hover:border-red-400 hover:text-red-500 sm:w-auto"
              >
                Clear Form
              </button>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-purple-500 px-8 py-4 text-base font-bold text-white shadow-xl transition-transform duration-300 hover:scale-105 sm:w-auto"
              >
                <HiSparkles className="text-xl" />
                Upload Course
                <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
