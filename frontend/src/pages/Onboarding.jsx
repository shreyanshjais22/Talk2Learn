import { useState, useRef } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { 
  Loader, MapPin, ShipWheel, Shuffle, Camera, User, MessageSquare, Globe, Sparkles, Upload 
} from "lucide-react";
import { LANGUAGES } from "../constants/constant.js";

const Onboarding = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const fileInputRef = useRef(null);

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 pointer-events-none" />
          
          <div className="relative p-6 sm:p-8">
            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                    <ShipWheel className="size-8 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent tracking-tight">
                    Complete Profile
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-gray-500 font-medium">Final Step</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                Let's personalize your language learning experience
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PROFILE PICTURE */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div
                    className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-white shadow-xl overflow-hidden cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formState.profilePic ? (
                      <img
                        src={formState.profilePic}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-1">
                        <Camera className="size-10 text-gray-400" />
                        <span className="text-xs text-gray-400">Upload</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                      <Camera className="size-8 text-white" />
                    </div>
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

                <div className="flex items-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Upload className="size-4" />
                    Upload Photo
                  </button>
                  <button 
                    type="button" 
                    onClick={handleRandomAvatar} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/60 border-2 border-gray-200/50 hover:border-purple-400 text-gray-700 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Shuffle className="size-4" />
                    Random
                  </button>
                </div>
                <p className="text-xs text-gray-400">Click the circle to upload or use buttons</p>
              </div>

              {/* FORM INPUTS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT COLUMN */}
                <div className="space-y-5">
                  {/* FULL NAME */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* NATIVE LANGUAGE */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-500" />
                      Native Language
                    </label>
                    <select
                      name="nativeLanguage"
                      value={formState.nativeLanguage}
                      onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-800 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                    >
                      <option value="">Select your native language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`native-${lang}`} value={lang.toLowerCase()}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* LEARNING LANGUAGE */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-pink-500" />
                      Learning Language
                    </label>
                    <select
                      name="learningLanguage"
                      value={formState.learningLanguage}
                      onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-800 focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                    >
                      <option value="">Select language you're learning</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-5">
                  {/* BIO */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-500" />
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formState.bio}
                      onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md resize-none h-24"
                      placeholder="Tell others about yourself and your language learning goals"
                    />
                  </div>

                  {/* LOCATION */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4">
                <button 
                  disabled={isPending}
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 disabled:scale-100 disabled:translate-y-0 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Onboarding...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <ShipWheel className="w-5 h-5" />
                      <span>Complete Onboarding</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
