import { Trash } from "@phosphor-icons/react"

import styles from "./Todo.module.css"

import { TodoType } from "../App"

interface TodoProps {
  todo: TodoType,
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
}

export function Todo({ todo, onToggleTodo, onDeleteTodo }: TodoProps) {
  return (
    <div className={styles.todo}>
      <button
        type="button"
        className={todo.completed ? styles.checked : styles.unchecked}
        onClick={() => onToggleTodo(todo.id)}
      >
        <span></span>
      </button>

      <p>{todo.content}</p>
      
      <button
        type="button"
        className={styles.delete}
        onClick={() => onDeleteTodo(todo.id)}
      >
        <Trash size={16} weight="bold" />
      </button>
    </div>
  )
}