import styles from '../styles/pages/404.module.css';

export default function _404() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1>404</h1>
        <div>
          <h2>This page does not exist.</h2>
        </div>
      </div>
    </div>
  );
}