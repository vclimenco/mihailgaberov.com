import { ActiveLink } from "../ActiveLink";
import styles from "./Navigation.module.scss";

export const Nav = () => (
  <nav className={styles.navigation}>
    <ActiveLink activeClassName="active" href="/">
      <a>POSTS</a>
    </ActiveLink>
    {" | "}
    <ActiveLink activeClassName="active" href="/about">
      <a>About</a>
    </ActiveLink>
  </nav>
);
