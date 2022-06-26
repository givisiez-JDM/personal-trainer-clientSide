import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageTitle, SubmitButton, InputStyle } from "../../assets/styles/Shared";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";

export default function ExerciseUpdate() {
    let navigate = useNavigate();
    const [exercise, setExercise] = useState([])
    let { exerciseId } = useParams();

    
    useEffect(() => {
        async function fetchExerciseData() {
            const data = await api.get(`/exercicios/${exerciseId}`)
    
            setExercise(data.data)
        }

        fetchExerciseData()
    }, [])

    function updateExercise(e) {
        e.preventDefault();

        api.put(`/exercicios/editar-exercicio/${exercise._id}`, exercise).then(() => {
            alert(`Exercício ${exercise.name} atualizado com sucesso!`)
            navigate(`/exercicios`)
        })
    }

    const updateField = e => {
        setExercise({
          ...exercise,
          [e.target.name]: e.target.value
        });
    }


    return (
        <>
            <Header />
            <Main>
                <header>
                    <PageTitle>Cadastro de Exercício</PageTitle>
                </header>
                <form onSubmit={updateExercise}>
                    <div>
                        <label htmlFor="name">Nome do exercício: </label>
                        <InputStyle type="text" name="name" id="name" onChange={updateField} required value={exercise.name} />
                    </div>
                    <div>
                        <label htmlFor="muscleGroup">Grupo muscular: </label>
                        <select name="muscleGroup" id="muscleGroup" onChange={updateField} required value={exercise.muscleGroup} >
                            <option value={"Abdominal"}>Abdominal</option>
                            <option value={"Biceps"}>Biceps</option>
                            <option value={"Costas"}>Costas</option>
                            <option value={"Dorsal"}>Dorsal</option>
                            <option value={"Ombro"}>Ombro</option>
                            <option value={"Peito"}>Peito</option>
                            <option value={"Perna"}>Perna</option>
                            <option value={"Quadriceps"}>Quadriceps</option>
                            <option value={"Triceps"}>Triceps</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="valence">Valência: </label>
                        <select name="valence" id="valence" onChange={updateField} required value={exercise.valence} >
                            <option value={"Equilíbrio"}>Equilíbrio</option>
                            <option value={"Flexibilidade"}>Flexibilidade</option>
                            <option value={"Força"}>Força</option>
                            <option value={"Mobilidade"}>Mobilidade</option>
                            <option value={"Potência"}>Potência</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="equipment">Aparelho: </label>
                        <InputStyle type="text" name="equipment" id="equipment" onChange={updateField} value={exercise.equipment} />
                    </div>
                    <div>
                        <SubmitButton type="submit" value="Atualizar Exercício" />
                    </div>
                </form>
            </Main>
        </>
    )
}
