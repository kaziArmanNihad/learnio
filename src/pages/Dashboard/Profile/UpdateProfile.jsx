import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { setUser } from "../../../Redux/features/userSlice";
import { useUpdateUserProfileMutation } from "../../../Redux/features/api/usersApi";
import auth from "../../../Firebase/Firebase.Config";
import Loading from "../../../components/Loading/Loading";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { User, Camera, Save, X, ArrowLeft } from "lucide-react";

const UpdateProfile = () => {
  // States
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [imageError, setImageError] = useState(false);

  // Redux states
  const dispatch = useDispatch();
  const { userName, userPhoto, userEmail } = useSelector(
    (state) => state.userSlice,
  );

  // RTK query
  const [updateUserProfile, { isLoading, isError, error }] =
    useUpdateUserProfileMutation();

  // React Hook Form with validation
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
    // trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userName: userName || "",
      userPhoto: userPhoto || "",
    },
  });

  // Watch form values for preview
  const watchedPhoto = watch("userPhoto");
  const watchedName = watch("userName");

  // Update preview when photo URL changes
  useEffect(() => {
    if (watchedPhoto && watchedPhoto !== userPhoto) {
      setPreviewImage(watchedPhoto);
      setImageError(false);
    } else {
      setPreviewImage(userPhoto || "");
    }
  }, [watchedPhoto, userPhoto]);

  // Validation rules
  const validationRules = {
    userName: {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
      maxLength: {
        value: 50,
        message: "Name must not exceed 50 characters",
      },
      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: "Name can only contain letters and spaces",
      },
    },
    userPhoto: {
      pattern: {
        value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
        message: "Please enter a valid image URL (jpg, jpeg, png, gif, webp)",
      },
    },
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setImageError(false);
  };

  // Generate initials for fallback
  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2) || "U"
    );
  };

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (isError) {
    console.log("Error: ", error?.error);
    console.log("Error when updating the user profile: ", error?.data?.message);
    toast.error(
      error?.data?.message || "An error occurred while updating profile",
    );
  }

  // Handle form submission
  const onSubmit = async (data) => {
    const userInfo = {
      ...data,
      currentEmail: userEmail,
    };

    try {
      // Update Firebase Authentication Profile
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: data.userName,
          photoURL: data.userPhoto,
        });
      } else {
        throw new Error("No authenticated user.");
      }

      // Update the backend via API
      await updateUserProfile(userInfo).unwrap();

      // Dispatch updated profile to Redux
      dispatch(
        setUser({
          userName: data.userName,
          userPhoto: data.userPhoto,
          userEmail: userEmail,
        }),
      );

      // Navigate back
      navigate(-1);

      // Show success message
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error?.message || "Failed to update profile. Please try again.",
      );
    }
  };

  // Handle cancel
  const handleCancel = () => {
    reset({
      userName: userName || "",
      userPhoto: userPhoto || "",
    });
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 rounded-lg p-2 transition-all duration-200 hover:bg-white hover:bg-opacity-20"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h1 className="flex-1 text-center text-2xl font-bold">
              Update Profile
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>

        <div className="p-8">
          {/* Preview Section */}
          <div className="mb-8 flex justify-center">
            <div className="group relative">
              {imageError || !previewImage ? (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-200 bg-gradient-to-br from-gray-300 to-gray-400 shadow-lg">
                  <span className="text-3xl font-bold text-gray-600">
                    {getInitials(watchedName || userName)}
                  </span>
                </div>
              ) : (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="h-32 w-32 rounded-full border-4 border-gray-200 object-cover shadow-lg"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              )}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="userName"
                className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
              >
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </label>
              <input
                id="userName"
                type="text"
                placeholder="Enter your full name"
                className={`w-full rounded-xl border-2 p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.userName
                    ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-400"
                }`}
                {...register("userName", validationRules.userName)}
              />
              {errors.userName && (
                <p className="flex items-center space-x-1 text-sm text-red-500">
                  <X className="h-4 w-4" />
                  <span>{errors.userName.message}</span>
                </p>
              )}
            </div>

            {/* Photo URL Field */}
            <div className="space-y-2">
              <label
                htmlFor="userPhoto"
                className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
              >
                <Camera className="h-4 w-4" />
                <span>Profile Photo URL</span>
              </label>
              <input
                id="userPhoto"
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                className={`w-full rounded-xl border-2 p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.userPhoto
                    ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-400"
                }`}
                {...register("userPhoto", validationRules.userPhoto)}
              />
              {errors.userPhoto && (
                <p className="flex items-center space-x-1 text-sm text-red-500">
                  <X className="h-4 w-4" />
                  <span>{errors.userPhoto.message}</span>
                </p>
              )}
              <p className="text-xs text-gray-500">
                Supported formats: JPG, JPEG, PNG, GIF, WebP
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <button
                type="button"
                onClick={handleCancel}
                className="flex flex-1 transform items-center justify-center space-x-2 rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:scale-105 hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
                <span>Cancel</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!isDirty || !isValid || isLoading}
                className={`flex flex-1 transform items-center justify-center space-x-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 ${
                  !isDirty || !isValid || isLoading
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg"
                }`}
              >
                <Save className="h-5 w-5" />
                <span>{isLoading ? "Updating..." : "Update Profile"}</span>
              </button>
            </div>

            {/* Form Status */}
            {isDirty && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-800">
                  You have unsaved changes. Make sure to save your updates
                  before leaving.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
