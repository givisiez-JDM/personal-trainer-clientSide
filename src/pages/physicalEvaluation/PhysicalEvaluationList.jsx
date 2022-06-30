import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LinkButton, PageTitle, Paragraph } from '../../assets/styles/Shared'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'
import { dateTransform } from '../../helpers/dateHelpers'

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
          && <Paragraph>Você ainda não tem avaliações físicas.</Paragraph>
        }
        {evaluations.length > 0 &&
          <ul>
            {evaluations.map((evaluation) => {
              return(
                  <li key={evaluation._id}><Link to={`/avaliacao/${evaluation._id}`}>{dateTransform(evaluation.date)} - Personal: {evaluation.personalTrainerName}, Cliente: {evaluation.clientName}</Link></li>
                )})
              }
          </ul>
        }
      </Main>
    </>
  )
}
