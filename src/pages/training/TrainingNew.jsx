import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCnt2, InputLabel, InputLabelCnt, InputStyle, MarginCnt, PageSubtitle, PageSubtitle3, PageTitle, Paragraph, PrimaryButton, SecondaryButton, SelectStyle, TextareaStyle } from "../../assets/styles/Shared";
import { LoginContext } from "../../services/contexts/LoginContext";
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
        <MarginCnt>
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
              <InputLabel htmlFor="notes">Observa????es: </InputLabel>
              <TextareaStyle name="notes" id="notes" onChange={updateFieldTraining} />
          </InputLabelCnt>
          <div>
            <PageSubtitle>Lista de exerc??cios</PageSubtitle>
            <ButtonCnt2>
              <PrimaryButton onClick={handleAddExercise}>Adicionar exerc??cio</PrimaryButton>
              <SecondaryButton onClick={handleRemoveExercise}>Remover todos os exerc??cio</SecondaryButton>
            </ButtonCnt2>
            {toggleAddExercise &&
              <div>
                <PageSubtitle3>Adicionar exerc??cio</PageSubtitle3>
                <div>
                  <InputLabelCnt>
                    <InputLabel htmlFor="exercise.name">Exerc??cio: </InputLabel>
                    <SelectStyle name="exercise.name" id="exercise.name" onChange={updateSelectedExercise} defaultValue="default" required>
                      <option key="default" value="default" disabled selected>Escolha seu o exerc??cio</option>
                      {exercisesDB.map(exercise => 
                        <option key={exercise._id}>{exercise.name}</option>
                      )}
                    </SelectStyle>
                  </InputLabelCnt>
                  <InputLabelCnt>
                    <InputLabel htmlFor="serie">S??rie: </InputLabel>
                    <InputStyle type="number" name="serie" id="serie" onChange={updateFieldExercise} required />
                  </InputLabelCnt>
                  <InputLabelCnt>
                    <InputLabel htmlFor="repetition">Repeti????o: </InputLabel>
                    <InputStyle type="number" name="repetition" id="repetition" onChange={updateFieldExercise} required />
                  </InputLabelCnt>
                  <InputLabelCnt>
                    <InputLabel htmlFor="load">Carga: </InputLabel>
                    <InputStyle type="number" name="load" id="load" onChange={updateFieldExercise} required />
                  </InputLabelCnt>
                  <SecondaryButton onClick={addExercise}>Adicionar exerc??cio</SecondaryButton>
                </div>
              </div>
            }
            {exercises.length > 0
            ? <Table>
              <TableHead>
                <TableRow>
                    <th>Nome</th>
                    <th>Grupo muscular</th>
                    <th>Val??ncia</th>
                    <th>Equipamento</th>
                    <th>S??rie</th>
                    <th>Repeti????o</th>
                    <th>Carga</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises.map((exercise) => {
                  return(
                    <TableRow key={exercise.name}>
                      <TableCell align="center">{exercise.name}</TableCell>
                      <TableCell align="center">{exercise.muscleGroup}</TableCell>
                      <TableCell align="center">{exercise.valence}</TableCell>
                      <TableCell align="center">{exercise.equipment}</TableCell>
                      <TableCell align="center">{exercise.serie}</TableCell>
                      <TableCell align="center"d>{exercise.repetition}</TableCell>
                      <TableCell align="center">{exercise.load}</TableCell>
                    </TableRow>
                    )})
                  }
              </TableBody>
            </Table>
            : <Paragraph>Voc?? ainda n??o adicionou exerc??cios</Paragraph> 
            }
          </div>
          <PrimaryButton onClick={createTraining}>Cadastrar treino</PrimaryButton>
        </MarginCnt>
      </Main>
    </>
  )
}
