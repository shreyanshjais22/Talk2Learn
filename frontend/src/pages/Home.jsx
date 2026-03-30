import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import UserProfileModal from "../components/UserProfileModal";

const Home = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [sendingToId, setSendingToId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Queries
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  // Mutations
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      setSendingToId(null);
    },
    onError: () => {
      setSendingToId(null);
    },
  });

  // Track outgoing requests
  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs?.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const handleSendRequest = (userId) => {
    setSendingToId(userId);
    sendRequestMutation(userId);
  };

  return (
    <div className="p-3 sm:p-4 lg:p-5">
      <div className="max-w-full max-h-full mx-auto space-y-6">
        {/* Friends Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-xs gap-1.5">
            <UsersIcon className="h-3 w-3" />
            <span className="text-xs">Friend Requests</span>
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-md" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} onViewProfile={() => setSelectedUser(friend)} />
            ))}
          </div>
        )}

        {/* Recommended Users Section */}
        <section>
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="text-sm opacity-70 mt-1">
                  Discover perfect language exchange partners
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-4 text-center">
              <h3 className="font-semibold text-base mb-1">
                No recommendations available
              </h3>
              <p className="text-sm text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                const isSendingThis = isPending && sendingToId === user._id;

                return (
                  <div
                    key={user._id}
                    className="relative group"
                  >
                    {/* Main card with glass morphism effect */}
                    <div className="card bg-gradient-to-br from-base-100 via-base-100 to-base-200/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 border border-base-300/30 overflow-hidden">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="card-body p-3 space-y-3 relative z-10">
                        {/* User Info - Clickable to open profile */}
                        <div
                          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedUser(user)}
                        >
                          <div className="relative">
                            <div className="avatar">
                              <div className="w-10 h-10 rounded-full ring-1 ring-primary/30 ring-offset-base-100 ring-offset-1 group-hover:ring-primary/60 transition-all duration-300 shadow-sm">
                                <img 
                                  src={user.profilePic} 
                                  alt={user.fullName}
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=6d28d9&color=fff&size=80`;
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-base-content group-hover:text-primary transition-colors duration-300 truncate">
                              {user.fullName}
                            </h3>
                            {user.location && (
                              <div className="flex items-center text-xs opacity-70 group-hover:opacity-90 transition-opacity">
                                <MapPinIcon className="h-2 w-2 mr-1" />
                                <span className="truncate">{user.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Languages */}
                        <div className="flex flex-wrap gap-1.5">
                          <div className="badge badge-sm bg-gradient-to-r from-secondary to-secondary/80 text-secondary-content border-0 gap-1 py-1 px-2 shadow-sm">
                            {getLanguageFlag(user.nativeLanguage)}
                            <span className="font-normal text-xs">Native: {capitialize(user.nativeLanguage)}</span>
                          </div>
                          <div className="badge badge-sm badge-outline border-1 gap-1 py-1 px-2 hover:border-primary hover:bg-primary hover:text-primary-content transition-all duration-300">
                            {getLanguageFlag(user.learningLanguage)}
                            <span className="font-normal text-xs">Learning: {capitialize(user.learningLanguage)}</span>
                          </div>
                        </div>

                        {/* Bio */}
                        {user.bio && (
                          <p className="text-xs opacity-70 line-clamp-2 group-hover:opacity-90 transition-opacity">
                            {user.bio}
                          </p>
                        )}

                        {/* Action Button */}
                        <button
                          className={`btn btn-xs w-full gap-1 relative overflow-hidden group/btn transition-all duration-300 shadow-sm py-1.5 ${
                            hasRequestBeenSent
                              ? "btn-disabled opacity-60"
                              : "btn-primary hover:btn-primary-focus transform hover:scale-[1.01] hover:shadow-md hover:shadow-primary/25"
                          }`}
                          onClick={() => handleSendRequest(user._id)}
                          disabled={hasRequestBeenSent || isSendingThis}
                        >
                          {/* Button background animation */}
                          {!hasRequestBeenSent && (
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-focus to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          )}
                          
                          {isSendingThis ? (
                            <>
                              <span className="loading loading-spinner loading-xs"></span>
                              <span className="font-medium text-xs relative z-10">Sending...</span>
                            </>
                          ) : hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="h-3 w-3 text-success" />
                              <span className="font-medium text-xs">Request Sent</span>
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="h-3 w-3 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                              <span className="font-medium text-xs relative z-10">Send Request</span>
                              
                              {/* Shine effect */}
                              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* Enhanced border effect */}
                      <div className="absolute inset-0 rounded-box border-2 border-transparent bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-[2px] rounded-box bg-base-100"></div>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Floating glow effect */}
                    <div className="absolute inset-0 rounded-box bg-gradient-to-r from-primary/5 to-secondary/5 blur-lg scale-102 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Profile Modal */}
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSendRequest={handleSendRequest}
          hasRequestBeenSent={outgoingRequestsIds.has(selectedUser._id)}
          isSending={isPending && sendingToId === selectedUser._id}
          isFriend={friends.some((f) => f._id === selectedUser._id)}
        />
      )}
    </div>
  );
};

export default Home;