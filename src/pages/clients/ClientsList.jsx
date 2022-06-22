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

  console.log(clients.length)

  return (
    <>
      <Header />
      <Main>
        <h1>Lista de clientes</h1>
        {clients.length <= 0  
          && <p>Você ainda não tem clientes.</p>
        }
        <Link to="/clientes/novo-cliente">Adicionar novo cliente</Link>
        {clients.length > 0 &&
          <ul>
            {clients.map((client) => {
              return(
                  <li key={client.id}>{client.name}</li>
                )})
              }
          </ul>
        }
      </Main>
    </>
  )
}
