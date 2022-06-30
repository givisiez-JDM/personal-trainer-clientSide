import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { dateTransform, getAgeFrom } from "../../helpers/dateHelpers";
import { LoginContext } from "../../services/contexts/LoginContext";
import { ButtonCnt3, LinkButton, MarginCnt, PageSubtitle, PageTitle, Paragraph, PrimaryButton, SecondaryButton } from "../../assets/styles/Shared";
import { Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";

export default function ClientDetails() {
    const { loggedUser } = useContext(LoginContext);
    let { clientId } = useParams();
    let navigate = useNavigate(); 

    const [client, setclient] = useState([])
    const [evaluations, setEvaluations] = useState([])
    const [trainings, setTrainings] = useState([])

    useEffect(() => {
        api.get(`/clientes/${clientId}`).then((response) => {
            setclient(response.data)
        })

        api.get(`/avaliacao/lista/${clientId}`).then((response) => {
            setEvaluations(response.data)
        })

        api.get(`/treinos/lista/cliente/${clientId}`).then((response) => {
            setTrainings(response.data)
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
                <PrimaryButton onClick={updateClient}>Alterar dados do cliente</PrimaryButton>
                <SecondaryButton onClick={deleteClient}>Deletar cliente</SecondaryButton>
            </ButtonCnt3>
            <MarginCnt>
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
            </MarginCnt>
            {evaluations.length > 0 
            ?
            <TableContainer>
                <Table>
                    <TableHead>
                        <tr>
                            <th>Data</th>
                            <th>Comentários</th>
                            <th>Avaliação</th>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {evaluations.map((evaluation) => {
                            return(
                                <tr key={evaluation._id}>
                                    <TableCell align="center">{dateTransform(evaluation.date)}</TableCell>
                                    <TableCell align="center">{evaluation.notes}</TableCell>
                                    <TableCell align="center"><Link to={`/avaliacao/${evaluation._id}`}>Ver avaliação completa</Link></TableCell>
                                </tr>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer> 
            :
                <Paragraph>Esse cliente ainda não possui avaliações físicas cadastradas.</Paragraph>
            }
            <PageSubtitle>Últimos treinos</PageSubtitle>  
            {trainings.length > 0 
            ?
            <TableContainer>
                <Table>
                    <TableHead>
                        <tr>
                            <th>Data</th>
                            <th>Comentários</th>
                            <th>Avaliação</th>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {trainings.map((training) => {
                            return(
                                <tr key={training._id}>
                                    <TableCell align="center">{dateTransform(training.date)}</TableCell>
                                    <TableCell align="center">{training.notes}</TableCell>
                                    <TableCell align="center"><Link to={`/treinos/${training._id}`}>Ver dados do treino</Link></TableCell>
                                </tr>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            :
                <Paragraph>Esse cliente ainda não possui treinos agendados.</Paragraph>
            }
        </Main>
      </>
    )
}
