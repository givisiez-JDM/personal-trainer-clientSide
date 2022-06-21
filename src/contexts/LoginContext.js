import { createContext, useState } from 'react'
import { api } from '../services/api'

export const LoginContext = createContext({})

export const LoginProvider = ({ children }) => {
    const [user, setuser] = useState({
        name: "",
        isAdmin: false,
        password: "",
        email: ""
    }) 
    
    const [signed, setsigned] = useState(false)

    const signIn = async (email, password) => {
        const response = await api.post("/login", {
            email, password
        })

        try {
            setuser({
                name: response.data.name,
                isAdmin: response.data.isAdmin,
                password: response.data.password,
                email: response.data.email
            })
            setsigned(!!user)

            console.log(user)
            console.log(signed)
        } catch (error) {
            alert(response.data.error)
        }
    }

    const signOut = () => {
        setuser({
            name: "",
            isAdmin: false,
            password: "",
            email: ""
        })
        setsigned(!!user)
    }

    return (
        <LoginContext.Provider value={{
            user,
            signed,
            signIn,
            signOut
        }}>
            {children}
        </LoginContext.Provider>
    )
}