import { useRef, useEffect } from "react";

function useTimeout(callback, delay) {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === "number") {
      intervalRef.current = window.setTimeout(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

export default useTimeout;
