
import {Login} from "./Components/Login"
import { Navigate, Route,Routes } from 'react-router';
import { useNavigate } from "react-router";
import { List } from "./Components/List";
import { Input } from "./Components/Input";
import { useContext, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import { Home } from "./Pages/Home";



function App() {
  const [list,setList] = useState([]);
 const [pendig,setPending] = useState([])
 const [finish,setFinish] = useState([])
 const navigate = useNavigate()
 const {logged,setLogged} = useContext(AuthContext)

 let pendingList = JSON.parse(localStorage.getItem("Pending") || "[]")
  let finishList = JSON.parse(localStorage.getItem("Finished") || "[]")
  let TaskList = JSON.parse(localStorage.getItem("TaskList") || "[]")
  
  let idTracker;
  let count = 0
  

  


  function finished(){
    TaskList = JSON.parse(localStorage.getItem("TaskList"))
    finishList = TaskList.filter((item)=>{
      return item.finish === "yes"
    })
    localStorage.setItem("Finished", JSON.stringify(finishList))
    setFinish(JSON.parse(localStorage.getItem("Finish") || "[]"))
    console.log("Finish llamado")
  }


  function pending(){
    TaskList = JSON.parse(localStorage.getItem("TaskList"))
    pendingList = TaskList.filter((item)=>{
      return item.finish === "no"
    })
    localStorage.setItem("Pending", JSON.stringify(pendingList))
    setPending(JSON.parse(localStorage.getItem("Pending") || "[]"))
    console.log("Pending llamado")
  }



  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      
            {/* <Route path='/home' element={logged ? <Input pendingList={pendingList} finishList={finishList} handleSubmit={handleSubmit} setInputValue={setInputValue} text={text}/> : <Navigate to="/"/>}/> */}
      <Route path='/home' element={<Home/>}/>
      <Route path='/list' element={logged ? <List list={TaskList}/> : <Navigate to="/"/>}/>
      <Route path='*' element={<h2>404 Error</h2>}/>
    </Routes>
  );
}

export default App;