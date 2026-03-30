// src/pages/Profile.jsx
import { useState, useRef } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProfile, getUserFriends } from "../lib/api";
import toast from "react-hot-toast";
import {
  Edit, Mail, User, MapPin, BookOpen, Languages, Calendar, Award, AtSign,
  X, Save, Loader, Shuffle, Users, MessageCircle, Clock, Camera, Upload
} from "lucide-react";
import { LANGUAGES } from "../constants/constant.js";
import { capitialize } from "../lib/utils";

const Profile = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({});
  const fileInputRef = useRef(null);

  // Fetch friends count
  const { data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Update profile mutation
  const { mutate: updateMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const openEditModal = () => {
    setFormState({
      fullName: authUser?.fullName || "",
      bio: authUser?.bio || "",
      nativeLanguage: authUser?.nativeLanguage || "",
      learningLanguage: authUser?.learningLanguage || "",
      location: authUser?.location || "",
      profilePic: authUser?.profilePic || "",
    });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormState({ ...formState, profilePic: reader.result });
      toast.success("Photo selected!");
    };
    reader.readAsDataURL(file);
  };

  // Compute real stats
  const friendsCount = friends.length;
  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt)
    : null;
  const daysSinceJoined = memberSince
    ? Math.floor((Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const memberSinceStr = memberSince
    ? memberSince.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "N/A";

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">My Profile</h1>
          <p className="text-base-content/60 mt-1">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden">
          {/* Cover Banner */}
          <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full ring-4 ring-base-100 overflow-hidden bg-base-200 shadow-lg">
                  <img
                    src={authUser?.profilePic || "/default-avatar.png"}
                    alt={authUser?.fullName || "User Avatar"}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.fullName || "User")}&background=6d28d9&color=fff&size=128`;
                    }}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-success rounded-full ring-4 ring-base-100"></div>
              </div>
              
              <div className="text-center sm:text-left sm:mb-2">
                <h2 className="text-2xl font-bold text-base-content">
                  {authUser?.fullName || "Anonymous User"}
                </h2>

                {/* Username */}
                <p className="text-base-content/70 flex items-center gap-2 mt-1 justify-center sm:justify-start">
                  <AtSign className="w-4 h-4" />
                  {authUser?.username || "No username"}
                </p>

                {/* Email */}
                <p className="text-base-content/60 flex items-center gap-2 mt-1 justify-center sm:justify-start">
                  <Mail className="w-4 h-4" />
                  {authUser?.email || "No email"}
                </p>
              </div>

              {/* Edit Button - Desktop */}
              <div className="hidden sm:block ml-auto">
                <button className="btn btn-primary gap-2" onClick={openEditModal}>
                  <Edit className="w-4 h-4" /> Edit Profile
                </button>
              </div>
            </div>

            {/* Bio Section */}
            {authUser?.bio && (
              <div className="mb-6 p-4 bg-base-200/50 rounded-lg">
                <p className="text-base-content/80 italic">"{authUser.bio}"</p>
              </div>
            )}

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Location */}
              <div className="flex items-center gap-3 p-4 bg-base-200/30 rounded-lg hover:bg-base-200/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Location</p>
                  <p className="font-medium">{authUser?.location || "Not specified"}</p>
                </div>
              </div>

              {/* Native Language */}
              <div className="flex items-center gap-3 p-4 bg-base-200/30 rounded-lg hover:bg-base-200/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Languages className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Native Language</p>
                  <p className="font-medium">{authUser?.nativeLanguage ? capitialize(authUser.nativeLanguage) : "Not set"}</p>
                </div>
              </div>

              {/* Learning Language */}
              <div className="flex items-center gap-3 p-4 bg-base-200/30 rounded-lg hover:bg-base-200/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Learning</p>
                  <p className="font-medium">{authUser?.learningLanguage ? capitialize(authUser.learningLanguage) : "Not set"}</p>
                </div>
              </div>

              {/* Friends */}
              <div className="flex items-center gap-3 p-4 bg-base-200/30 rounded-lg hover:bg-base-200/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Connections</p>
                  <p className="font-medium">{friendsCount} {friendsCount === 1 ? "Friend" : "Friends"}</p>
                </div>
              </div>
            </div>

            {/* Stats Section - Real Data */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-base-200/20 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{friendsCount}</div>
                <p className="text-xs text-base-content/60">Friends</p>
              </div>
              <div className="text-center border-x border-base-300">
                <div className="text-2xl font-bold text-success">{daysSinceJoined}</div>
                <p className="text-xs text-base-content/60">Days Active</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{memberSinceStr}</div>
                <p className="text-xs text-base-content/60">Joined</p>
              </div>
            </div>

            {/* Edit Button - Mobile */}
            <div className="sm:hidden mt-6">
              <button className="btn btn-primary btn-block gap-2" onClick={openEditModal}>
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsEditing(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-base-100 border-b border-base-300 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-xl font-bold text-base-content">Edit Profile</h3>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setIsEditing(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="relative w-24 h-24 rounded-full overflow-hidden bg-base-200 ring-2 ring-primary/30 shadow-lg cursor-pointer group/avatar"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={formState.profilePic || "/default-avatar.png"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formState.fullName || "User")}&background=6d28d9&color=fff&size=96`;
                    }}
                  />
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-sm btn-primary gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </button>
                  <button
                    type="button"
                    onClick={handleRandomAvatar}
                    className="btn btn-sm btn-outline gap-2"
                  >
                    <Shuffle className="w-4 h-4" />
                    Random
                  </button>
                </div>
                <p className="text-xs text-base-content/50">Click the photo or use buttons below</p>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  Bio
                </label>
                <textarea
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="textarea textarea-bordered w-full h-24"
                  placeholder="Tell others about yourself"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Native Language */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-success" />
                    Native Language
                  </label>
                  <select
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Learning Language */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-info" />
                    Learning Language
                  </label>
                  <select
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Location
                </label>
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="City, Country"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="btn btn-ghost flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-primary flex-1 gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
