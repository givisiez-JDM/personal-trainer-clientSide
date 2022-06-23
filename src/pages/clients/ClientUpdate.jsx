import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from '../../services/api'
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { dateInverted } from "../../helpers/dateHelpers";

export default function ClientUpdate() {

    const { loggedUser } = useContext(LoginContext);
    let navigate = useNavigate();
    let { clientId } = useParams();

    const [client, setclient] = useState({
        name: "",
        birthDate: null,
        gender: "female",
        phone: "",
        email: "",
        profession: "",
        objective: "condicionamento",
        personalTrainerId: loggedUser._id,
        personalTrainerName: loggedUser.name,
        _id: ""
    })


    async function fetchUserData() {
        const data = await api.get(`/clientes/${clientId}`)
        const { 
            name,
            birthDate,
            gender,
            phone,
            email,
            profession,
            objective,
            personalTrainerId, 
            _id,
            personalTrainerName
         } = data.data
        setclient({
            name,
            birthDate,
            gender,
            phone,
            email,
            profession,
            objective,
            personalTrainerId,
            _id,
            personalTrainerName
        })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    async function updateClient(e) {
        e.preventDefault()
        await api.put(`/clientes/editar-cliente/${client._id}`, {
            name: client.name,
            birthDate: client.birthDate,
            gender: client.gender,
            phone: client.phone,
            email: client.email,
            profession: client.profession,
            objective: client.objective,
            personalTrainerId: client.personalTrainerId,
            _id: client._id,
            personalTrainerName: client.personalTrainerName
        }).then(() => {
            alert(`Cliente ${client.name} editado com sucesso!`)
            navigate(`/clientes/${client._id}`)
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
                    <h1>Atualizar dados do Cliente</h1>
                </header>
                {client.name === ''
                    ? <p>Carregando...</p>
                    : 
                    <form onSubmit={updateClient}>
                        <div>
                            <label htmlFor="name">Nome completo</label>
                            <input type="text" name="name" id="name" onChange={updateField} required value={client.name} />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="birthDate">Data de nascimento</label>
                                <input type="date" name="birthDate" id="birthDate" onChange={updateField} required value={dateInverted(client.birthDate)} />
                            </div>
                            <div>
                                <label htmlFor="gender">Sexo</label>
                                <select name="gender" id="gender" onChange={updateField} required value={client.gender} >
                                    <option value={"Feminino"}>Feminino</option>
                                    <option value={"Masculino"}>Masculino</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="phone">Telefone</label>
                                <input type="tel" name="phone" id="phone" onChange={updateField} required  value={client.phone} />
                            </div>
                            <div>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email" onChange={updateField} required  value={client.email} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="profession">Profissão</label>
                            <input type="text" name="profession" id="profession" onChange={updateField} required  value={client.profession} />
                        </div>
                        <div>
                            <label htmlFor="objective">Objetivo</label>
                            <select name="objective" id="objective" onChange={updateField} required value={client.objective} >
                                <option value={"Condicionamento físico"}>Condicionamento físico</option>
                                <option value={"Perder peso"}>Perder peso</option>
                                <option value={"Ganhar massa muscular"}>Ganhar massa muscular</option>
                            </select>
                        </div>
                        <div>
                            <input type="submit" value="Atualizar Cliente" />
                        </div>
                    </form>
                }
            </Main>
        </>
    )
}