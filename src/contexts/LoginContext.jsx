import { createContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null)
    const [loadingLocalStorage, setLoadingLocalStorage] = useState(true)  
    
    const navigate = useNavigate();

    useEffect(() => {
        const getLocalUser = localStorage.getItem('user')

        console.log(getLocalUser)

        if (getLocalUser) {
            setLoggedUser(JSON.parse(getLocalUser))
        }

        setLoadingLocalStorage(false)
    }, [])
    

    const signIn = async (email, password) => {
        const response = await api.post("/login", {
            email, password
        })

        try {
            setLoggedUser(response.data)
            localStorage.setItem("user", JSON.stringify(response.data))

            navigate('/')
        } catch (error) {
            alert(response.data.error)
        }
    }

    const signOut = () => {
        setLoggedUser(null)
        navigate('/login')
        localStorage.removeItem('user')
    }

    return (
        <LoginContext.Provider value={{
            loggedUser,
            signed: !!loggedUser,
            loadingLocalStorage,
            signIn,
            signOut
        }}>
            {children}
        </LoginContext.Provider>
    )
}