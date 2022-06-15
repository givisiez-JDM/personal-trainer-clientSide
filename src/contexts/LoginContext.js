import { createContext, useState } from 'react'
import { api } from '../services/api'

export const LoginContext = createContext({})

export const LoginProvider = ({ children }) => {
    const [user, setuser] = useState("")    

    const signIn = async (email, password) => {
        const response = await api.post("/login", {
            email, password
        })

        if (response.data.error) {
            alert(response.data.error)
        } else {
            setuser(response.data)
        }
    }

    return (
        <LoginContext.Provider value={{
            user,
            signed: !!user,
            signIn
        }}>
            {children}
        </LoginContext.Provider>
    )
}