import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from '../../services/api'
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../services/contexts/LoginContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { dateInverted } from "../../helpers/dateHelpers";
import { PageTitle, SubmitButton, InputStyle, InputLabel, SelectStyle, Paragraph, ButtonCnt1, FormStyle, InputLabelCnt } from "../../assets/styles/Shared";

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
                    <PageTitle>Atualizar dados do Cliente</PageTitle>
                </header>
                {client.name === ''
                    ? <Paragraph>Carregando...</Paragraph>
                    : 
                    <FormStyle onSubmit={updateClient}>
                        <InputLabelCnt>
                            <InputLabel htmlFor="name">Nome completo</InputLabel>
                            <InputStyle type="text" name="name" id="name" onChange={updateField} required value={client.name} />
                        </InputLabelCnt>
                            <InputLabelCnt>
                                <InputLabel htmlFor="birthDate">Data de nascimento</InputLabel>
                                <InputStyle type="date" name="birthDate" id="birthDate" onChange={updateField} required value={dateInverted(client.birthDate)} />
                            </InputLabelCnt>
                            <InputLabelCnt>
                                <InputLabel htmlFor="gender">Sexo</InputLabel>
                                <SelectStyle name="gender" id="gender" onChange={updateField} required value={client.gender} >
                                    <option value={"Feminino"}>Feminino</option>
                                    <option value={"Masculino"}>Masculino</option>
                                </SelectStyle>
                            </InputLabelCnt>
                            <InputLabelCnt>
                                <InputLabel htmlFor="phone">Telefone</InputLabel>
                                <InputStyle type="tel" name="phone" id="phone" onChange={updateField} required  value={client.phone} />
                            </InputLabelCnt>
                            <InputLabelCnt>
                                <InputLabel htmlFor="email">E-mail</InputLabel>
                                <InputStyle type="email" name="email" id="email" onChange={updateField} required  value={client.email} />
                            </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="profession">Profissão</InputLabel>
                            <InputStyle type="text" name="profession" id="profession" onChange={updateField} required  value={client.profession} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="objective">Objetivo</InputLabel>
                            <SelectStyle name="objective" id="objective" onChange={updateField} required value={client.objective} >
                                <option value={"Condicionamento físico"}>Condicionamento físico</option>
                                <option value={"Perder peso"}>Perder peso</option>
                                <option value={"Ganhar massa muscular"}>Ganhar massa muscular</option>
                            </SelectStyle>
                        </InputLabelCnt>
                        <ButtonCnt1>
                            <SubmitButton type="submit" value="Atualizar Cliente" />
                        </ButtonCnt1>
                    </FormStyle>
                }
            </Main>
        </>
    )
}