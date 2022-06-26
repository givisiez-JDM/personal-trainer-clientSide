import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LinkButton, PageTitle } from '../../assets/styles/Shared'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'

export default function PhysicalEvaluationList() {
  const [evaluations, setEvaluations] = useState([])

  useEffect(() => {
    api.get(`/avaliacao/lista`)
    .then((response) => {
      setEvaluations(response.data)
    })

  }, [])  

  return (
    <>
      <Header />
      <Main>
        <PageTitle>Lista de avaliações físicas</PageTitle>
        {evaluations.length <= 0  
          && <p>Você ainda não tem avaliações físicas.</p>
        }
        <LinkButton to="/avaliacao/novoa-avaliacao">Adicionar nova avaliação física</LinkButton>
        {evaluations.length > 0 &&
          <ul>
            {evaluations.map((evaluation) => {
              return(
                  <li key={evaluation._id}><Link to={`/avaliacao/${evaluation._id}`}>{evaluation.createdAt} - {evaluation.personalTrainerId}, {evaluation.clientId}</Link></li>
                )})
              }
          </ul>
        }
      </Main>
    </>
  )
}
