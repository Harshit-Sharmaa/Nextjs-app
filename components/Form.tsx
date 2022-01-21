import { FcPlus } from "react-icons/fc";
import { FormEvent } from "react";
import { useState } from "react";
import styles from "../styles/Form.module.scss";

const Form = ({
  onAddTodo,
  onFilterChange,
}: {
  onAddTodo: (text: string) => void;
  onFilterChange: (selection: string) => void;
}) => {
  const [todoText, setTodoText] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoText.replaceAll(" ", "").length === 0) return;

    onAddTodo(todoText);
    setTodoText("");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          required
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button className={styles.formButton} type="submit">
          Add <FcPlus />
        </button>
      </div>
      <div className={styles.selectGroup}>
        <select onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
