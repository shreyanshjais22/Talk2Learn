import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFriends } from "../lib/api";
import {
  MessageCircleIcon,
  UsersIcon,
  GlobeIcon,
  HeartIcon,
} from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getUserFriends();
        setFriends(data);
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
        </div>
        <p className="text-gray-500 animate-pulse">Loading your friends...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200">
            <HeartIcon className="h-5 w-5 text-indigo-500" />
            <span className="text-indigo-700 font-medium text-sm">
              Your Learning Community
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Friends
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with your language exchange partners and start meaningful
            conversations
          </p>
        </div>

        {friends.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UsersIcon className="h-12 w-12 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No friends yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your language learning community by connecting with
              other learners
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <UsersIcon className="h-5 w-5" />
              Find Language Partners
            </button>
          </div>
        ) : (
          /* Friends List */
          <div className="">
            {/* Friends Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <UsersIcon className="h-5 w-5 text-primary-content" />
                </div>
                <span className="text-lg font-semibold text-base-content">
                  {friends.length}{" "}
                  {friends.length === 1 ? "Friend" : "Friends"}
                </span>
              </div>
            </div>

            {/* Friends Grid */}
            <div className="space-y-3">
              {friends.map((friend, index) => (
                <div
                  key={friend._id}
                  onClick={() => navigate(`/chat/${friend._id}`)}
                  className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="card-body p-4">
                    <div className="flex items-center gap-4">
                      {/* Profile Picture with Status */}
                      <div className="relative flex-shrink-0">
                        <div className="avatar w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={friend.profilePic || "/default-avatar.png"}
                            alt={friend.fullName}
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-200"></div>
                      </div>

                      {/* Friend Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {friend.fullName}
                        </h3>

                        {/* Language Badges */}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="badge badge-secondary badge-sm gap-1">
                            <span className="text-base">
                              {friend.nativeLanguage
                                ? getLanguageFlag(friend.nativeLanguage)
                                : "🌐"}
                            </span>
                            Native:{" "}
                            {friend.nativeLanguage
                              ? capitialize(friend.nativeLanguage)
                              : "Not set"}
                          </span>
                          <span className="badge badge-outline badge-sm gap-1">
                            <span className="text-base">
                              {friend.learningLanguage
                                ? getLanguageFlag(friend.learningLanguage)
                                : "📚"}
                            </span>
                            Learning:{" "}
                            {friend.learningLanguage
                              ? capitialize(friend.learningLanguage)
                              : "Not set"}
                          </span>
                        </div>

                        {/* Location */}
                        {friend.location && (
                          <div className="flex items-center gap-1 text-xs opacity-70 mt-1">
                            <GlobeIcon className="h-3 w-3" />
                            <span>{friend.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Chat Button */}
                      <div className="flex-shrink-0">
                        <button className="btn btn-primary btn-sm btn-circle">
                          <MessageCircleIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
