import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LinkButton, PageTitle } from '../../assets/styles/Shared'
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
      <LinkButton to="/exercicios/novo-exercicio">Adicionar novo exercício</LinkButton>
      {exercises.length > 0 ?
        <table>
          <thead>
              <tr>
                  <th>Nome</th>
                  <th>Grupo muscular</th>
                  <th>Valência</th>
                  <th>Equipamento</th>
                  <th>Exercício</th>
              </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => {
              return(
                <tr key={exercise._id}>
                  <td>{exercise.name}</td>
                  <td>{exercise.muscleGroup}</td>
                  <td>{exercise.valence}</td>
                  <td>{exercise.equipment}</td>
                  <td><Link to={`/exercicios/${exercise._id}`}>Ver dados do exercício</Link></td>
                </tr>
                )})
              }
          </tbody>
        </table>
        : <p>Não existem exercícios cadastrados.</p>
      }
      </Main>
    </>
  )
}
