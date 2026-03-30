import { X, MapPin, Languages, BookOpen, MessageCircle, UserPlus, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import { getLanguageFlag } from "./FriendCard";
import { capitialize } from "../lib/utils";

const UserProfileModal = ({ user, onClose, onSendRequest, hasRequestBeenSent, isSending, isFriend }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Cover / Banner */}
        <div className="h-28 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/30 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          {/* Close button */}
          <button
            className="absolute top-3 right-3 btn btn-ghost btn-sm btn-circle bg-base-100/30 backdrop-blur-sm hover:bg-base-100/60"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-14">
          <div className="w-28 h-28 rounded-full ring-4 ring-base-100 overflow-hidden bg-base-200 shadow-xl">
            <img
              src={user.profilePic}
              alt={user.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=6d28d9&color=fff&size=128`;
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-3">
          {/* Name */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-base-content">{user.fullName}</h2>
            {user.location && (
              <p className="text-sm text-base-content/60 flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {user.location}
              </p>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="mb-4 p-3 bg-base-200/50 rounded-xl">
              <p className="text-sm text-base-content/80 italic text-center">"{user.bio}"</p>
            </div>
          )}

          {/* Language Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-base-200/40 rounded-xl p-3 text-center border border-base-300/30">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Languages className="w-4 h-4 text-success" />
                <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">Native</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                {user.nativeLanguage && getLanguageFlag(user.nativeLanguage)}
                <span className="font-bold text-sm">
                  {user.nativeLanguage ? capitialize(user.nativeLanguage) : "Not set"}
                </span>
              </div>
            </div>
            <div className="bg-base-200/40 rounded-xl p-3 text-center border border-base-300/30">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <BookOpen className="w-4 h-4 text-info" />
                <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">Learning</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                {user.learningLanguage && getLanguageFlag(user.learningLanguage)}
                <span className="font-bold text-sm">
                  {user.learningLanguage ? capitialize(user.learningLanguage) : "Not set"}
                </span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex justify-center gap-6 mb-5 py-3 border-y border-base-300/30">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{user.friends?.length || 0}</div>
              <p className="text-xs text-base-content/60">Friends</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-success">
                {user.createdAt
                  ? Math.max(0, Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
                  : 0}
              </div>
              <p className="text-xs text-base-content/60">Days Active</p>
            </div>
          </div>

          {/* Action Button */}
          {isFriend ? (
            <Link
              to={`/chat/${user._id}`}
              className="btn btn-primary w-full gap-2"
              onClick={onClose}
            >
              <MessageCircle className="w-4 h-4" />
              Start Chat
            </Link>
          ) : (
            <button
              className={`btn w-full gap-2 ${
                hasRequestBeenSent
                  ? "btn-disabled opacity-60"
                  : "btn-primary"
              }`}
              onClick={() => {
                if (!hasRequestBeenSent && !isSending) {
                  onSendRequest(user._id);
                }
              }}
              disabled={hasRequestBeenSent || isSending}
            >
              {isSending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sending...
                </>
              ) : hasRequestBeenSent ? (
                <>
                  <CheckCircle className="w-4 h-4 text-success" />
                  Request Sent
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Send Friend Request
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
