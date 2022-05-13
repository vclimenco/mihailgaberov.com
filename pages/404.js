import styles from "./404.module.scss";

export default function Custom404() {
  return (
    <div className={styles.custom404}>
      <h2>Oh, no!</h2>
      <h3>I haven’t written this post yet. Will you help me write it?</h3>
      <p>
        Send me a message to <a href="mailto:mihail.gaberov@gmail.com"></a>
        mihail.gaberov[at]gmail.com
      </p>
      <ul>
        <li>Благодаря!</li>
        <li>Thank you!</li>
        <li>Danke!</li>
        <li>Merci!</li>
        <li>Gracias!</li>
        <li>Obrigado!</li>
      </ul>
    </div>
  );
}
