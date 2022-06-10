import { useEffect, useState } from "react";

import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import { WalkingMan } from "../WalkingMan";
import { useReadingProgress } from "../../hooks/useReadingProgress";

import styles from "../../pages/index.module.scss";

const SHOW_TIME_NUM = 7;

export const Layout = ({ children }) => {
  const completion = useReadingProgress();

  const consoleStyles =
    "color: #26bfa5; font: 1.2em 'Anonymous Pro', sans-serif; background-color: #222; padding: 2px";

  const [show, setShow] = useState(false);

  /**
   * Generates a random number from a given interval. Min and max are included.
   * @param min
   * @param max
   * @returns {number}
   */
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    const currentNum = randomIntFromInterval(1, SHOW_TIME_NUM); // pick a number from 1 to 10

    if (currentNum === SHOW_TIME_NUM) {
      console.log("%cSHOWTIME :)", consoleStyles);
      setShow(true);
      setTimeout(() => setShow(false), 10000);
    } else {
      setShow(false);
    }
  }, []);

  return (
    <>
      {show && <WalkingMan />}
      <span
        id="progress-bar"
        style={{
          transform: `translateX(${completion - 100}%)`,
        }}
        className={styles.progressBar}
      />
      <Header />
      <main className={styles.container}>
        <Navigation />
        {children}
      </main>
      <Footer />
    </>
  );
};
