import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'

export default function ClientsList() {
  const [clients, setclients] = useState([])

  useEffect(() => {
    api.get("/clientes").then((response) => {
      setclients(response.data)
    })

  }, [])  

  return (
    <>
      <Header />
      <Main>
        <h1>Lista de clientes</h1>
        <Link to="/clientes/novo-cliente">Adicionar novo cliente</Link>
        {clients ? 
          <ul>
            {clients.map((client) => {
              return(
                  <li key={client.id}>{client.name}</li>
                )})
              }
          </ul>
        : <p>Você ainda não tem clientes.</p>
      }
      </Main>
    </>
  )
}
