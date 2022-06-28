import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from '../../services/api'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { dateInverted } from "../../helpers/dateHelpers";
import { ButtonCnt1, FormStyle, InputLabel, InputLabelCnt, InputStyle, PageSubtitle, PageTitle, SubmitButton, TextareaStyle } from "../../assets/styles/Shared";

export default function PhysicalEvaluationNew() {
    let navigate = useNavigate();
    let { evaluationId } = useParams();

    const [evaluation, setEvaluation] = useState({
        date: null,
        personalTrainerId: "",
        clientId: "",
        personalTrainerName: "",
        clientName: "",
        weight: 0,
        height: 0,
        measurements: {
            abdomenMeasure: 0,
            neckMeasure: 0,
            chestMeasure: 0,
            hipMeasure: 0,
            armsMeasure: 0,
            forearmsMeasure: 0,
            wristsMeasure: 0,
            thighMeasure: 0,
            calfMeasure: 0,
        },
        fatData: {
            fatSubscapularis: 0,
            fatTriceps: 0,
            fatBreastplate: 0,
            fatMidAxillary: 0,
            fatSuprailiac: 0,
            fatAbdominal: 0,
            fatMidFemoral: 0,
        },
        notes: "",
        _id: ""
    })

    
    useEffect(() => {
        async function fetchEvaluationData() {
            const data = await api.get(`/avaliacao/${evaluationId}`)
            const { 
                date,
                personalTrainerId,
                personalTrainerName,
                clientId,
                clientName,
                weight,
                height,
                measurements: {
                    abdomenMeasure,
                    neckMeasure,
                    chestMeasure,
                    hipMeasure,
                    armsMeasure,
                    forearmsMeasure,
                    wristsMeasure,
                    thighMeasure,
                    calfMeasure,
                },
                fatData: {
                    fatSubscapularis,
                    fatTriceps,
                    fatBreastplate,
                    fatMidAxillary,
                    fatSuprailiac,
                    fatAbdominal,
                    fatMidFemoral,
                },
                notes,
                _id 
            } = data.data
    
            setEvaluation({
                date,
                personalTrainerId,
                personalTrainerName,
                clientId,
                clientName,
                weight,
                height,
                measurements: {
                    abdomenMeasure,
                    neckMeasure,
                    chestMeasure,
                    hipMeasure,
                    armsMeasure,
                    forearmsMeasure,
                    wristsMeasure,
                    thighMeasure,
                    calfMeasure,
                },
                fatData: {
                    fatSubscapularis,
                    fatTriceps,
                    fatBreastplate,
                    fatMidAxillary,
                    fatSuprailiac,
                    fatAbdominal,
                    fatMidFemoral,
                },
                notes,
                _id 
            })
        }

        fetchEvaluationData()
    }, [])

    function updateEvaluation(e) {
        e.preventDefault();

        const {
            date,
                personalTrainerId,
                personalTrainerName,
                clientId,
                clientName,
                weight,
                height,
                measurements: {
                    abdomenMeasure,
                    neckMeasure,
                    chestMeasure,
                    hipMeasure,
                    armsMeasure,
                    forearmsMeasure,
                    wristsMeasure,
                    thighMeasure,
                    calfMeasure,
                },
                fatData: {
                    fatSubscapularis,
                    fatTriceps,
                    fatBreastplate,
                    fatMidAxillary,
                    fatSuprailiac,
                    fatAbdominal,
                    fatMidFemoral,
                },
                notes,
                _id 
        } = evaluation

        api.put(`/avaliacao/editar-avaliacao/${evaluation._id}`, {
            date,
            personalTrainerId,
            personalTrainerName,
            clientId,
            clientName,
            weight,
            height,
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
            notes,
            _id
        }).then(() => {
            alert(`Avaliação física atualizada com sucesso!`)
            navigate(`/avaliacao/${_id}`)
        })
    }

    const updateField = (e) => {
        setEvaluation({
          ...evaluation,
          [e.target.name]: e.target.value,
        });
      };

    return (
        <>
            <Header />
            <Main>
                <header>
                    <PageTitle>Atualizar avaliação física</PageTitle>
                </header>
                <FormStyle onSubmit={updateEvaluation}>
                    <InputLabelCnt>
                        <InputLabel htmlFor="date">Data da avaliação:</InputLabel>
                        <InputStyle type="date" name="date" id="date" onChange={updateField} required value={dateInverted(evaluation.createdAt)} />
                    </InputLabelCnt>
                    <InputLabelCnt>
                        <InputLabel htmlFor="weight">Peso (em kg)</InputLabel>
                        <InputStyle type="number" step=".01" name="weight" id="weight" onChange={updateField} required value={evaluation.weight} />
                    </InputLabelCnt>
                    <InputLabelCnt>
                        <InputLabel htmlFor="height">Altura (em metros)</InputLabel>
                        <InputStyle type="number" step=".01" name="height" id="height" onChange={updateField} required value={evaluation.height} />
                    </InputLabelCnt>
                    <InputLabelCnt>
                        <InputLabel htmlFor="IMC">IMC:</InputLabel>
                        <InputStyle type="number" step=".01" name="IMC" id="IMC" disabled value={evaluation.IMC} />
                    </InputLabelCnt>
                    <div>
                        <PageSubtitle>Medidas de circunferência</PageSubtitle>
                        <InputLabelCnt>
                            <InputLabel htmlFor="abdomenMeasure">Abdômen (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.abdomenMeasure" id="abdomenMeasure" onChange={updateField} required value={evaluation.abdomenMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="neckMeasure">Pescoço (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.neckMeasure" id="neckMeasure" onChange={updateField} required value={evaluation.neckMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="chestMeasure">Tórax (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.chestMeasure" id="chestMeasure" onChange={updateField} required value={evaluation.chestMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="hipMeasure">Quadril (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.hipMeasure" id="hipMeasure" onChange={updateField} required value={evaluation.hipMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="armsMeasure">Braço (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.armsMeasure" id="armsMeasure" onChange={updateField} required value={evaluation.armsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="forearmsMeasure">Antebraço (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.forearmsMeasure" id="forearmsMeasure" onChange={updateField} required value={evaluation.forearmsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="wristsMeasure">Punho (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.wristsMeasure" id="wristsMeasure" onChange={updateField} required value={evaluation.wristsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="thighMeasure">Coxa (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.thighMeasure" id="thighMeasure" onChange={updateField} required value={evaluation.thighMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="calfMeasure">Panturrilha (em cm)</InputLabel>
                            <InputStyle type="number" name="measurements.calfMeasure" id="calfMeasure" onChange={updateField} required value={evaluation.calfMeasure} />
                        </InputLabelCnt>
                    </div>
                    <div>
                        <PageSubtitle>Dobras cutâneas (7 dobras)</PageSubtitle>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatSubscapularis">Subescapular (em mm)</InputLabel>
                            <InputStyle type="number" name="fatData.fatSubscapularis" id="fatSubscapularis" onChange={updateField} required value={evaluation.fatSubscapularis} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatTriceps">Tríceps (em mm)</InputLabel>
                            <InputStyle type="number" name="fatData.fatTriceps" id="fatTriceps" onChange={updateField} required value={evaluation.fatTriceps} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatBreastplate">Peitoral (em mm)</InputLabel>
                            <InputStyle type="number" name="fatData.fatBreastplate" id="fatBreastplate" onChange={updateField} required value={evaluation.fatBreastplate} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatMidAxillary">Axilar média (em mm)</InputLabel>
                            <InputStyle type="number" name="fatData.fatMidAxillary" id="fatMidAxillary" onChange={updateField} required value={evaluation.fatMidAxillary} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatSuprailiac">Supra-ilíaca (em mm)</InputLabel>
                            <InputStyle type="number" name="fatData.fatSuprailiac" id="fatSuprailiac" onChange={updateField} required value={evaluation.fatSuprailiac} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatAbdominal">Abdominal (em mm)</InputLabel>
                            <InputStyle type="number" name="fatData.fatAbdominal" id="fatAbdominal" onChange={updateField} required value={evaluation.fatAbdominal} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatMidFemoral">Femoral médio (em mm)</InputLabel>
                            <InputStyle type="number" name="fatData.fatMidFemoral" id="fatMidFemoral" onChange={updateField} required value={evaluation.fatMidFemoral} />
                        </InputLabelCnt>
                    </div>
                    <InputLabelCnt>
                        <InputLabel htmlFor="notes">Observações</InputLabel>
                        <TextareaStyle name="notes" id="notes" cols="30" rows="10" onChange={updateField} value={evaluation.notes} />
                    </InputLabelCnt>
                    <ButtonCnt1>
                        <SubmitButton type="submit" value="Atualizar avaliação" />
                    </ButtonCnt1>
                </FormStyle>
            </Main>
        </>
    )
}