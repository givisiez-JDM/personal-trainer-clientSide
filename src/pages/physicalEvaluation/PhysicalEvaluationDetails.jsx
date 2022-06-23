import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { dateTransform } from "../../helpers/dateHelpers";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";

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
        <h1>Detalhes da Avaliação Física</h1>
        <button onClick={updateEvaluation}>Alterar dados da avaliação</button>
        <button onClick={deleteEvaluation}>Deletar avaliação</button>
        <Link to={`/clientes/${evaluation.clientId}`}>Voltar para cliente</Link>
        <p>Data da avaliação: {evaluation.createdAt !== "" ? dateTransform(evaluation.createdAt) : 'Carregando...'} </p>
        <p>Peso (em kg): {evaluation.weight !== "" ? evaluation.weight : 'Carregando...'} </p>
        <p>Altura (em metros): {evaluation.height !== 0 ? evaluation.height : 'Carregando...'}</p>
        <p>IMC: {evaluation.weight > 0 && evaluation.height > 0 ? (evaluation.weight / (evaluation.height * evaluation.height)).toFixed(2) : 0} </p>
        <h2>Medidas de circunferência</h2>
        <p>Abdômen (em cm): {evaluation.abdomenMeasure !== 0 ? evaluation.abdomenMeasure : 'Carregando...'}</p>
        <p>Pescoço (em cm): {evaluation.neckMeasure !== 0 ? evaluation.neckMeasure : 'Carregando...'}</p>
        <p>Tórax (em cm): {evaluation.chestMeasure !== 0 ? evaluation.chestMeasure : 'Carregando...'}</p>
        <p>Quadril (em cm): {evaluation.hipMeasure !== 0 ? evaluation.hipMeasure : 'Carregando...'}</p>
        <p>Braço (em cm): {evaluation.armsMeasure !== 0 ? evaluation.armsMeasure : 'Carregando...'}</p>
        <p>Antebraço (em cm): {evaluation.abdomenMeasure !== 0 ? evaluation.abdomenMeasure : 'Carregando...'}</p>
        <p>Punho (em cm): {evaluation.wristsMeasure !== 0 ? evaluation.wristsMeasure : 'Carregando...'}</p>
        <p>Coxa (em cm): {evaluation.thighMeasure !== 0 ? evaluation.thighMeasure : 'Carregando...'}</p>
        <p>Panturrilha (em cm): {evaluation.calfMeasure !== 0 ? evaluation.calfMeasure : 'Carregando...'}</p>
        <h2>Dobras cutâneas (7 dobras)</h2>
        <p>Subescapular (em mm): {evaluation.fatSubscapularis !== 0 ? evaluation.fatSubscapularis : 'Carregando...'}</p>
        <p>Tríceps (em mm): {evaluation.fatTriceps !== 0 ? evaluation.fatTriceps : 'Carregando...'}</p>
        <p>Peitoral (em mm): {evaluation.fatBreastplate !== 0 ? evaluation.fatBreastplate : 'Carregando...'}</p>
        <p>Axilar média (em mm): {evaluation.fatMidAxillary !== 0 ? evaluation.fatMidAxillary : 'Carregando...'}</p>
        <p>Supra-ilíaca (em mm): {evaluation.fatSuprailiac !== 0 ? evaluation.fatSuprailiac : 'Carregando...'}</p>
        <p>Abdôminal (em mm): {evaluation.fatAbdominal !== 0 ? evaluation.fatAbdominal : 'Carregando...'}</p>
        <p>Femural médio (em mm): {evaluation.fatMidFemoral !== 0 ? evaluation.fatMidFemoral : 'Carregando...'}</p>
        <p>Observações: <br /> {evaluation.notes !== 0 ? evaluation.notes : 'Carregando...'}</p>
      </Main>
    </>
  )
}
