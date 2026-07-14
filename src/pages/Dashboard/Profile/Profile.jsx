import { useSelector } from "react-redux";
import { Link } from "react-router";
import { User, Mail, Edit3, Camera } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  // States
  const { userName, userEmail, userPhoto } = useSelector(
    (state) => state.userSlice,
  );

  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 p-4">
      <div className="hover:shadow-3xl w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300">
        {/* Header Section with Background Pattern */}
        <div className="relative h-32 overflow-hidden bg-gradient-to-r from-blue-500 to-sky-500">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white bg-opacity-10"></div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white bg-opacity-10"></div>
        </div>

        {/* Profile Image Section */}
        <div className="relative -mt-16 mb-6 flex justify-center">
          <div className="group relative">
            {imageError || !userPhoto ? (
              // Fallback Avatar
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-gray-300 to-gray-400 shadow-lg">
                <span className="text-3xl font-bold text-gray-600">
                  {getInitials(userName)}
                </span>
              </div>
            ) : (
              <div className="relative">
                {imageLoading && (
                  <div className="h-32 w-32 animate-pulse rounded-full border-4 border-white bg-gray-200 shadow-lg"></div>
                )}
                <img
                  src={userPhoto}
                  alt={`${userName}'s profile`}
                  className={`h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg transition-all duration-300 ${
                    imageLoading ? "absolute opacity-0" : "opacity-100"
                  }`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </div>
            )}

            {/* Camera overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6 px-8 pb-8">
          {/* User Details Card */}
          <div className="space-y-4 rounded-xl bg-gray-50 p-6">
            <div className="group flex items-center space-x-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 transition-colors duration-200 group-hover:bg-blue-200">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  Name
                </p>
                <p
                  className="truncate text-lg font-semibold text-gray-900"
                  title={userName}
                >
                  {userName || "Not provided"}
                </p>
              </div>
            </div>

            <div className="group flex items-center space-x-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 transition-colors duration-200 group-hover:bg-green-200">
                <Mail className="h-5 w-5 text-sky-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  Email
                </p>
                <p
                  className="truncate text-lg font-semibold text-gray-900"
                  title={userEmail}
                >
                  {userEmail || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/dashboard/updateProfile"
              className="flex-1"
              aria-label="Update your profile information"
            >
              <button className="group flex w-full transform items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-sky-700 hover:shadow-lg">
                <Edit3 className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
                <span>Update Profile</span>
              </button>
            </Link>

            <button
              className="flex transform items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-200"
              aria-label="Share profile"
            >
              <span>Share</span>
            </button>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">48</p>
              <p className="text-sm text-gray-500">Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
