import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import { ComponentToPrint } from "./ComponentToPrint";

export default function PhysicEvaluationDetails() {
  let { evaluationId } = useParams();
  let navigate = useNavigate();

  const [evaluation, setEvaluation] = useState([])

  async function fetchEvaluationData() {
    const data = await api.get(`/avaliacao/${evaluationId}`)
    setEvaluation(data.data)
  }

  function updateEvaluation() {
    navigate(`/avaliacao/editar-avaliacao/${evaluation._id}`)
  }

  async function deleteEvaluation() {
    await api.delete(`/avaliacao/deletar-avaliacao/${evaluation._id}`)
    .then(() => {
      alert('Avaliação deletada com sucesso')
      navigate(`/clientes/${evaluation.clientId}`)
    })
  }

  useEffect(() => {
    fetchEvaluationData()
  }, [])

  return (
    <>
      <Header />
      <Main>
        <h1>Avaliação física</h1>
        <button onClick={updateEvaluation}>Alterar dados da avaliação</button>
        <button onClick={deleteEvaluation}>Deletar avaliação</button>
        <ComponentToPrint evaluation={evaluation} />
        <Link to={`/clientes/${evaluation.clientId}`}>Voltar para cliente</Link>
      </Main>
    </>
  )
}
