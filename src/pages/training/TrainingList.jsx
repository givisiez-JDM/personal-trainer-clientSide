import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'

export default function TrainingList() {
  const [training, setTraining] = useState([])

  useEffect(() => {
    api.get("/treinos").then((response) => {
      setTraining(response.data)
    })

  }, [])  

  return (
    <>
      <Header />
      <Main>
        <h1>Lista de Sessão de treino</h1>
        <Link to="/clientes/novo-cliente">Adicionar nova sessão de treino</Link>
        {training ? 
          <ul>
            {training.map((training) => {
              return(
                  <li key={training.id}>{training.name}</li>
                )})
              }
          </ul>
        : <p>Você ainda não tem treinos agendados.</p>
      }
      </Main>
    </>
  )
}
