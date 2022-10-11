import { Check, Trash } from "phosphor-react"

import styles from "./Todo.module.css"

export function Todo({ todo, completeTodo, deleteTodo }) {
  return (
    <div className={!todo.isCompleted ? styles.todo : `${styles.todo} ${styles.completed}`}>
      <button
        title="Completar tarefa"
        className={styles.check}
        onClick={() => completeTodo(todo.id)}
      >
        {todo.isCompleted && <Check size={12} />}
      </button>

      <p>{todo.content}</p>

      <button
        title="Deletar tarefa"
        className={styles.delete}
        onClick={() => deleteTodo(todo.id)}
      >
        <Trash size={18} weight="bold" />
      </button>
    </div>
  )
}