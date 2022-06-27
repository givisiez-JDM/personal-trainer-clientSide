import { Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonCnt1, LinkButton, PageTitle, Paragraph, WrittenLink } from '../../assets/styles/Shared'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import { api } from '../../services/api'

export default function ExerciseList() {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
      api.get("/exercicios").then((response) => {
        setExercises(response.data)
      })
    }, [])

  return (
    <>
      <Header />
      <Main>
      <PageTitle>Lista de exercícios</PageTitle>
      <ButtonCnt1>
        <LinkButton to="/exercicios/novo-exercicio">Adicionar novo exercício</LinkButton>
      </ButtonCnt1>
      {exercises.length > 0 ?
      <TableContainer>
          <Table>
            <TableHead>
                <tr>
                    <th>Nome</th>
                    <th>Grupo muscular</th>
                    <th>Valência</th>
                    <th>Equipamento</th>
                    <th>Exercício</th>
                </tr>
            </TableHead>
            <TableBody>
              {exercises.map((exercise) => {
                return(
                  <tr key={exercise._id}>
                    <TableCell align='center'>{exercise.name}</TableCell>
                    <TableCell align='center'>{exercise.muscleGroup}</TableCell>
                    <TableCell align='center'>{exercise.valence}</TableCell>
                    <TableCell align='center'>{exercise.equipment}</TableCell>
                    <TableCell align='center'><WrittenLink to={`/exercicios/${exercise._id}`}>Ver dados do exercício</WrittenLink></TableCell>
                  </tr>
                  )})
                }
            </TableBody>
          </Table>
      </TableContainer>
        : <Paragraph>Não existem exercícios cadastrados.</Paragraph>
      }
      </Main>
    </>
  )
}
