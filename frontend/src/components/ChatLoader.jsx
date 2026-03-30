import { MessageCircleIcon, WifiIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen bg-base-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-primary rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        
        {/* Loading animation container */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-24 h-24 border-4 border-primary/20 rounded-full animate-spin">
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"></div>
          </div>
          
          {/* Inner pulsing circle with icon */}
          <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <MessageCircleIcon className="w-8 h-8 text-primary animate-bounce" />
          </div>

          {/* Connection indicators */}
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center animate-ping">
              <WifiIcon className="w-3 h-3 text-success-content" />
            </div>
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-base-content">
            Connecting to chat
            <span className="inline-flex ml-1">
              <span className="animate-bounce delay-0">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-300">.</span>
            </span>
          </h2>
          <p className="text-base-content/60 font-medium max-w-sm">
            Establishing secure connection with your language partner
          </p>
        </div>

        {/* Loading progress indicator */}
        <div className="w-64 max-w-full">
          <div className="flex items-center justify-between text-sm text-base-content/50 mb-2">
            <span>Initializing</span>
            <span>Please wait</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2 text-base-content/60">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Secure Connection</span>
          </div>
          <div className="flex items-center space-x-2 text-base-content/60">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-500"></div>
            <span>Real-time Messaging</span>
          </div>
        </div>
      </div>

      {/* Floating message bubbles animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary text-xs animate-bounce delay-1000">Hello!</div>
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-secondary text-xs animate-bounce delay-2000">Hi there!</div>
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2">
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-accent text-xs animate-bounce delay-1500">Ready to chat?</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLoader;