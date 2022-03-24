import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import styles from "../../pages/index.module.scss";
import { WalkingMan } from "../WalkingMan";

export const Layout = ({ children }) => {
  return (
    <>
      <WalkingMan />
      <Header />
      <main className={styles.container}>
        <Navigation />
        {children}
      </main>
      <Footer />
    </>
  );
};
