import "./index.css";
import styles from "./App.module.css";

import { Header } from "./components/Header";
import { TaskManager } from "./components/TaskManager";

export function App() {
  return (
    <div className={styles.wrapper}>
      <Header />

      <TaskManager />
    </div>
  );
}

export default App;
