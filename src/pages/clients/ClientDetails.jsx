import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { dateTransform, getAgeFrom } from "../../helpers/dateHelpers";

export default function ClientDetails() {
    let { clientId } = useParams();
    let navigate = useNavigate(); 

    const [client, setclient] = useState({
        name: "", 
        birthDate: null, 
        gender: "", 
        phone: "", 
        email: "", 
        profession: "", 
        objective: "", 
        _id: ""
    })

    useEffect(() => {
        api.get(`/clientes/${clientId}`).then((response) => {
            setclient({
                name: response.data.name, 
                birthDate: response.data.birthDate, 
                gender: response.data.gender, 
                phone: response.data.phone, 
                email: response.data.email, 
                profession: response.data.profession, 
                objective: response.data.objective,
                _id: response.data._id
            })
        })

    }, [])

    function updateClient() {
        navigate(`/clientes/editar-cliente/${client._id}`)
    }
    
    async function deleteClient() {
        await api.delete(`/clientes/deletar-cliente/${client._id}`)
        .then(() => {
          alert('Cliente deletado com sucesso')
          navigate("/clientes")
        })
    }

    return (
        <>
        <Header />
        <Main>
            <h1>Detalhes do cliente</h1>
            <p>Nome completo: {client.name} </p>
            <p>Data de nascimento: {dateTransform(client.birthDate)}, {getAgeFrom(client.birthDate)} anos</p>
            <p>Sexo: {client.gender}</p>
            <p>Telefone: {client.phone}</p>
            <p>E-mail: {client.email}</p>
            <p>Profissão: {client.profession}</p>
            <p>Objetivo: {client.objective}</p>
            <button onClick={updateClient}>Alterar dados do usuário</button>
            <button onClick={deleteClient}>Deletar usuário</button>
            <table>
                <thead>
                    <tr>
                        <th>Avaliação</th>
                        <th>Data</th>
                        <th>Comentários</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Avaliação 1</td>
                        <td>19/09/2021</td>
                        <td>Baixo desempenho no agachamento. <br />Encurtamento no músculo posterior de coxa. <br />Facilidade em exercícios de ombro e costas. <br />Pressão alterada durante a avaliação (alta), focar em exercícios aeróbicos.</td>
                    </tr>
                </tbody>
            </table>  
        </Main>
      </>
    )
}
