import React from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "./Header.module.scss";
import { ThemeChanger } from "../ThemeChanger";
const packageJson = require("../../package.json");

export const Header = () => {
  return (
    <>
      <Head>
        <title>{packageJson.author}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <div className={styles.logos}>
            <h1>{packageJson.author.toLowerCase()}</h1>
            <sub>Learning by sharing.</sub>
          </div>
        </Link>
        <ThemeChanger />
      </header>
    </>
  );
};
