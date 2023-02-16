import { useNavigate } from 'react-router';
import { Button } from './Button';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export const Input = ({pendingList,finishList,handleSubmit,setInputValue,text}) => {
  const navigate = useNavigate()
  const {logged,handleLogin,handleLogOut} = useContext(AuthContext)


  const goList = (e)=>{
    e.preventDefault()
    navigate("/list")
  }
if(text === undefined) return <div>Loading...</div>
  return (
    <>
    <NavLink onClick={handleLogOut}>Sign Out</NavLink>
      <h2>To do List with REACT</h2>
      <p>Pendientes:{pendingList.length} Terminadas:{finishList.length}</p>
      <form onSubmit={handleSubmit}>
        <input id="inputText" type="text" onChange={setInputValue} value={text} placeholder="Task name"></input>
        <Button text="+"/>
      </form>
      <NavLink onClick={goList}>Task list</NavLink>
    </>
    
  )
}