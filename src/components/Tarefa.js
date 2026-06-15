import { useState } from "react";
import { useTask } from "../context/TaskContext";

function Tarefa({ task }) {
  const { dispatch } = useTask();

  const [hovered, setHovered] = useState(false);

  function handleToggle() {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  }

  function handleDelete() {
    dispatch({ type: "DELETE_TASK", payload: task.id });
  }

  return (
    <div className={`list-row ${task.completed ? "completed" : ""}`}>
      <input type="checkbox" checked={task.completed} onChange={handleToggle} />

      <span className="span-task-name">{task.name}</span>

      <button
        className={`delete-button ${hovered ? "delete-button--hover" : ""}`}
        onClick={handleDelete}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Excluir
      </button>
    </div>
  );
}

export default Tarefa;
