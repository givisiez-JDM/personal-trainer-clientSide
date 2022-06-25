import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { dateInverted } from "../../helpers/dateHelpers";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";


export default function TrainingUpdate() {
  let navigate = useNavigate();
  const { loggedUser } = useContext(LoginContext);
  let { trainingId } = useParams();

  const [clientsDB, setclientsDB] = useState([])
  const [exercisesDB, setExercisesDB] = useState([])
  const [newExercises, setNewExercises] = useState([])
  const [toggleAddExercise, settoggleAddExercise] = useState(false)
  
  const [selectedExercise, setSelectedExercise] = useState([{
    name: "",
    muscleGroup: "",
    valence: "",
    equipment: "",
  }])

  const [exerciseSession, setExerciseSession] = useState([{
    serie: 0,
    repetition: 0,
    load: 0
  }])

  const [training, setTraining] = useState({
    date: null,
    personalTrainerId: loggedUser._id,
    personalTrainerName: loggedUser.name,
    clientId: '',
    clientName: '',
    exercises: [],
    notes: ''
  })

  useEffect(() => {
    api.get(`/clientes/lista/${loggedUser._id}`).then((response) => {
      setclientsDB(response.data)
    })

    api.get("/exercicios").then((response) => {
      setExercisesDB(response.data)
    })

    api.get(`/treinos/${trainingId}`).then((response) => {
      setTraining(response.data)
      setNewExercises(response.data.exercises)
    })

  }, [])

  function createTraining(e) {
    e.preventDefault();

    api.put(`/treinos/editar-treino/${trainingId}`, {
      date: training.date,
      personalTrainerId: training.personalTrainerId,
      personalTrainerName: training.personalTrainerName,
      clientId: training.clientId,
      clientName: training.clientName,
      exercises: newExercises,
      notes: training.notes
    }).then(() => {
        alert(`Treino atualizado com sucesso!`)
        navigate(`/treinos/${trainingId}`)
    })
  }

  const updateFieldTraining = e => {
    setTraining({
      ...training,
      [e.target.name]: e.target.value
    });
  }

  const updateFieldClient = e => {
    const client = clientsDB.find(client => client._id === e.target.value)
    
    setTraining({
      ...training,
      clientId: client._id,
      clientName: client.name
    });
  }
  
    const addExercise = () => {
      let newExercise = ({
        name: selectedExercise.name,
        muscleGroup: selectedExercise.muscleGroup,
        valence: selectedExercise.valence,
        equipment: selectedExercise.equipment,
        serie: exerciseSession.serie,
        repetition: exerciseSession.repetition,
        load: exerciseSession.load
      })
      
      setNewExercises(oldArray => [...oldArray, newExercise])
      console.log("exercícios adicionados", newExercises)
    }

  const updateFieldExercise = e => {
    setExerciseSession({
      ...exerciseSession,
      [e.target.name]: e.target.value
    });
  }

  const updateSelectedExercise = (e) => {
    const exercise = exercisesDB.find(exercise => exercise.name === e.target.value)

    setSelectedExercise({
      name: exercise.name,
      muscleGroup: exercise.muscleGroup,
      valence: exercise.valence,
      equipment: exercise.equipment
    });
  }

  const handleAddExercise = ()=> {
    settoggleAddExercise(!toggleAddExercise)
  }

  const handleRemoveExercise = ()=> {
    setNewExercises([])
  }

  return (
    <>
      <Header />
      <Main>
        <header>
            <h1>Atualizar Treino</h1>
        </header>
        <div>
          <div>
              <label htmlFor="date">Data do treino: </label>
              <input type="date" name="date" id="date" onChange={updateFieldTraining} required value={dateInverted(training.date)} />
          </div>
          <div>
              <label htmlFor="clientId">Cliente: </label>
              <select name="clientId" id="clientId" onChange={updateFieldClient} required value={training.clientName}>
                {clientsDB.map(client => 
                  <option key={client._id} value={client._id}>{client.name}</option>
                )}
              </select>
          </div>
          <div>
              <label htmlFor="notes">Observações: </label>
              <textarea name="notes" id="notes" onChange={updateFieldTraining} value={training.notes} />
          </div>
          <div>
            <h2>Lista de exercícios</h2>
            <button onClick={handleAddExercise}>Adicionar exercício</button>
            <button onClick={handleRemoveExercise}>Remover todos os exercício</button>
            {toggleAddExercise &&
              <div>
                <h2>Adicionar exercício</h2>
                <div>
                  <div>
                    <label htmlFor="exercise.name">Exercício: </label>
                    <select name="exercise.name" id="exercise.name" onChange={updateSelectedExercise} defaultValue="default" required>
                      <option key="default" value="default" disabled selected>Escolha seu o exercício</option>
                      {exercisesDB.map(exercise => 
                        <option key={exercise._id}>{exercise.name}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="serie">Série: </label>
                    <input type="number" name="serie" id="serie" onChange={updateFieldExercise} required />
                  </div>
                  <div>
                    <label htmlFor="repetition">Repetição: </label>
                    <input type="number" name="repetition" id="repetition" onChange={updateFieldExercise} required />
                  </div>
                  <div>
                    <label htmlFor="load">Carga: </label>
                    <input type="number" name="load" id="load" onChange={updateFieldExercise} required />
                  </div>
                  <button onClick={addExercise}>Adicionar exercício</button>
                </div>
              </div>
            }
            {newExercises.length > 0
            ? <table>
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
                {newExercises.map((exercise) => {
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
            : <p>Você ainda não adicionou exercícios</p> 
            }
          </div>
          <button onClick={createTraining}>Atualizar treino</button>
        </div>
      </Main>
    </>
  )
}
