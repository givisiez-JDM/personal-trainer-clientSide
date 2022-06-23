import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { dateTransform, getAgeFrom } from "../../helpers/dateHelpers";
import { LoginContext } from "../../contexts/LoginContext";

export default function ClientDetails() {
    const { loggedUser } = useContext(LoginContext);
    let { clientId } = useParams();
    let navigate = useNavigate(); 

    const [client, setclient] = useState([])

    const [evaluations, setEvaluations] = useState([])

    useEffect(() => {
        api.get(`/clientes/${clientId}`).then((response) => {
            setclient(response.data)
        })

        api.get(`/avaliacao/lista/${clientId}`).then((response) => {
            setEvaluations(response.data)
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
            <div>
                <Link to={`/avaliacao/nova-avaliacao/${client._id}`}>Adicionar Avaliação física</Link>
                <button onClick={updateClient}>Alterar dados do usuário</button>
                <button onClick={deleteClient}>Deletar usuário</button>
            </div>
            {loggedUser.isAdmin && 
                <p>Personal trainer ID: {client.personalTrainerName} </p>
            }
            <p>Nome completo: {client.name} </p>
            <p>Data de nascimento: {dateTransform(client.birthDate)}, {getAgeFrom(client.birthDate)} anos</p>
            <p>Sexo: {client.gender}</p>
            <p>Telefone: {client.phone}</p>
            <p>E-mail: {client.email}</p>
            <p>Profissão: {client.profession}</p>
            <p>Objetivo: {client.objective}</p>
            <h1>Avaliações físicas</h1>
            {evaluations.length > 0 
            ?
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Comentários</th>
                            <th>Avaliação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations.map((evaluation) => {
                            return(
                                <tr key={evaluation._id}>
                                    <td>{dateTransform(evaluation.createdAt)}</td>
                                    <td>{evaluation.notes}</td>
                                    <td><Link to={`/avaliacao/${evaluation._id}`}>Ver avaliação completa</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            :
                <p>Esse cliente ainda não possui avaliações físicas cadastradas.</p>
            }
            <h1>Últimos treinos</h1>  
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
