import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import styles from "../../pages/index.module.scss";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Navigation />
        {children}
      </main>
      <Footer />
    </>
  );
};
