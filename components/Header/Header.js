import React from 'react';
import styles from "./Header.module.scss";
import { ThemeChanger } from "../ThemeChanger";

export const Header = () => {
  return (
      <header className={styles.header}>
        <div className={styles.logos}>
          <h1>mihail gaberov</h1>
          <sub>Learning by sharing.</sub>
        </div>
        <ThemeChanger/>
      </header>
  );
};
