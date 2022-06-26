import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCnt2, InputLabel, InputLabelCnt, InputStyle, PageSubtitle, PageSubtitle3, PageTitle, Paragraph, PrimaryButton, SecondaryButton, SelectStyle } from "../../assets/styles/Shared";
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setexercises([])
  }

  return (
    <>
      <Header />
      <Main>
        <header>
            <PageTitle>Cadastro de Treino</PageTitle>
        </header>
        <div>
          <InputLabelCnt>
              <InputLabel htmlFor="date">Data do treino: </InputLabel>
              <InputStyle type="date" name="date" id="date" onChange={updateFieldTraining} required />
          </InputLabelCnt>
          <InputLabelCnt>
              <InputLabel htmlFor="clientId">Cliente: </InputLabel>
              <SelectStyle name="clientId" id="clientId" onChange={updateFieldClient} required defaultValue="default">
                <option key="default" value="default" disabled selected>Escolha seu cliente</option>
                {clientsDB.map(client => 
                  <option key={client._id} value={client._id}>{client.name}</option>
                )}
              </SelectStyle>
          </InputLabelCnt>
          <InputLabelCnt>
              <InputLabel htmlFor="notes">Observações: </InputLabel>
              <textarea name="notes" id="notes" onChange={updateFieldTraining} />
          </InputLabelCnt>
          <div>
            <PageSubtitle>Lista de exercícios</PageSubtitle>
            <ButtonCnt2>
              <PrimaryButton onClick={handleAddExercise}>Adicionar exercício</PrimaryButton>
              <SecondaryButton onClick={handleRemoveExercise}>Remover todos os exercício</SecondaryButton>
            </ButtonCnt2>
            {toggleAddExercise &&
              <div>
                <PageSubtitle3>Adicionar exercício</PageSubtitle3>
                <div>
                  <InputLabelCnt>
                    <InputLabel htmlFor="exercise.name">Exercício: </InputLabel>
                    <SelectStyle name="exercise.name" id="exercise.name" onChange={updateSelectedExercise} defaultValue="default" required>
                      <option key="default" value="default" disabled selected>Escolha seu o exercício</option>
                      {exercisesDB.map(exercise => 
                        <option key={exercise._id}>{exercise.name}</option>
                      )}
                    </SelectStyle>
                  </InputLabelCnt>
                  <InputLabelCnt>
                    <InputLabel htmlFor="serie">Série: </InputLabel>
                    <InputStyle type="number" name="serie" id="serie" onChange={updateFieldExercise} required />
                  </InputLabelCnt>
                  <InputLabelCnt>
                    <InputLabel htmlFor="repetition">Repetição: </InputLabel>
                    <InputStyle type="number" name="repetition" id="repetition" onChange={updateFieldExercise} required />
                  </InputLabelCnt>
                  <InputLabelCnt>
                    <InputLabel htmlFor="load">Carga: </InputLabel>
                    <InputStyle type="number" name="load" id="load" onChange={updateFieldExercise} required />
                  </InputLabelCnt>
                  <SecondaryButton onClick={addExercise}>Adicionar exercício</SecondaryButton>
                </div>
              </div>
            }
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
                    </tr>
                    )})
                  }
              </tbody>
            </table>
            : <Paragraph>Você ainda não adicionou exercícios</Paragraph> 
            }
          </div>
          <PrimaryButton onClick={createTraining}>Cadastrar treino</PrimaryButton>
        </div>
      </Main>
    </>
  )
}
