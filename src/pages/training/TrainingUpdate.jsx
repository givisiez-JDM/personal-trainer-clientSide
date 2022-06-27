import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonCnt1, ButtonCnt2, InputLabel, InputLabelCnt, InputStyle, PageSubtitle, PageSubtitle3, PageTitle, Paragraph, PrimaryButton, SecondaryButton, SelectStyle, TextareaStyle } from "../../assets/styles/Shared";
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
            <PageTitle>Atualizar Treino</PageTitle>
        </header>
          <InputLabelCnt>
              <InputLabel htmlFor="date">Data do treino: </InputLabel>
              <InputStyle type="date" name="date" id="date" onChange={updateFieldTraining} required value={dateInverted(training.date)} />
          </InputLabelCnt>
          <InputLabelCnt>
              <InputLabel htmlFor="clientId">Cliente: </InputLabel>
              <SelectStyle name="clientId" id="clientId" onChange={updateFieldClient} required value={training.clientName}>
                {clientsDB.map(client => 
                  <option key={client._id} value={client._id}>{client.name}</option>
                )}
              </SelectStyle>
          </InputLabelCnt>
          <InputLabelCnt>
              <InputLabel htmlFor="notes">Observações: </InputLabel>
              <TextareaStyle name="notes" id="notes" onChange={updateFieldTraining} value={training.notes} />
          </InputLabelCnt>
          <>
            <PageSubtitle>Lista de exercícios</PageSubtitle>
            <ButtonCnt2>
              <PrimaryButton onClick={handleAddExercise}>Adicionar exercício</PrimaryButton>
              <SecondaryButton onClick={handleRemoveExercise}>Remover todos os exercício</SecondaryButton>
            </ButtonCnt2>
            {toggleAddExercise &&
              <>
                <PageSubtitle3>Adicionar exercício</PageSubtitle3>
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
              </>
            }
            {newExercises.length > 0
            ? <Table>
              <TableHead>
                <TableRow>
                    <th>Nome</th>
                    <th>Grupo muscular</th>
                    <th>Valência</th>
                    <th>Equipamento</th>
                    <th>Série</th>
                    <th>Repetição</th>
                    <th>Carga</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {newExercises.map((exercise) => {
                  return(
                    <TableRow key={exercise.name}>
                      <TableCell align="center">{exercise.name}</TableCell>
                      <TableCell align="center">{exercise.muscleGroup}</TableCell>
                      <TableCell align="center">{exercise.valence}</TableCell>
                      <TableCell align="center">{exercise.equipment}</TableCell>
                      <TableCell align="center">{exercise.serie}</TableCell>
                      <TableCell align="center">{exercise.repetition}</TableCell>
                      <TableCell align="center">{exercise.load}</TableCell>
                    </TableRow>
                    )})
                  }
              </TableBody>
            </Table>
            : <Paragraph>Você ainda não adicionou exercícios</Paragraph> 
            }
          </>
          <ButtonCnt1>
            <PrimaryButton onClick={createTraining}>Atualizar treino</PrimaryButton>
          </ButtonCnt1>
      </Main>
    </>
  )
}
