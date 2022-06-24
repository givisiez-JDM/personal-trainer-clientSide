import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContext'
import { dateTransform } from '../../helpers/dateHelpers'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'

export default function TrainingList() {
  const [trainings, setTrainings] = useState([])
  const { loggedUser } = useContext(LoginContext);

  useEffect(() => {
    api.get(`/treinos/lista/${loggedUser._id}`).then((response) => {
      setTrainings(response.data)
    })

  }, [])  

  return (
    <>
      <Header />
      <Main>
        <h1>Lista de Sessão de treino</h1>
        <Link to="/treinos/novo-treino">Adicionar nova sessão de treino</Link>
        {trainings.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Observações</th>
                <th>Treino</th>
              </tr>
            </thead>
            <tbody>
              {trainings.map((training) => {
                return(
                  <tr key={training._id}>
                    <td>{dateTransform(training.date)}</td>
                    <td>{training.clientName}</td>
                    <td>{training.notes}</td>
                    <td><Link to={`/treinos/${training._id}`}>Ver dados do treino</Link></td>
                  </tr>
                  )})
                }
            </tbody>
          </table>
        : <p>Não existem treinos cadastrados.</p>
      }
      </Main>
    </>
  )
}
