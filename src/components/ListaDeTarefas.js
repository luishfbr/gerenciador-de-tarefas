import { useTask } from "../context/TaskContext";
import Tarefa from "./Tarefa";

const FILTROS = [
  { label: "Todas", value: "todas" },
  { label: "Concluídas", value: "concluidas" },
  { label: "Não Concluídas", value: "pendentes" },
];

function ListaDeTarefas() {
  const { state, dispatch } = useTask();

  const tarefasFiltradas = state.tasks.filter((t) => {
    if (state.filter === "concluidas") return t.completed;
    if (state.filter === "pendentes") return !t.completed;
    return true;
  });

  function handleFilter(value) {
    dispatch({ type: "SET_FILTER", payload: value });
  }

  return (
    <div className="list-div">
      <div className="filter-div">
        <span className="span-filter">Filtre por:</span>

        {FILTROS.map((f) => (
          <button
            key={f.value}
            className={`button-select ${state.filter === f.value ? "active" : ""}`}
            onClick={() => handleFilter(f.value)}
            disabled={state.filter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>

      {state.tasks.length === 0 && (
        <p className="empty-msg">Nenhuma tarefa adicionada ainda.</p>
      )}

      {state.tasks.length > 0 && tarefasFiltradas.length === 0 && (
        <p className="empty-msg">Nenhuma tarefa nesta categoria.</p>
      )}

      {tarefasFiltradas.map((task) => (
        <Tarefa key={task.id} task={task} />
      ))}
    </div>
  );
}

export default ListaDeTarefas;
