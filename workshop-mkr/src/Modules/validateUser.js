import {user as User} from "./users"

export const validateUser = (user)=>{
    if(user.userName === "" || user.password === ""){
        return false
    }else if(user.userName === User.userName || user.password === User.password){
        return true
    }
    return false
}