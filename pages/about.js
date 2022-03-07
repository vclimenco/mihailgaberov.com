import { Header } from "../components/Header";
import { Navigation } from "../components/Navigation";
import styles from "./index.module.scss";

function About() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Navigation />
        content here...
      </main>
    </>
  );
}

export default About;
