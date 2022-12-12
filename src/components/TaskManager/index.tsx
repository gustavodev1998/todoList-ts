import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./index.module.css";

import { PlusCircle } from "phosphor-react";
import clipboard from "../../assets/clipboard.svg";

import { Task, TaskProps } from "../Task";

const tasks: TaskProps[] = [
  {
    id: uuidv4(),
    task: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    task: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    task: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isCompleted: false,
  },
];

export function TaskManager() {
  // GUARDA TODAS AS TASKS
  const [allTasks, setAllTasks] = useState(tasks);

  // INPUT
  const [task, setTask] = useState("");

  function handleTaskText(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function handleCreateTask() {
    if (task.trim() == "") {
      alert("Insira uma nova task!");
    } else {
      let newTask = {
        id: uuidv4(),
        task,
        isCompleted: false,
      };
      let newTasks = [...allTasks, newTask];
      setAllTasks(newTasks);

      setTask("");
    }
  }

  function handleDeleteButton(taskId: string) {
    let newTasks = allTasks.filter((task) => {
      return task.id !== taskId;
    });
    setAllTasks(newTasks);
  }

  function handleUpdateTaskState(taskId: string) {
    const newList = allTasks.map((task) => {
      if (task.id === taskId) {
        const updatedItem = {
          ...task,
          isCompleted: !task.isCompleted,
        };

        return updatedItem;
      }

      return task;
    });
    setAllTasks(newList);
  }

  function countCompletedTasks() {
    let completedAmount = allTasks.filter((task) => {
      if (task.isCompleted) {
        return true;
      }

      return false;
    }).length;

    return `${
      completedAmount == 0 ? "0" : `${completedAmount} de ${allTasks.length}`
    } `;
  }

  return (
    <div>
      {/* Criar novas tasks */}
      <div className={styles.newTask}>
        <input
          type="text"
          placeholder=" Adicione uma nova tarefa"
          value={task}
          onChange={handleTaskText}
        />

        <div>
          <button onClick={handleCreateTask}>
            Criar
            <span>
              <PlusCircle size={16} />
            </span>
          </button>
        </div>
      </div>

      {/* Task info geral */}
      <div className={styles.tasksContainer}>
        <div className={styles.tasksHeader}>
          <div className={styles.createdTasks}>
            Tarefas criadas
            <span className={styles.counter}>{allTasks.length}</span>
          </div>
          <div className={styles.finishedTasks}>
            Concluídas
            <span className={styles.counter}>{countCompletedTasks()}</span>
          </div>
        </div>
      </div>

      {/* Caso não exista tasks */}
      {allTasks.length <= 0 && (
        <div className={styles.emptyTasks}>
          <img src={clipboard} alt="clipboard" />
          <p>Você ainda não tem tarefas cadastradas</p>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )}

      {/* Caso exista tasks */}
      {allTasks.length > 0 && (
        <>
          {allTasks.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                task={task.task}
                isCompleted={task.isCompleted}
                onDelete={() => handleDeleteButton(task.id)}
                onChecked={() => handleUpdateTaskState(task.id)}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
