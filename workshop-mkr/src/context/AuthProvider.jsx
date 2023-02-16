import { useLocalStorage } from '../Modules/uselocalStorage'
import { validateUser } from '../Modules/validateUser'
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