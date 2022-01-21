import TodoListItem from "./TodoListItem";
import styles from "../styles/TodoList.module.scss";

const TodoList = ({
  todoItems,
  onRemoveTodo,
  onToggleCompleted,
  todoFilter,
}: {
  todoItems: { id: string; text: string; completed: boolean }[];
  onRemoveTodo: (id: string) => void;
  onToggleCompleted: (id: string) => void;
  todoFilter: string;
}) => {
  let itemIndex = 0;

  return (
    <div className={styles.container}>
      <ul>
        {todoItems.map((todoItem) => {
          return todoFilter === "all" ? (
            <TodoListItem
              key={todoItem.id}
              todoItem={todoItem}
              onRemoveTodo={onRemoveTodo}
              onToggleCompleted={onToggleCompleted}
              index={itemIndex++}
            />
          ) : todoFilter === "completed" && todoItem.completed ? (
            <TodoListItem
              key={todoItem.id}
              todoItem={todoItem}
              onRemoveTodo={onRemoveTodo}
              onToggleCompleted={onToggleCompleted}
              index={itemIndex++}
            />
          ) : todoFilter === "uncompleted" && !todoItem.completed ? (
            <TodoListItem
              key={todoItem.id}
              todoItem={todoItem}
              onRemoveTodo={onRemoveTodo}
              onToggleCompleted={onToggleCompleted}
              index={itemIndex++}
            />
          ) : (
            <></>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
