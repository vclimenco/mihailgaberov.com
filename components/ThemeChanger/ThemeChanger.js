import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./ThemeProvider.module.scss";

export const ThemeChanger = () => {
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const [mounted, setMounted] = useState(false);
  const [ariaLabel, setAriaLabel] = useState('auto');

  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Sync with system changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches }) => {
        setTheme(matches ? DARK_THEME : LIGHT_THEME);

        // Change the toggle icons based on this data attribute
        document.firstElementChild.setAttribute("data-theme", matches ? DARK_THEME : LIGHT_THEME);
      });
  }, []);

  if (!mounted) return null;


  const handleClick = () => {
    const setToTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    document.firstElementChild.setAttribute("data-theme", setToTheme);
    setTheme(setToTheme);
    setAriaLabel(setToTheme)
  };

  return (
    <div className={styles.themeChanger}>
      <button
        onClick={handleClick}
        className={styles.themeToggle}
        title="Toggles light & dark"
        aria-label={ariaLabel}
        aria-live="polite"
      >
        <svg
          className={styles.svgImage}
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <mask className={styles.moon} id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="10" r="6" fill="black" />
          </mask>
          <circle
            className={styles.sun}
            cx="12"
            cy="12"
            r="6"
            mask="url(#moon-mask)"
            fill="currentColor"
          />
          <g className={styles.sunBeams} stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </button>
    </div>
  );
};
