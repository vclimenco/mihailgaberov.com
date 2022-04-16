import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "./Header.module.scss";
import { ThemeChanger } from "../ThemeChanger";

const packageJson = require("../../package.json");

export const Header = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 400px) and (orientation: landscape)");
    window.addEventListener("scroll", () => shrinkHeader(mediaQuery), false);

    return () => {
      window.removeEventListener("scroll", () => shrinkHeader(mediaQuery));
    };
  }, []);

  const shrinkHeader = (mediaQuery) => {
    const DISTANCE_FROM_TOP = 140;
    const headerElement = document.querySelector("header");
    const navElements = document.querySelectorAll("nav :not(a.active)");
    const scrollY =
        document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollY > DISTANCE_FROM_TOP) {
      // Change the color of all navigation links that are not active
      navElements.forEach(
          (el) => (el.style.color = "var(--footer-foreground)")
      );

      headerElement.style.transition = "padding 200ms ease-in";

      if (mediaQuery.matches) {
        headerElement.style.padding = "0 1rem 5rem 1rem";
      } else {
        headerElement.style.padding = "0 1rem 3.5rem 1rem";
      }
    } else {
      navElements.forEach((el) => (el.style.color = "var(--accent)"));
      headerElement.style.padding = "3rem 1rem 3rem 1rem";
    }
  };

  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="theme-color" content="Canvas"/>
          <meta name="color-scheme" content="light dark"/>
          <title>{packageJson.author}</title>
          <link
              href="https://fonts.googleapis.com/css2?family=Poppins"
              rel="stylesheet"
          ></link>
          <link
              href="https://fonts.googleapis.com/css?family=Glegoo"
              rel="stylesheet"
          ></link>

          <link rel="icon" href="/favicon.ico" sizes="any"/>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        </Head>
        <header className={styles.header}>
          <Link href="/">
            <div className={styles.logos}>
              <h1>
                mihail <span></span> gaberov
              </h1>
              <sub>Learning by sharing.</sub>
            </div>
          </Link>
          <ThemeChanger/>
        </header>
      </>
  );
};
