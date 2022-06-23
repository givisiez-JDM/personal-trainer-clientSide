import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
        <h1>Lista de usuários</h1>
        <Link to="/exercicios/novo-exercicio">Adicionar novo exercício</Link>
        {exercises.length > 0 ?
          <ul>
            {exercises.map((exercise) => {
              return(
                  <li key={exercise._id}><Link to={`/exercicios/${exercise._id}`}>{exercise.name}</Link></li>
                )})
              }
          </ul>
        : <p>Não existem exercícios cadastrados.</p>
      }
      </Main>
    </>
  )
}
