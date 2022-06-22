import { createContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loadingLocalStorage, setLoadingLocalStorage] = useState(true)  
    
    const navigate = useNavigate();

    useEffect(() => {
        const getLocalUser = localStorage.getItem('user')

        console.log(getLocalUser)

        if (getLocalUser) {
            setuser(JSON.parse(getLocalUser))
        }

        setLoadingLocalStorage(false)
    }, [])
    

    const signIn = async (email, password) => {
        const response = await api.post("/login", {
            email, password
        })

        try {
            setuser(response.data)
            localStorage.setItem("user", JSON.stringify(response.data))

            navigate('/')
        } catch (error) {
            alert(response.data.error)
        }
    }

    const signOut = () => {
        setuser(null)
        navigate('/login')
    }

    return (
        <LoginContext.Provider value={{
            user,
            signed: !!user,
            loadingLocalStorage,
            signIn,
            signOut
        }}>
            {children}
        </LoginContext.Provider>
    )
}