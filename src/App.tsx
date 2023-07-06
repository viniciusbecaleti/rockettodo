import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { PlusCircle } from "@phosphor-icons/react"
import { v4 as uuid } from "uuid"

import "./global.css"
import styles from "./App.module.css"

import clipboard from "./assets/clipboard.png"

import { Header } from "./components/Header"
import { Todo } from "./components/Todo"

export type TodoType = {
  id: string
  content: string
  completed: boolean
}

export function App() {
  const [todos, setTodos] = useState<TodoType[]>([])  
  const [newTodoText, setNewTodoText] = useState("")

  const total = todos.length
  const completed = todos.reduce((acc, todo) => {
    if (todo.completed) {
      return acc + 1
    }

    return acc
  }, 0)

  function handleNewTodoChange({ target }: ChangeEvent<HTMLInputElement>) {
    target.setCustomValidity("")
    setNewTodoText(target.value)
  }

  function handleNewTodoInvalid({ target }: InvalidEvent<HTMLInputElement>) {
    target.setCustomValidity("Esse campo é obrigatório")
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault()

    const newTodo = {
      id: uuid(),
      content: newTodoText,
      completed: false
    }

    setTodos(prev => [newTodo, ...prev])
    setNewTodoText("")
  }

  function toggleTodo(id: string) {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }

      return todo
    }))
  }

  function deleteTodo(id: string) {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <>
      <Header />

      <main>
        <form onSubmit={handleCreateNewTodo} className={styles.form}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTodoText}
            required
            onChange={handleNewTodoChange}
            onInvalid={handleNewTodoInvalid}
          />
          <button type="submit">
            Criar
            <PlusCircle size={18} weight="bold" />
          </button>
        </form>

        <div className={styles.list}>
          <div className={styles.list__header}>
            <div>
              <strong className="blue">Tarefas criadas</strong>
              <span>{total}</span>
            </div>

            <div>
              <strong className="purple">Concluidas</strong>
              <span>{completed}</span>
            </div>
          </div>

          {todos.length === 0 && (
            <div className={styles.list__empty}>
              <img src={clipboard} alt="" />
              
              <div>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          )}

          {todos.length > 0 && (
            <>
              {todos.map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onToggleTodo={toggleTodo}
                  onDeleteTodo={deleteTodo}
                />
              ))}
            </>
          )}
        </div>
      </main>
    </>
  )
}
