import { useEffect, useState } from "react"

export const useLocalStorage = (key,initialValue=null)=>{
    const [value,setValue] = useState(()=>{
        try{
            const saved = localStorage.getItem(key)
            return saved ? JSON.parse(saved) : initialValue
        }catch(err){
            console.log(err)
            return initialValue
        }
    })
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])

    return [value,setValue]
}