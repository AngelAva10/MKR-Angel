import React, { useState } from 'react'
import { TaskForm } from '../Components/Tasks/TaskForm'
import { TaskList } from '../Components/Tasks/TaskList'
import { useLocalStorage } from '../Modules/uselocalStorage'

export const Home = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [text, setText] = useState("")
  const [list, setList] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState()
  const [textEdit, setTextEdit] = useState()

  const setInputValue = (e) => {
    e.preventDefault();
    setText(e.target.value);
  }
  const setEditValue = (e) => {
    e.preventDefault();
    setTextEdit(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = text;
    const id = Number(Date.now())
    console.log(text)
    if (editMode) {
      console.log(editId)
      const editedTasks = tasks.map((task) => {
        if (task.id === editId) {
          return { ...task, title: textEdit }
        }
        return task
      })
      console.log(editedTasks)
      setTasks(editedTasks)
      setEditMode(false)
      setEditId(null)
    } else {
      setTasks([...tasks, { id, title, finish: false }])
    }
    //   finished()
    //   pending()
  }

  const handleStatus = (id) => {

  }
  const handleEdit = (id) => {
    setEditMode(true)
    setEditId(id)
  }
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => {
      return task.id !== id
    }))
  }
  return (
    <div>
      <TaskForm handleSubmit={handleSubmit} setInputValue={setInputValue} text={text} />
      <TaskList tasks={tasks} handleStatus={handleStatus} handleEdit={handleEdit} handleDelete={handleDelete} handleSubmit={handleSubmit} setInputValue={setEditValue} editMode={editMode} editId={editId} textEdit={textEdit} />
    </div>
  )
}