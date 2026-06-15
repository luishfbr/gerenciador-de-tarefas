import { useState } from "react";
import "./App.css";
import { TaskProvider, useTask } from "./context/TaskContext";
import ListaDeTarefas from "./components/ListaDeTarefas";

function TaskInput() {
  const { dispatch } = useTask();

  const [inputValue, setInputValue] = useState("");

  function handleAdd() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    dispatch({ type: "ADD_TASK", payload: trimmed });
    setInputValue("");
  }

  return (
    <div className="input-div">
      <input
        className="input"
        type="text"
        placeholder="Descreva a tarefa..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button className="button" onClick={handleAdd}>
        Adicionar
      </button>
    </div>
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

        <ListaDeTarefas />
      </div>
    </TaskProvider>
  );
}

export default App;
