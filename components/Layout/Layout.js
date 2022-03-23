import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import styles from "../../pages/index.module.scss";
import { WalkingMan } from "../WalkingMan";
import { useState } from "react";
import useInterval from "../../hooks/useInterval.hook";

const ANIMATION_INTERVAL = 10000;

export const Layout = ({ children }) => {
  const [showWalkingMan, setShowWalkingMan] = useState(false);

  useInterval(() => {
    setShowWalkingMan(!showWalkingMan);
  }, ANIMATION_INTERVAL);

  return (
    <>
      {showWalkingMan && <WalkingMan />}
      <Header />
      <main className={styles.container}>
        <Navigation />
        {children}
      </main>
      <Footer />
    </>
  );
};
