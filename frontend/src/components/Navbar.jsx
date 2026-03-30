import { Link, useLocation, useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  LogOutIcon,
  ShipWheelIcon,
  UsersIcon,
  MessageSquareIcon,
  SearchIcon,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Fetch users automatically when typing
  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/users/search?username=${encodeURIComponent(search)}`);
        const data = await res.json();
        setResults(data); // expect array of users [{_id, username, fullName, profilePic}]
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchUsers, 400); // debounce for smoother UX
    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <nav className="navbar bg-base-100 py-1 h-12 shadow-sm border-b border-base-300 sticky top-0 z-50 px-0">
      <div className="container mx-auto py-5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left side - Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold">
            <ShipWheelIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Talk2Learn</span>
          </Link>
        </div>

        {/* Center - Search bar */}
        <div className="relative flex-1 mx-4 max-w-md">
          <input
            type="text"
            placeholder="Search by username..."
            className="input input-sm w-full pl-10 pr-4 bg-base-200 rounded-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/60" />

          {/* Dropdown results */}
          {search && (
            <div className="absolute mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {loading ? (
                <div className="p-3 text-sm text-base-content/60">Searching...</div>
              ) : results.length > 0 ? (
                results.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user.username}`}
                    className="flex items-center gap-3 p-2 hover:bg-base-200 transition-colors"
                    onClick={() => setSearch("")}
                  >
                    <img
                      src={user.profilePic || "/default-avatar.png"}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-base-content/60">{user.fullName}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-3 text-sm text-base-content/60">No users found</div>
              )}
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="navbar-end">
          <div className="flex items-center gap-2">
            {/* Notifications - Mobile only */}
            <div className="lg:hidden">
              <Link to="/notifications">
                <button
                  className={`btn btn-ghost btn-circle btn-sm relative ${
                    location.pathname === "/notifications" ? "btn-active" : ""
                  }`}
                >
                  <BellIcon className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full opacity-80"></div>
                </button>
              </Link>
            </div>

            {/* Chat shortcut */}
            {!isChatPage && (
              <Link to="/friends">
                <button
                  className="btn btn-ghost btn-circle btn-sm tooltip tooltip-bottom"
                  data-tip="Start Chat"
                >
                  <MessageSquareIcon className="h-5 w-5" />
                </button>
              </Link>
            )}

            {/* Theme Selector */}
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>

            {/* User Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
              >
                <div className="w-8 h-8 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-1">
                  <img
                    src={authUser?.profilePic || "/default-avatar.png"}
                    alt={authUser?.fullName || "User Avatar"}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-50 menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
              >
                <li className="menu-title">
                  <span className="text-xs text-base-content/60">
                    Hello, {authUser?.fullName?.split(" ")[0] || "User"}!
                  </span>
                </li>
                <li>
                  <Link to="/profile" className="gap-3">
                    <UsersIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="gap-3">
                    <ShipWheelIcon className="w-4 h-4" />
                    Settings
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li className="sm:hidden">
                  <div className="flex items-center justify-between">
                    <span className="gap-3 flex items-center">
                      <ShipWheelIcon className="w-4 h-4" />
                      Theme
                    </span>
                    <ThemeSelector />
                  </div>
                </li>
                <li>
                  <button
                    onClick={logoutMutation}
                    className="gap-3 text-error hover:bg-error/10"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
