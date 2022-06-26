import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonCnt1, LinkButton, PageTitle, Paragraph } from '../../assets/styles/Shared'
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
        <PageTitle>Lista de usuários</PageTitle>
        <ButtonCnt1>
          <LinkButton to="/usuarios/novo-usuario">Adicionar novo usuário</LinkButton>
        </ButtonCnt1>
        {users !== [] ?
          <ul>
            {users.map((user) => {
              return(
                  <li key={user._id}><Link to={`/usuarios/${user._id}`}>{user.name}</Link></li>
                )})
              }
          </ul>
        : <Paragraph>Não existem usuários cadastrados.</Paragraph>
      }
      </Main>
    </>
  )
}
