import { Hidden, Table, TableBody, TableHead, TableCell } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ButtonCnt1, LinkButton, PageSubtitle, PageTitle, Paragraph, WrittenLink } from '../../assets/styles/Shared'
import { LoginContext } from '../../contexts/LoginContext'
import { dateTransform } from '../../helpers/dateHelpers'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'

export default function TrainingList() {
  const [trainings, setTrainings] = useState([])
  const { loggedUser } = useContext(LoginContext);

  useEffect(() => {
    loggedUser.isAdmin ?
    api.get(`/treinos/lista`).then((response) => {
      setTrainings(response.data)
    })
    :
    api.get(`/treinos/lista/${loggedUser._id}`).then((response) => {
      setTrainings(response.data)
    })

  }, [])  

  return (
    <>
      <Header />
      <Main>
        <PageTitle>Sessão de treino</PageTitle>
        <ButtonCnt1>
          <LinkButton to="/treinos/novo-treino">Adicionar nova sessão de treino</LinkButton>
        </ButtonCnt1>
        <PageSubtitle>Treinos agendados</PageSubtitle>
        {trainings.length > 0 ?
          <Table>
            <TableHead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <Hidden smDown>
                  <th>Observações</th>
                </Hidden>
                <th>Treino</th>
              </tr>
            </TableHead>
            <TableBody>
              {trainings.map((training) => {
                return(
                  <tr key={training._id}>
                    <TableCell align='center'>{dateTransform(training.date)}</TableCell>
                    <TableCell align='center'>{training.clientName}</TableCell>
                    <Hidden smDown>
                      <TableCell align='center'>{training.notes}</TableCell>
                    </Hidden>
                    <TableCell align='center'><WrittenLink to={`/treinos/${training._id}`}>Ver dados do treino</WrittenLink></TableCell>
                  </tr>
                  )})
                }
            </TableBody>
          </Table>
        : <Paragraph>Não existem treinos cadastrados.</Paragraph>
      }
      </Main>
    </>
  )
}
