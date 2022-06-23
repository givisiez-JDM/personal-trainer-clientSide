import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContext'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'

export default function ClientsList() {
  const [clients, setclients] = useState([])
  const { loggedUser } = useContext(LoginContext);

  useEffect(() => {
    if (loggedUser.isAdmin) {
      api.get(`/clientes/lista`)
      .then((response) => {
        setclients(response.data)
      })
    } else {
      api.get(`/clientes/lista/${loggedUser._id}`)
      .then((response) => {
        setclients(response.data)
      })
    }

  }, [])  

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
                  <li key={client._id}><Link to={`/clientes/${client._id}`}>{client.name}</Link></li>
                )})
              }
          </ul>
        }
      </Main>
    </>
  )
}
