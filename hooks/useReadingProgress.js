import { useEffect, useState } from "react";

/**
 * React Hook to get the scroll percentage from the page, returns value from 0 to 100
 */
export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    function updateScrollCompletion() {
      const el = document.documentElement,
        scrollTop = el.scrollTop || document.body.scrollTop,
        scrollHeight = el.scrollHeight || document.body.scrollHeight;
      var percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100;
      setCompletion(percent);
    }
    window.addEventListener("scroll", updateScrollCompletion);

    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);
  return completion;
}
