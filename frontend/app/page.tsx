import styles from "./page.module.css";
import { Button } from "antd";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>Selamat datang di aplikasi SIMPEL-FSM</p>
      </main>
    </div>
  );
}
