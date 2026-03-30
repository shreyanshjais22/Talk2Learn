import { PaletteIcon, CheckIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants/constant";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      {/* Trigger Button */}
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <PaletteIcon className="size-5" />
      </button>

      {/* Dropdown */}
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-2 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-60 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => {
            const isActive = theme === themeOption.name;
            return (
              <button
                key={themeOption.name}
                className={`w-full px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors text-left
                  ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold border border-primary/30"
                      : "hover:bg-base-content/5"
                  }`}
                onClick={() => setTheme(themeOption.name)}
              >
                {/* Left indicator */}
                {isActive ? (
                  <CheckIcon className="size-4 shrink-0 text-primary" />
                ) : (
                  <PaletteIcon className="size-4 shrink-0 opacity-60" />
                )}

                {/* Theme name */}
                <span className="text-sm truncate">{themeOption.label}</span>

                {/* Preview colors */}
                <div className="ml-auto flex gap-1.5">
                  {themeOption.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-base-300/40"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
