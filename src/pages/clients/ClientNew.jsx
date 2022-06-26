import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from '../../services/api'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { InputStyle, PageTitle, SubmitButton } from "../../assets/styles/Shared";

export default function NewClient() {
    const { loggedUser } = useContext(LoginContext);
    let navigate = useNavigate();
    // const [users, setusers] = useState([])

    const [client, setclient] = useState({
        name: "",
        birthDate: null,
        gender: "Feminino",
        phone: "",
        email: "",
        profession: "",
        objective: "Condicionamento físico",
        personalTrainerId: loggedUser._id,
        personalTrainerName: loggedUser.name
    })

    // useEffect(() => {
    //     api.get("/usuarios").then((response) => {
    //       setusers(response.data)
    //     })

    //   }, [])

    function createClient(e) {
        e.preventDefault();

        // if (!loggedUser.isAdmin) {
        //     setclient({
        //         ...client,
        //         personalTrainerId: loggedUser._id,
        //         personalTrainerName: loggedUser.name
        //     });
        // }

        api.post("/clientes/novo-cliente", {
            name: client.name,
            birthDate: client.birthDate,
            gender: client.gender,
            phone: client.phone,
            email: client.email,
            profession: client.profession,
            objective: client.objective,
            personalTrainerId: client.personalTrainerId,
            personalTrainerName: client.personalTrainerName
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

        // console.log(client)

        // if (e.target.name === 'personalTrainerName') {
        //     const personalId = getPersonalId(users.personalTrainerName)
        //     setclient({
        //         ...client,
        //         personalTrainerId: personalId
        //     });
        // }
    };

    // const getPersonalId = (name) => {
    //     const personalId = users.find(user => user.name === name)

    //     console.log("personalId: ", personalId)
    //     return personalId
    // }

    return (
        <>
            <Header />
            <Main>
                <header>
                    <PageTitle>Cadastro de Cliente</PageTitle>
                </header>
                <form onSubmit={createClient}>
                    {/* {loggedUser.isAdmin &&
                        <div>
                            <label htmlFor="personalTrainerName">Personal Trainer: </label>
                            <select name="personalTrainerName" id="personalTrainerName" onChange={updateField} required defaultValue="Admin">
                            {users.map((user) => {
                                console.log("user: ", user)
                                return(
                                    <option key={user._id} value={user.name}>{user.name}</option>
                                )})
                            }
                            </select>
                            <label htmlFor="personalTrainerId"> - Personal Trainer ID: </label>
                            <InputStyle type="text" name="personalTrainerId" id="personalTrainerId" onChange={updateField} disabled />
                        </div>
                    } */}
                    <div>
                        <label htmlFor="name">Nome completo: </label>
                        <InputStyle type="text" name="name" id="name" onChange={updateField} required />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="birthDate">Data de nascimento: </label>
                            <InputStyle type="date" name="birthDate" id="birthDate" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="gender">Sexo: </label>
                            <select name="gender" id="gender" onChange={updateField} required defaultValue="female" >
                                <option value={"Feminino"}>Feminino</option>
                                <option value={"Masculino"}>Masculino</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="phone">Telefone: </label>
                            <InputStyle type="tel" name="phone" id="phone" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <InputStyle type="email" name="email" id="email" onChange={updateField} required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="profession">Profissão: </label>
                        <InputStyle type="text" name="profession" id="profession" onChange={updateField} required />
                    </div>
                    <div>
                        <label htmlFor="objective">Objetivo: </label>
                        <select name="objective" id="objective" onChange={updateField} required defaultValue="condicionamento" >
                            <option value={"Condicionamento físico"}>Condicionamento físico</option>
                            <option value={"Perder peso"}>Perder peso</option>
                            <option value={"Ganhar massa muscular"}>Ganhar massa muscular</option>
                        </select>
                    </div>
                    <div>
                        <SubmitButton type="submit" value="Cadastrar Cliente" />
                    </div>
                </form>
            </Main>
        </>
    )
}