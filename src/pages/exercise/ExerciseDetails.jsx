import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";

export default function ExerciseDetails() {
  let { exerciseId } = useParams();
    let navigate = useNavigate(); 

    const [exercise, setExercise] = useState([])

    useEffect(() => {
        api.get(`/exercicios/${exerciseId}`).then((response) => {
            setExercise(response.data)
        })

    }, [])

    function updateExercise() {
        navigate(`/exercicios/editar-exercicio/${exercise._id}`)
    }
    
    async function deleteExercise() {
        await api.delete(`/exercicios/deletar-exercicio/${exercise._id}`)
        .then(() => {
          alert('Exercício deletado com sucesso')
          navigate("/exercicios")
        })
    }
  return (
    <>
      <Header />
      <Main>
        <h1>Detalhes do exercício</h1>
        <div>
            <button onClick={updateExercise}>Alterar exercício </button>
            <button onClick={deleteExercise}>Deletar exercício</button>
        </div>
        <p>Nome do exercício: {exercise.name} </p>
        <p>Grupo muscular: {exercise.muscleGroup}</p>
        <p>Valência: {exercise.valence}</p>
        <p>Aparelho: {exercise.equipment}</p>
      </Main>
    </>
  )
}
