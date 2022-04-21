import styles from "./Footer.module.scss";
const packageJson = require("../../package.json");

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <ul>
        <li className={styles.footerLinks}>
          <a
            href="https://mobile.twitter.com/mihailgaberov"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter
          </a>{" "}
          &bull;{" "}
          <a
            href="https://github.com/mihailgaberov"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>{" "}
          &bull;{" "}
          <a
            href="/rss.xml"
            rel="alternate"
            title="RSS feed"
            type="application/rss+xml"
          >
            rss
          </a>
        </li>
        <li className={styles.footerCopyrights}>
          © {packageJson.author} {currentYear}. All rights reserved.
        </li>
        <li className={styles.noCookies}>
          <div className={styles.noTracking}>
            I don't track you in any way, hence no cookies or jam are used here.
          </div>
        </li>
      </ul>
    </footer>
  );
};
