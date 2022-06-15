import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function ClientDetails() {
    let { clientId } = useParams(); 

    const [client, setclient] = useState({
        name: "", 
        dateBirth: null, 
        gender: "", 
        phone: "", 
        email: "", 
        profession: "", 
        objective: "" 
    })

    useEffect(() => {
        api.get(`/clientes/${clientId}`).then((response) => {
            setclient(response.data)
        })
    }, [])

    return (
        <>
        <Header />
        <Main>
            <h1>Detalhes do cliente</h1>
            <p>Nome completo: {client.name} </p>
            <p>Data de nascimento: {client.dateBirth} (30 anos)</p>
            <p>Sexo: {client.gender}</p>
            <p>Telefone: {client.phone}</p>
            <p>E-mail: {client.email}</p>
            <p>Profissão: {client.profession}</p>
            <p>Objetivo: {client.objective}</p>
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
