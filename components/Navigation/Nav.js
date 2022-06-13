import { ActiveLink } from "../ActiveLink";

import styles from "./Navigation.module.scss";

export const Nav = () => {
  return (
    <nav className={styles.navigation}>
      <ActiveLink activeClassName="active" href="/">
        <a>POSTS</a>
      </ActiveLink>
      {" | "}
      <ActiveLink activeClassName="active" href="/about">
        <a>ABOUT</a>
      </ActiveLink>
    </nav>
  );
};
