import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "./Header.module.scss";
import { ThemeChanger } from "../ThemeChanger";
const packageJson = require("../../package.json");

export const Header = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 400px)");
    window.addEventListener("scroll", () => shrinkHeader(mediaQuery), false);

    return () => {
      window.removeEventListener("scroll", () => shrinkHeader(mediaQuery));
    };
  }, []);

  const shrinkHeader = (mediaQuery) => {
    const DISTANCE_FROM_TOP = 140;
    const headerElement = document.querySelector("header");
    const scrollY =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollY > DISTANCE_FROM_TOP) {
      headerElement.style.transition = "padding 200ms ease-in";
      if (mediaQuery.matches) {
        headerElement.style.padding = "0 0 5rem 0";
      } else {
        headerElement.style.padding = "0 0 2.4rem 0";
      }
    } else {
      if (mediaQuery.matches) {
        headerElement.style.padding = "3rem 0";
      } else {
        headerElement.style.padding = "2rem 0";
      }
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{packageJson.author}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Glegoo"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <div className={styles.logos}>
            <h1>
              mihail <span>✍🏻</span> gaberov
            </h1>
            <sub>Learning by sharing.</sub>
          </div>
        </Link>
        <ThemeChanger />
      </header>
    </>
  );
};
