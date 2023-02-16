import React from 'react'
import { TaskEditForm } from './TaskEditForm'

export const TaskItem = ({task,handleStatus,handleEdit,handleDelete,editMode,handleSubmit,setInputValue,editId,textEdit}) => {
    console.log({editMode,editId})
  return (
        
      <div>
        {editMode && editId===task.id ? <TaskEditForm handleSubmit={handleSubmit} setInputValue={setInputValue} text={task.title} textEdit={textEdit} /> :
        <>
          <i className={task.finish ? 'fas fa-circle' : 'far fa-circle' }  onClick={()=>handleStatus(task.id)}></i>
          <p style={{ textDecorationLine: task.decoration }}>{task.title}</p>
          <div id="container">
              <i className='fas fa-pen' onClick={()=>handleEdit(task.id)}></i>
              <i className='fas fa-trash' onClick={()=>handleDelete(task.id)}></i>
          </div>
        </>
          }
      </div>
  )
}