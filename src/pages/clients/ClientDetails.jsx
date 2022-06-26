import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { dateTransform, getAgeFrom } from "../../helpers/dateHelpers";
import { LoginContext } from "../../contexts/LoginContext";
import { ButtonCnt3, LinkButton, PageSubtitle, PageTitle, Paragraph, PrimaryButton, SecondaryButton } from "../../assets/styles/Shared";

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
            <PageTitle>Detalhes do cliente</PageTitle>
            <ButtonCnt3>
                <LinkButton to={`/avaliacao/nova-avaliacao/${client._id}`}>Adicionar Avaliação física</LinkButton>
                <PrimaryButton onClick={updateClient}>Alterar dados do usuário</PrimaryButton>
                <SecondaryButton onClick={deleteClient}>Deletar usuário</SecondaryButton>
            </ButtonCnt3>
            {loggedUser.isAdmin && 
                <Paragraph>Personal trainer: {client.personalTrainerName} </Paragraph>
            }
            <Paragraph>Nome completo: {client.name} </Paragraph>
            <Paragraph>Data de nascimento: {dateTransform(client.birthDate)}, {getAgeFrom(client.birthDate)} anos</Paragraph>
            <Paragraph>Sexo: {client.gender}</Paragraph>
            <Paragraph>Telefone: {client.phone}</Paragraph>
            <Paragraph>E-mail: {client.email}</Paragraph>
            <Paragraph>Profissão: {client.profession}</Paragraph>
            <Paragraph>Objetivo: {client.objective}</Paragraph>
            <PageSubtitle>Avaliações físicas</PageSubtitle>
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
                <Paragraph>Esse cliente ainda não possui avaliações físicas cadastradas.</Paragraph>
            }
            <PageSubtitle>Últimos treinos</PageSubtitle>  
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
