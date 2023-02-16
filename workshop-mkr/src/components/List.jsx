import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

export const List = ({list,circle,pen,trash,cancel}) => {

  const navigate = useNavigate()
  const {handleLogOut} = useContext(AuthContext)

  const goHome = (e)=>{
    e.preventDefault()
    navigate("/home")
  }

  const TaskList= (arr) => {
    return arr.map((item)=>{
      return <li key={item.id} id={item.id}><i className={item.circle} onClick={circle}></i><p style={{textDecorationLine: item.decoration}}>{item.title}</p><div id="container"><i className={item.pen} onClick={pen}></i><i className={item.trash} onClick={trash}></i></div><input id="inputEdit" type="text"></input><button id="cancelButton" onClick={cancel}>x</button></li>
    })
  }
  return (
    <>
    <NavLink onClick={goHome}>Home</NavLink>
    <NavLink onClick={handleLogOut}>SignOut</NavLink>
      <ul>
        {TaskList(list)}
      </ul>
      
    </>
    
  )
}