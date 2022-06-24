import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";


export default function TrainingNew() {
  let navigate = useNavigate();
  const { loggedUser } = useContext(LoginContext);

  const [clientsDB, setclientsDB] = useState([])
  const [exercisesDB, setExercisesDB] = useState([])
  const [exercises, setexercises] = useState([])
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

  }, [])

  function createTraining(e) {
    e.preventDefault();

    api.post("/treinos/novo-treino", {
      date: training.date,
      personalTrainerId: training.personalTrainerId,
      personalTrainerName: training.personalTrainerName,
      clientId: training.clientId,
      clientName: training.clientName,
      exercises: exercises,
      notes: training.notes
    }).then(() => {
        alert(`Treino adicionado com sucesso!`)
        navigate(`/treinos`)
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

  const updateFieldExercise = e => {
    setExerciseSession({
      ...exerciseSession,
      [e.target.name]: e.target.value
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
    
    setexercises(oldArray => [...oldArray, newExercise])
  }

  const removeExercise = (name) => {  
    const filteredExercises = exercises.filter(exercise => exercise.name !== name)
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

  return (
    <>
      <Header />
      <Main>
        <header>
            <h1>Cadastro de Treino</h1>
        </header>
        <div>
          <div>
              <label htmlFor="date">Data do treino: </label>
              <input type="date" name="date" id="date" onChange={updateFieldTraining} required />
          </div>
          <div>
              <label htmlFor="clientId">Cliente: </label>
              <select name="clientId" id="clientId" onChange={updateFieldClient} required defaultValue="default">
                <option key="default" value="default" disabled selected>Escolha seu cliente</option>
                {clientsDB.map(client => 
                  <option key={client._id} value={client._id}>{client.name}</option>
                )}
              </select>
          </div>
          <div>
              <label htmlFor="notes">Observações: </label>
              <textarea name="notes" id="notes" onChange={updateFieldTraining} />
          </div>
          <div>
            <h2>Lista de exercícios</h2>
            {exercises.length > 0
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
                    <th></th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise) => {
                  return(
                    <tr key={exercise.name}>
                      <td>{exercise.name}</td>
                      <td>{exercise.muscleGroup}</td>
                      <td>{exercise.valence}</td>
                      <td>{exercise.equipment}</td>
                      <td>{exercise.serie}</td>
                      <td>{exercise.repetition}</td>
                      <td>{exercise.load}</td>
                      <td><button onClick={removeExercise(exercise.name)}>Remover exercício</button></td>
                    </tr>
                    )})
                  }
              </tbody>
            </table>
            : <p>Você ainda não adicionou exercícios</p> 
            }
          </div>
          <button onClick={createTraining}>Cadastrar treino</button>
        </div>
        <button onClick={handleAddExercise}>Adicionar exercício</button>
        {toggleAddExercise &&
          <div>
            <h2>Adicionar exercício</h2>
            <div>
              <div>
                <label htmlFor="exercise.name">Exercício: </label>
                <select name="exercise.name" id="exercise.name" onChange={updateSelectedExercise} defaultValue="default">
                  <option key="default" value="default" disabled selected>Escolha seu o exercício</option>
                  {exercisesDB.map(exercise => 
                    <option key={exercise._id}>{exercise.name}</option>
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="serie">Série: </label>
                <input type="number" name="serie" id="serie" onChange={updateFieldExercise} />
              </div>
              <div>
                <label htmlFor="repetition">Repetição: </label>
                <input type="number" name="repetition" id="repetition" onChange={updateFieldExercise} />
              </div>
              <div>
                <label htmlFor="load">Carga: </label>
                <input type="number" name="load" id="load" onChange={updateFieldExercise} />
              </div>
              <button onClick={addExercise}>Adicionar exercício</button>
            </div>
          </div>
        }
      </Main>
    </>
  )
}
