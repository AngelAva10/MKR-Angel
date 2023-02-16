import React from 'react'
import Button from '@mui/material/Button';


export const TaskForm = ({handleSubmit,setInputValue,text}) => {
  return (
    <form onSubmit={handleSubmit}>
        <input id="inputText" type="text" onChange={setInputValue} value={text} placeholder="Task name"></input>
        <Button type="submit">Save</Button>
      </form>
  )
}