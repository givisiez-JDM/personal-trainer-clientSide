import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { dateTransform } from "../../helpers/dateHelpers";
import Header from "../../layouts/header/Header"
import Main from "../../layouts/main/Main"
import { api } from "../../services/api"

export default function TrainingDetails() {
  let { trainingId } = useParams();
  let navigate = useNavigate(); 

  const [training, setTraining] = useState({
    date: null,
    personalTrainerId: "",
    personalTrainerName: "",
    clientId: '',
    clientName: '',
    exercises: [],
    notes: ''
  })

  useEffect(() => {
    api.get(`/treinos/${trainingId}`).then((response) => {

      setTraining({
        date: response.data.date,
        personalTrainerId: response.data.personalTrainerId,
        personalTrainerName: response.data.name,
        clientId: response.data.clientId,
        clientName: response.data.clientName,
        exercises: response.data.exercises,
        notes: response.data.notes
      })
    })

  }, [])
  
  function updateTraining() {
    navigate(`/treinos/editar-treino/${trainingId}`)
  }

  async function deleteTraining() {
    await api.delete(`/treinos/deletar-treino/${trainingId}`)
    .then(() => {
      alert('Treino deletado com sucesso')
      navigate("/treinos")
    })
}

  return (
    <>
      <Header />
      <Main>
        <header>
          <h1>Detalhes do Treino</h1>
          <button onClick={updateTraining}>Alterar dados do treino</button>
          <button onClick={deleteTraining}>Deletar treino</button>
          <Link to="/treinos">Voltar para lista de treinos</Link>
        </header>
        <p>Data do treino: {dateTransform(training.date)} </p>
        <p>Cliente: {training.clientName} </p>
        <p>Observações: {training.notes} </p>
        <h2>Lista de exercícios</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Grupo muscular</th>
              <th>Valência</th>
              <th>Equipamento</th>
              <th>Série</th>
              <th>Repetição</th>
              <th>Carga</th>
            </tr>
          </thead>
          <tbody>
            {training.exercises.map((exercise) => {
              return(
                <tr key={exercise.name}>
                  <td>{exercise.name}</td>
                  <td>{exercise.muscleGroup}</td>
                  <td>{exercise.valence}</td>
                  <td>{exercise.equipment}</td>
                  <td>{exercise.serie}</td>
                  <td>{exercise.repetition}</td>
                  <td>{exercise.load}</td>
                </tr>
                )})
              }
          </tbody>
        </table>
      </Main>
    </>
  )
}
