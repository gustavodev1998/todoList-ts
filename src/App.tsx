import "./index.css";

import { Header } from "./components/Header";
import { TaskManager } from "./components/TaskManager";

export function App() {
  return (
    <div>
      <Header />

      <TaskManager />
    </div>
  );
}

export default App;
