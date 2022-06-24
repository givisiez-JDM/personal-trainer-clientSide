import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";

export default function ExerciseNew() {
    let navigate = useNavigate();
    const [exercise, setExercise] = useState([])

    function createExercise(e) {
        e.preventDefault();

        api.post("/exercicios/novo-exercicio", exercise).then(() => {
            alert(`Exercício ${exercise.name} adicionado com sucesso!`)
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
                    <h1>Cadastro de Exercício</h1>
                </header>
                <form onSubmit={createExercise}>
                    <div>
                        <label htmlFor="name">Nome do exercício: </label>
                        <input type="text" name="name" id="name" onChange={updateField} required />
                    </div>
                    <div>
                        <label htmlFor="muscleGroup">Grupo muscular: </label>
                        <select name="muscleGroup" id="muscleGroup" onChange={updateField} required defaultValue="Abdominal" >
                            <option value={"Abdominal"} selected>Abdominal</option>
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
                        <select name="valence" id="valence" onChange={updateField} required defaultValue="Abdominal" >
                            <option value={"Equilíbrio"}>Equilíbrio</option>
                            <option value={"Flexibilidade"}>Flexibilidade</option>
                            <option value={"Força"}>Força</option>
                            <option value={"Dorsal"}>Dorsal</option>
                            <option value={"Mobilidade"}>Mobilidade</option>
                            <option value={"Potência"}>Potência</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="equipment">Aparelho: </label>
                        <input type="text" name="equipment" id="equipment" onChange={updateField} />
                    </div>
                    <div>
                        <input type="submit" value="Cadastrar Exercício" />
                    </div>
                </form>
            </Main>
        </>
    )
}
