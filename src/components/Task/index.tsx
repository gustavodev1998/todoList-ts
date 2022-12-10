import styles from "./index.module.css";

import { Trash, Circle, CheckCircle } from "phosphor-react";
import { useState } from "react";

export interface TaskProps {
  id: string;
  task: string;
  isCompleted: boolean;
  onDelete?: (id: string) => void;
  onChecked?: (id: string) => void;
}

export function Task({ ...props }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  function onDeleteHandle() {
    props.onDelete!(props.id);
  }

  function handleChecked() {
    setIsChecked(!isChecked);
    props.onChecked!(props.id);
  }

  return (
    <div className={styles.taskContainer}>
      {!isChecked && (
        <Circle size={16} className={styles.circle} onClick={handleChecked} />
      )}

      {isChecked && (
        <CheckCircle
          size={16}
          className={styles.checked}
          weight="fill"
          onClick={handleChecked}
        />
      )}

      <div
        className={styles.taskText}
        style={{
          textDecoration: isChecked == true ? "line-through" : "none",
        }}
      >
        {props.task}
      </div>

      <Trash size={16} className={styles.trash} onClick={onDeleteHandle} />
    </div>
  );
}
