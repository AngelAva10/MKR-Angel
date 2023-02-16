import { useLocalStorage } from '../modules/uselocalStorage'
import { validateUser } from '../modules/validateUser'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({children}) => {
    const [logged,setLogged] = useLocalStorage("user",false)

    const handleLogin = ({email,password})=>{
      const isValidUser = validateUser({email,password})
      setLogged(isValidUser)
    }
    const handleLogOut = ()=>{
      setLogged(false)
    }

  return <AuthContext.Provider value={{logged,handleLogin,handleLogOut}}>{children}</AuthContext.Provider>
}