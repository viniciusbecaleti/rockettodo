import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import { Header } from "./components/Header"
import { Todo } from "./components/Todo"

import { PlusCircle } from "phosphor-react"

import styles from "./App.module.css"

import "./global.css"

export function App() {
  const [todos, setTodos] = useState([])
  const [totalTodoCreated, setTotalTodoCreated] = useState(0)
  const [totalTodoCompleted, setTotalTodoCompleted] = useState(0)
  const [newTodoText, setNewTodoText] = useState("")

  function handleCreateNewTodo(event) {
    event.preventDefault()
    
    const todo = {
      id: uuidv4(),
      content: newTodoText,
      isCompleted: false
    }

    setTodos([...todos, todo])
    setNewTodoText("")
  }

  function completeTodo(id) {
    setTodos((prev) => prev.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }

      return todo
    }))
  }

  function deleteTodo(id) {
    const todosFiltered = todos.filter(todo => todo.id != id)
    setTodos(todosFiltered)
  }

  useEffect(() => {
    setTotalTodoCreated(todos.length)
  }, [todos])

  useEffect(() => {
    const todoCompleted = todos.filter(todo => todo.isCompleted === true)
    setTotalTodoCompleted(todoCompleted.length)
  }, [todos])

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <form onSubmit={handleCreateNewTodo} className={styles.todoForm}>
            <input
              value={newTodoText}
              onChange={({ target }) => setNewTodoText(target.value)}
              placeholder="Adicione uma nova tarefa"
            />

            <button type="submit">
              Criar

              <PlusCircle
                size={18}
                weight="bold"
              />
            </button>
          </form>

          <div className={styles.todos}>
            <div className={styles.todosInfo}>
              <div className={styles.total}>
                <strong>Tarefas criadas</strong>
                <span>{totalTodoCreated}</span>
              </div>

              <div className={styles.completed}>
                <strong>Concluídas</strong>
                <span>{totalTodoCompleted} de {totalTodoCreated}</span>
              </div>
            </div>

            <div className={styles.todosList}>
              {todos.map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  completeTodo={completeTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}