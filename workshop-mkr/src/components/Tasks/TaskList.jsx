import React from 'react'
import { TaskItem } from './TaskItem'

export const TaskList = ({ tasks, handleStatus, handleEdit, handleDelete,handleSubmit,setInputValue,editMode,editId,textEdit}) => {
    console.log(tasks)
    return (
        <ul>
            {tasks.map((task) => {
                return <li key={task.id}>
                    <TaskItem
                        task={task}
                        handleStatus={handleStatus}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleSubmit={handleSubmit} 
                        setInputValue={setInputValue}
                        editMode={editMode}
                        editId={editId}
                        textEdit={textEdit}
                    />
                </li>
            })}
        </ul>
    )
}