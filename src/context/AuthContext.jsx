import { createContext, useContext, useState } from "react"


const AuthContext = createContext()

export default function AuthProvider({children}) {
    const[user , setUser] = useState(null)
    const[showSignIn, setShowSignIn] = useState(false)
    const[showSignUp,setShowSignUp] =  useState(false)

    function login(phone){
     setUser({name: 'User', phone, initials:phone.slice(-2)})
     setShowSignIn(false)
    }

    function signup(){
        setShowSignUp(true)
    }

    function logout(){
        setUser(null)
    }

  return (
  <AuthContext.Provider value={{user, login,logout,showSignIn,setShowSignIn, showSignUp,setShowSignUp,signup}} >
   {children}

  </AuthContext.Provider>
  )
}


export function useAuth(){
    return useContext(AuthContext)
}