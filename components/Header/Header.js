import React from "react";
import styles from "./Header.module.scss";
import { ThemeChanger } from "../ThemeChanger";
const packageJson = require("../../package.json");

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logos}>
        <h1>{packageJson.author.toLowerCase()}</h1>
        <sub>Learning by sharing.</sub>
      </div>
      <ThemeChanger />
    </header>
  );
};
