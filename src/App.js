import { useState, useReducer, createContext, useContext } from "react";
import "./App.css";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: "todas",
};

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), name: action.payload, completed: false },
        ],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

function TaskInput() {
  const { dispatch } = useContext(TaskContext);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    dispatch({ type: "ADD_TASK", payload: trimmed });
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="input-div">
      <input
        className="input"
        type="text"
        placeholder="Descreva a tarefa..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="button" onClick={handleAdd}>
        Adicionar
      </button>
    </div>
  );
}

function TaskFilters() {
  const { state, dispatch } = useContext(TaskContext);
  const filters = [
    { label: "Todas", value: "todas" },
    { label: "Concluídas", value: "concluidas" },
    { label: "Não Concluídas", value: "pendentes" },
  ];

  return (
    <div className="filter-div">
      <span className="span-filter">Filtre por:</span>
      {filters.map((f) => (
        <button
          key={f.value}
          className={`button-select ${state.filter === f.value ? "active" : ""}`}
          onClick={() => dispatch({ type: "SET_FILTER", payload: f.value })}
          disabled={state.filter === f.value}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function TaskList() {
  const { state, dispatch } = useContext(TaskContext);

  const filtered = state.tasks.filter((t) => {
    if (state.filter === "concluidas") return t.completed;
    if (state.filter === "pendentes") return !t.completed;
    return true;
  });

  if (state.tasks.length === 0) {
    return <p className="empty-msg">Nenhuma tarefa adicionada ainda.</p>;
  }

  if (filtered.length === 0) {
    return <p className="empty-msg">Nenhuma tarefa nesta categoria.</p>;
  }

  return (
    <>
      {filtered.map((task) => (
        <div
          className={`list-row ${task.completed ? "completed" : ""}`}
          key={task.id}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
          />
          <span className="span-task-name">{task.name}</span>
          <button
            className="delete-button"
            onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
          >
            Excluir
          </button>
        </div>
      ))}
    </>
  );
}

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <div className="header">
          <h1 className="tittle">Gerenciador de Tarefas</h1>
          <p className="p">
            ACQA: Avaliação Continuada Questão Aberta (Atividade Discursiva)
          </p>
        </div>
        <TaskInput />
        <div className="list-div">
          <TaskFilters />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
