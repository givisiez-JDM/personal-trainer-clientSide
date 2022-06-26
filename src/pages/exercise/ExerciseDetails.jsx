import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonCnt2, PageTitle, Paragraph, PrimaryButton, SecondaryButton } from "../../assets/styles/Shared";
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
        <PageTitle>Detalhes do exercício</PageTitle>
        <ButtonCnt2>
            <PrimaryButton onClick={updateExercise}>Alterar exercício </PrimaryButton>
            <SecondaryButton onClick={deleteExercise}>Deletar exercício</SecondaryButton>
        </ButtonCnt2>
        <Paragraph>Nome do exercício: {exercise.name} </Paragraph>
        <Paragraph>Grupo muscular: {exercise.muscleGroup}</Paragraph>
        <Paragraph>Valência: {exercise.valence}</Paragraph>
        <Paragraph>Aparelho: {exercise.equipment}</Paragraph>
      </Main>
    </>
  )
}
