import { createContext, useEffect, useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null)
    const [loadingLocalStorage, setLoadingLocalStorage] = useState(true)  
    
    const navigate = useNavigate();

    useEffect(() => {
        const getLocalUser = localStorage.getItem('user')

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

    // const signInWithGoogle = () => {
    //     window.open(
    //         // `${process.env.REACT_APP_API_URL}/auth/google/callback`,
    //         `https://personal-and-training.herokuapp.com/auth/google/callback`,
    //         "_self"
    //     )
    //     navigate('/')
    //   }

    const signOut = () => {
        setLoggedUser(null)
        localStorage.removeItem('user')
        navigate('/login')
    }

    // const signOutWithGoogle = () => {
	// 	// window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	// 	window.open(`https://personal-and-training.herokuapp.com/`, "_self");
    //     navigate('/login')
	// };

    return (
        <LoginContext.Provider value={{
            loggedUser,
            signed: !!loggedUser,
            loadingLocalStorage,
            signIn,
            // signInWithGoogle,
            signOut,
            // signOutWithGoogle
        }}>
            {children}
        </LoginContext.Provider>
    )
}