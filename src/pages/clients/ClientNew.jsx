import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from '../../services/api'
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

export default function NewClient() {

    const { loggedUser } = useContext(LoginContext);
    let navigate = useNavigate();

    const [client, setclient] = useState({
        name: "",
        birthDate: null,
        gender: "female",
        phone: "",
        email: "",
        profession: "",
        objective: "condicionamento",
        personalTrainerId: loggedUser._id
    })


    function createClient(e) {
        e.preventDefault();

        api.post("/clientes/novo-cliente", {
            name: client.name,
            birthDate: client.birthDate,
            gender: client.gender,
            phone: client.phone,
            email: client.email,
            profession: client.profession,
            objective: client.objective,
            personalTrainerId: client.personalTrainerId
        }).then(() => {
            alert(`Cliente ${client.name} adicionado com sucesso!`)
            navigate(`/clientes/`)
        })
    }

    const updateField = e => {
        setclient({
          ...client,
          [e.target.name]: e.target.value
        });
      };

    return (
        <>
            <Header />
            <Main>
                <header>
                    <h1>Cadastro de Cliente</h1>
                </header>
                <form onSubmit={createClient}>
                    <div>
                        <label htmlFor="name">Nome completo</label>
                        <input type="text" name="name" id="name" onChange={updateField} required />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="birthDate">Data de nascimento</label>
                            <input type="date" name="birthDate" id="birthDate" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="gender">Sexo</label>
                            <select name="gender" id="gender" onChange={updateField} required defaultValue="female" >
                                <option value={"Feminino"}>Feminino</option>
                                <option value={"Masculino"}>Masculino</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="phone">Telefone</label>
                            <input type="tel" name="phone" id="phone" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={updateField} required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="profession">Profissão</label>
                        <input type="text" name="profession" id="profession" onChange={updateField} required />
                    </div>
                    <div>
                        <label htmlFor="objective">Objetivo</label>
                        <select name="objective" id="objective" onChange={updateField} required defaultValue="condicionamento" >
                            <option value={"Condicionamento físico"}>Condicionamento físico</option>
                            <option value={"Perder peso"}>Perder peso</option>
                            <option value={"Ganhar massa muscular"}>Ganhar massa muscular</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Cadastrar Cliente" />
                    </div>
                </form>
            </Main>
        </>
    )
}