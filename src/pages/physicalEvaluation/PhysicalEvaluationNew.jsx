import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from '../../services/api'
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate, useParams } from "react-router-dom";

export default function PhysicalEvaluationNew() {
  const { loggedUser } = useContext(LoginContext);
    let navigate = useNavigate();
    let { clientId } = useParams();

    const [evaluation, setevaluation] = useState({
        createdAt: null,
        personalTrainerId: loggedUser._id,
        clientId: clientId,
        weight: 0,
        height: 0,
        IMC: 0,
        abdomenMeasure: 0,
        neckMeasure: 0,
        chestMeasure: 0,
        hipMeasure: 0,
        armsMeasure: 0,
        forearmsMeasure: 0,
        wristsMeasure: 0,
        thighMeasure: 0,
        calfMeasure: 0,
        fatSubscapularis: 0,
        fatTriceps: 0,
        fatBreastplate: 0,
        fatMidAxillary: 0,
        fatSuprailiac: 0,
        fatAbdominal: 0,
        fatMidFemoral: 0,
        notes: ""
    })

    function createEvaluation(e) {
        e.preventDefault();

        const {
            createdAt,
            personalTrainerId,
            clientId,
            weight,
            height,
            IMC,
            abdomenMeasure,
            neckMeasure,
            chestMeasure,
            hipMeasure,
            armsMeasure,
            forearmsMeasure,
            wristsMeasure,
            thighMeasure,
            calfMeasure,
            fatSubscapularis,
            fatTriceps,
            fatBreastplate,
            fatMidAxillary,
            fatSuprailiac,
            fatAbdominal,
            fatMidFemoral,
            notes
        } = evaluation

        api.post("/avaliacao/nova-avaliacao", {
            createdAt,
            personalTrainerId,
            clientId,
            weight,
            height,
            IMC,
            abdomenMeasure,
            neckMeasure,
            chestMeasure,
            hipMeasure,
            armsMeasure,
            forearmsMeasure,
            wristsMeasure,
            thighMeasure,
            calfMeasure,
            fatSubscapularis,
            fatTriceps,
            fatBreastplate,
            fatMidAxillary,
            fatSuprailiac,
            fatAbdominal,
            fatMidFemoral,
            notes
        }).then(() => {
            alert(`Avaliação física feita com sucesso!`)
            navigate(`/clientes/${clientId}`)
        })
    }

    const updateField = e => {
        setevaluation({
            ...evaluation,
            [e.target.name]: e.target.value
        });
      };

    return (
        <>
            <Header />
            <Main>
                <header>
                    <h1>Avaliação física</h1>
                </header>
                <form onSubmit={createEvaluation}>
                    <div>
                        <label htmlFor="createdAt">Data da avaliação:</label>
                        <input type="date" name="createdAt" id="createdAt" onChange={updateField} required />
                    </div>
                    <div>
                        <label htmlFor="weight">Peso (em kg)</label>
                        <input type="number" step=".01" name="weight" id="weight" onChange={updateField} required />
                    </div>
                    <div>
                        <label htmlFor="height">Altura (em metros)</label>
                        <input type="number" step=".01" name="height" id="height" onChange={updateField} required />
                    </div>
                    <div>
                        <label htmlFor="IMC">IMC:</label>
                        <input type="number" step=".01" name="IMC" id="IMC" onChange={updateField} disabled value={evaluation.weight > 0 && evaluation.height > 0 ? (evaluation.weight / (evaluation.height * evaluation.height)).toFixed(2) : 0} />
                    </div>
                    <div>
                        <h2>Medidas de circunferência</h2>
                        <div>
                            <label htmlFor="abdomenMeasure">Abdômen (em cm)</label>
                            <input type="number" name="abdomenMeasure" id="abdomenMeasure" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="neckMeasure">Pescoço (em cm)</label>
                            <input type="number" name="neckMeasure" id="neckMeasure" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="chestMeasure">Tórax (em cm)</label>
                            <input type="number" name="chestMeasure" id="chestMeasure" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="hipMeasure">Quadril (em cm)</label>
                            <input type="number" name="hipMeasure" id="hipMeasure" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="armsMeasure">Braço (em cm)</label>
                            <input type="number" name="armsMeasure" id="armsMeasure" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="forearmsMeasure">Antebraço (em cm)</label>
                            <input type="number" name="forearmsMeasure" id="forearmsMeasure" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="wristsMeasure">Punho (em cm)</label>
                            <input type="number" name="wristsMeasure" id="wristsMeasure" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="thighMeasure">Coxa (em cm)</label>
                            <input type="number" name="thighMeasure" id="thighMeasure" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="calfMeasure">Panturrilha (em cm)</label>
                            <input type="number" name="calfMeasure" id="calfMeasure" onChange={updateField} required />
                        </div>
                    </div>
                    <div>
                        <h2>Dobras cutâneas (7 dobras)</h2>
                        <div>
                            <label htmlFor="fatSubscapularis">Subescapular (em mm)</label>
                            <input type="number" name="fatSubscapularis" id="fatSubscapularis" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="fatTriceps">Tríceps (em mm)</label>
                            <input type="number" name="fatTriceps" id="fatTriceps" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="fatBreastplate">Peitoral (em mm)</label>
                            <input type="number" name="fatBreastplate" id="fatBreastplate" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="fatMidAxillary">Axilar média (em mm)</label>
                            <input type="number" name="fatMidAxillary" id="fatMidAxillary" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="fatSuprailiac">Supra-ilíaca (em mm)</label>
                            <input type="number" name="fatSuprailiac" id="fatSuprailiac" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="fatAbdominal">Abdôminal (em mm)</label>
                            <input type="number" name="fatAbdominal" id="fatAbdominal" onChange={updateField} required />
                        </div>
                        <div>
                            <label htmlFor="fatMidFemoral">Femural médio (em mm)</label>
                            <input type="number" name="fatMidFemoral" id="fatMidFemoral" onChange={updateField} required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="notes">Observações</label>
                        <textarea name="notes" id="notes" cols="30" rows="10" onChange={updateField} />
                    </div>
                    <div>
                        <input type="submit" value="Cadastrar avaliação" />
                    </div>
                </form>
            </Main>
        </>
    )
}