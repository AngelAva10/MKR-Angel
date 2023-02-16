import React from 'react'
import Button from '@mui/material/Button';

export const TaskEditForm = ({handleSubmit,setInputValue,textEdit,handleCancel,text}) => {
  return (
    <form onSubmit={handleSubmit}>
        <input id="inputText" type="text" onChange={setInputValue} value={textEdit} placeholder={text}></input>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </form>
  )
}