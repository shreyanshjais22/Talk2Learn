import { useState } from "react";
import { ShipWheel, Eye, EyeOff, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 relative overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/30 flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 pointer-events-none" />
          
          {/* LOGIN FORM SECTION */}
          <div className="relative w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col">
            {/* LOGO */}
            <div className="mb-1 flex items-center justify-center lg:justify-start gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                  <ShipWheel className="size-8 text-white transition-transform duration-500 group-hover:rotate-180" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent tracking-tight">
                  Talk2Learn
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-gray-500 font-medium">Language Learning</span>
                </div>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl animate-shake">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 text-sm font-medium">
                    {error.response?.data?.message || "Something went wrong"}
                  </span>
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col py-10">
              {/* HEADER */}
              <div className="space-y-2 mb-7">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Sign in to continue your language learning journey
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* EMAIL INPUT */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-gray-800 placeholder-gray-400 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD INPUT */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-500" />
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-4 pr-12 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl text-gray-800 placeholder-gray-400 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-purple-600 transition-colors duration-200 rounded-lg hover:bg-purple-50"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* FORGOT PASSWORD LINK */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-pink-600 font-medium transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 disabled:scale-100 disabled:translate-y-0 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <span className="relative">Sign In</span>
                  )}
                </button>

                {/* SIGNUP LINK */}
                <div className="text-center pt-2">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-purple-600 hover:text-pink-600 font-semibold transition-colors duration-200 hover:underline"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-purple-50/50 to-pink-50/50 justify-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-rose-300 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            <div className="relative max-w-md px-8 z-10">
              <div className="relative aspect-square max-w-sm mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-500"></div>

                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-xl">
                    <div className="w-48 h-48 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                          <ShipWheel className="w-8 h-8 text-white" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                          <p className="text-xs text-gray-600 font-medium">
                            Connecting Learners
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-5">
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                  Connect with language partners
                  <span className="block text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                    worldwide
                  </span>
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Practice conversations, make friends, and improve your language skills with
                  native speakers from around the globe
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <div className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200/50 text-xs font-medium text-purple-700 shadow-sm">
                    🌍 50+ Languages
                  </div>
                  <div className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200/50 text-xs font-medium text-pink-700 shadow-sm">
                    💬 Live Conversations
                  </div>
                  <div className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-rose-200/50 text-xs font-medium text-rose-700 shadow-sm">
                    ⭐ Expert Tutors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Login;
