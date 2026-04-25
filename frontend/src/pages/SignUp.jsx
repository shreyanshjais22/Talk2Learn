import { useState } from "react";
import {
  ShipWheel,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  AlertCircle,
  Sparkles,
  Check,
} from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    signupMutation(signupData);
  };

  const isPasswordStrong = signupData.password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto">
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/30 flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden">
          {/* LEFT - SIGNUP FORM */}
          <div className="relative w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col">
            {/* LOGO */}
            <div className="mb-6 flex items-center justify-center lg:justify-start gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                  <ShipWheel className="size-8 text-white transition-transform duration-500 group-hover:rotate-180" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent tracking-tight">
                  LearnTogether
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-gray-500 font-medium">
                    Language Learning
                  </span>
                </div>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-4 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl animate-shake">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 text-sm font-medium">
                    {error.response?.data?.message ||
                      error.message ||
                      "Something went wrong"}
                  </span>
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-center">
              {/* HEADER */}
              <div className="space-y-2 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Join LearnTogether and start your language learning adventure!
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSignup} className="space-y-4">
                {/* FULL NAME */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 
                               rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none 
                               text-gray-800 placeholder-gray-400"
                    value={signupData.fullName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                {/* USERNAME */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="johndoe123"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 
                               rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none 
                               text-gray-800 placeholder-gray-400"
                    value={signupData.username}
                    onChange={(e) =>
                      setSignupData({ ...signupData, username: e.target.value })
                    }
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@gmail.com"
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 
                               rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none 
                               text-gray-800 placeholder-gray-400"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-500" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 
                                 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none 
                                 text-gray-800 placeholder-gray-400"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check
                      className={`w-3 h-3 ${
                        isPasswordStrong ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={
                        isPasswordStrong ? "text-green-600" : "text-gray-400"
                      }
                    >
                      At least 6 characters
                    </span>
                  </div>
                </div>

                {/* TERMS CHECKBOX */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                    className="checkbox checkbox-sm"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{" "}
                    <button className="text-purple-600 hover:underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-purple-600 hover:underline">
                      Privacy Policy
                    </button>
                  </span>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isPending || !agreedToTerms}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isPending ? "Creating Account..." : "Create Account"}
                </button>

                {/* LOGIN LINK */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-purple-600 hover:text-pink-600 font-semibold"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT - IMAGE SECTION */}
          <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-purple-50/50 to-pink-50/50 items-center justify-center">
            <div className="max-w-sm p-6">
              <img
                src="/img1.png"
                alt="Language connection illustration"
                className="w-full h-full object-contain"
              />
              <div className="text-center space-y-3 mt-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Connect with language partners worldwide
                </h2>
                <p className="text-gray-600">
                  Practice conversations, make friends, and improve your
                  language skills together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
