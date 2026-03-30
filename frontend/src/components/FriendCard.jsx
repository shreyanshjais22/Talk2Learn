import { Link } from "react-router";
import { MessageCircleIcon, UserIcon, Globe } from "lucide-react";
import { LANGUAGE_TO_FLAG } from "../constants/constant";

const FriendCard = ({ friend, onViewProfile }) => {
  return (
    <div className="relative group">
      {/* Main card with smaller sizing */}
      <div className="card bg-gradient-to-br from-base-100 via-base-100 to-base-200/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 border border-base-300/30 overflow-hidden">
        
        <div className="card-body p-4 relative z-10">
          {/* USER INFO - Clickable */}
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onViewProfile}
          >
            <div className="relative">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring-2 ring-primary/30 ring-offset-base-100 ring-offset-2 group-hover:ring-primary/60 group-hover:ring-3 transition-all duration-300 shadow-md">
                  <img 
                    src={friend.profilePic} 
                    alt={friend.fullName}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.fullName)}&background=6d28d9&color=fff&size=96`;
                    }}
                  />
                </div>
              </div>
              {/* Online status */}
              <div className="absolute -bottom-1 -right-1">
                <div className="relative">
                  <div className="w-3.5 h-3.5 bg-success rounded-full border-2 border-base-100 shadow"></div>
                  <div className="absolute inset-0 w-3.5 h-3.5 bg-success rounded-full animate-ping opacity-30"></div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors duration-300 truncate">
                {friend.fullName}
              </h3>
              <div className="flex items-center gap-1.5 text-xs opacity-70 group-hover:opacity-90 transition-opacity">
                <UserIcon className="h-3 w-3" />
                <span className="font-medium">Language Partner</span>
              </div>
            </div>
          </div>

          {/* LANGUAGE BADGES */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="badge badge-sm bg-gradient-to-r from-secondary to-secondary/80 text-secondary-content border-0 gap-1 py-1 px-2 shadow hover:scale-105 transition">
              {getLanguageFlag(friend.nativeLanguage)}
              <span className="font-semibold text-xs">Native: {friend.nativeLanguage}</span>
            </div>
            
            <div className="badge badge-sm badge-outline border hover:border-primary hover:bg-primary hover:text-primary-content gap-1 py-1 px-2 transition hover:scale-105">
              {getLanguageFlag(friend.learningLanguage)}
              <span className="font-semibold text-xs">Learning: {friend.learningLanguage}</span>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <Link 
            to={`/chat/${friend._id}`} 
            className="btn btn-primary btn-md w-full gap-2 relative overflow-hidden group/btn hover:btn-primary-focus transform hover:scale-[1.01] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/25"
          >
            <MessageCircleIcon className="h-4 w-4 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
            <span className="font-semibold relative z-10 text-sm">Start Chat</span>
          </Link>
        </div>
      </div>

      {/* Floating glow effect */}
      <div className="absolute inset-0 rounded-box bg-gradient-to-r from-primary/5 to-secondary/5 blur-lg scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return (
    <div className="w-4 h-3 bg-gradient-to-br from-base-300 to-base-200 rounded-sm flex items-center justify-center shadow-inner">
      <span className="text-xs opacity-60 font-bold">?</span>
    </div>
  );

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <div className="relative group/flag">
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${langLower} flag`}
          className="h-3 w-4 rounded-sm object-cover shadow-sm border border-base-300/30 group-hover/flag:shadow-md transition-shadow duration-200"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          className="hidden w-4 h-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-sm items-center justify-center shadow-sm border border-primary/20"
        >
          <Globe className="h-2 w-2 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-4 h-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-sm flex items-center justify-center shadow-sm border border-primary/20">
      <Globe className="h-2 w-2 text-primary" />
    </div>
  );
}
