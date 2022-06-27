import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { ButtonCnt3, LinkButton, MarginCnt, PageSubtitle, PageTitle, Paragraph, PrimaryButton, SecondaryButton } from "../../assets/styles/Shared";
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
          <PageTitle>Detalhes do Treino</PageTitle>
          <ButtonCnt3>
            <PrimaryButton onClick={updateTraining}>Alterar dados do treino</PrimaryButton>
            <SecondaryButton onClick={deleteTraining}>Deletar treino</SecondaryButton>
            <LinkButton to="/treinos">Voltar para lista de treinos</LinkButton>
          </ButtonCnt3>
        </header>
        <MarginCnt>
          <Paragraph>Data do treino: {dateTransform(training.date)} </Paragraph>
          <Paragraph>Cliente: {training.clientName} </Paragraph>
          <Paragraph>Observações: {training.notes} </Paragraph>
          <PageSubtitle>Lista de exercícios</PageSubtitle>
        </MarginCnt>
        <TableContainer>  
          <Table>
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
              {training.exercises.map((exercise) => {
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
        </TableContainer>
      </Main>
    </>
  )
}
