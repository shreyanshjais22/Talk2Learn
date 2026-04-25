import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { 
  BellIcon, 
  HomeIcon, 
  ShipWheelIcon, 
  UsersIcon, 
  MessageSquareIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronRightIcon
} from "lucide-react";
import useLogout from "../hooks/useLogout";
import { getUserFriends } from "../lib/api";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();
  const location = useLocation();
  const currentPath = location.pathname;
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];
  const friendslenght = getUserFriends();
  const [friends, setFriends] = useState([]);
    useEffect(() => {
      const fetchFriends = async () => {
        try {
          const data = await getUserFriends();
          setFriends(data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        }
      };
  
      fetchFriends();
    }, []);
  

  const navigationItems = [
    {
      path: "/",
      icon: HomeIcon,
      label: "Home",
      description: "Discover new language partners"
    },
    {
      path: "/friends",
      icon: UsersIcon,
      label: "Friends",
      description: "Your language exchange partners",
      badge: friends.length,
    },
    {
      path: "/notifications",
      icon: BellIcon,
      label: "Notifications",
      description: "Friend requests & updates",
      badge: incomingRequests.length
    },
  ];

  return (
    <aside className=" bg-base-100 border-r border-base-300/50 hidden min-w-min lg:flex flex-col h-screen sticky top-0 shadow-sm">
      <div className="p-4 border-b border-none">
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 group"
        >
          <div className="relative">
            <ShipWheelIcon className="w-8 h-8 text-primary group-hover:text-primary-focus transition-colors" />
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r text-bold from-primary to-secondary bg-clip-text text-transparent tracking-wider font-mono">
              LearnTogether
            </span>
            <span className="text-xs text-base-content/50 font-medium">Language Exchange</span>
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider px-3 mb-3">
            Navigation
          </h3>
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path === "/chat" && currentPath.startsWith("/chat"));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-2 px-2 py-3 rounded-xl transition-all duration-200 hover:bg-base-200 ${
                isActive 
                  ? "bg-primary/10 text-primary border-r-4 border-primary shadow-sm" 
                  : "text-base-content hover:text-primary"
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-base-content/60 group-hover:text-primary"}`} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{item.label}</span>
                  {item.badge>=0 && (
                    <span className="badge badge-primary badge-sm">{item.badge}</span>
                  )}
                </div>
                <p className="text-xs text-base-content/50 truncate group-hover:text-base-content/70 transition-colors">
                  {item.description}
                </p>
              </div>

              {isActive && (
                <ChevronRightIcon className=" text-primary animate-pulse" />
              )}
            </Link>
          );
        })}

       
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-none mt-auto">
        <div className="bg-base-200/50 rounded-2xl p-4 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                <img 
                  src={authUser?.profilePic || "/default-avatar.png"} 
                  alt={authUser?.fullName || "User Avatar"}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base-content truncate text-sm">
                {authUser?.fullName || "User"}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-base-100 rounded-lg p-2">
              <p className="text-lg font-bold text-primary">{friends.length}</p>
              <p className="text-xs text-base-content/60">Friends</p>
            </div>
            <div className="bg-base-100 rounded-lg p-2">
              <p className="text-lg font-bold text-secondary">89</p>
              <p className="text-xs text-base-content/60">Messages</p>
            </div>
          </div>

          {/* Language Info */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-base-content/60">Learning</span>
              <span className="text-xs font-medium text-primary">
                {authUser?.learningLanguage || "Not set"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-base-content/60">Native</span>
              <span className="text-xs font-medium text-secondary">
                {authUser?.nativeLanguage || "Not set"}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutMutation}
            className="btn btn-outline btn-error btn-sm w-full gap-2 mt-3"
          >
            <LogOutIcon className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;