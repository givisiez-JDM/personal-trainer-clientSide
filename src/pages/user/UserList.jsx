import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'

export default function UserList() {
    const [users, setusers] = useState([])

    useEffect(() => {
      api.get("/usuarios").then((response) => {
        setusers(response.data)
      })
  
    }, [])  
  return (
    <>
        <Header />
        <Main>
        <h1>Lista de usuários</h1>
        <Link to="/usuarios/novo-usuario">Adicionar novo usuário</Link>
        {users ? 
          <ul>
            {users.map((user) => {
              return(
                  <li key={user.id}>{user.name}</li>
                )})
              }
          </ul>
        : <p>Não existe usuários cadastrados.</p>
      }
      </Main>
    </>
  )
}
