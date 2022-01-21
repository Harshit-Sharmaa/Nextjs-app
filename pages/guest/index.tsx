import { Dispatch, SetStateAction, useState } from "react";
import Form from "../../components/Form";
import Header from "../../components/Header";
import TodoList from "../../components/TodoList";
import styles from "../../styles/GuestScreen.module.scss";

const GuestScreen = () => {
  type todoItemType = { id: string; text: string; completed: boolean };

  const [todoItems, setTodoItems]: [
    todoItems: todoItemType[],
    setTodoItems: Dispatch<SetStateAction<todoItemType[]>>
  ] = useState([]);
  const [todoFilter, setTodoFilter] = useState("all");

  const onAddTodo = (text: string) => {
    setTodoItems([
      ...todoItems,
      { id: new Date().getTime().toString(), text: text, completed: false },
    ]);
  };

  const onRemoveTodo = (id: string) => {
    setTodoItems(
      todoItems.filter((todoItem) => {
        return todoItem.id !== id;
      })
    );
  };

  const onToggleCompleted = (id: string) => {
    setTodoItems(
      todoItems.map((todoItem) => {
        return todoItem.id === id
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem;
      })
    );
  };

  const onFilterChange = (selection: string) => {
    setTodoFilter(selection);
  };

  return (
    <div className={styles.container}>
      <Header title="Guest's Todo List" userStatus={0} />
      <Form onAddTodo={onAddTodo} onFilterChange={onFilterChange} />
      <TodoList
        todoItems={todoItems}
        onRemoveTodo={onRemoveTodo}
        onToggleCompleted={onToggleCompleted}
        todoFilter={todoFilter}
      />
    </div>
  );
};

export default GuestScreen;
