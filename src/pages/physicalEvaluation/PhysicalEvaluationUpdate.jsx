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
        measurements: {},
        fatData: {},
        notes: "",
        _id: ""
    })

    const [measurements, setMeasurements] = useState({
        abdomenMeasure: 0,
        neckMeasure: 0,
        chestMeasure: 0,
        hipMeasure: 0,
        armsMeasure: 0,
        forearmsMeasure: 0,
        wristsMeasure: 0,
        thighMeasure: 0,
        calfMeasure: 0,
      });
    
      const [fatData, setFatData] = useState({
        fatSubscapularis: 0,
        fatTriceps: 0,
        fatBreastplate: 0,
        fatMidAxillary: 0,
        fatSuprailiac: 0,
        fatAbdominal: 0,
        fatMidFemoral: 0
      });

    
    useEffect(() => {
        async function fetchEvaluationData() {
            const data = await api.get(`/avaliacao/${evaluationId}`)
    
            setEvaluation({
                date: data.data.date,
                personalTrainerId: data.data.personalTrainerId,
                personalTrainerName: data.data.personalTrainerName,
                clientId: data.data.clientId,
                clientName: data.data.clientName,
                weight: data.data.weight,
                height: data.data.height,
                notes: data.data.notes,
                _id: data.data._id 
            })
            
            setMeasurements({
                abdomenMeasure: data.data.measurements.abdomenMeasure,
                neckMeasure: data.data.measurements.neckMeasure,
                chestMeasure: data.data.measurements.chestMeasure,
                hipMeasure: data.data.measurements.hipMeasure,
                armsMeasure: data.data.measurements.armsMeasure,
                forearmsMeasure: data.data.measurements.forearmsMeasure,
                wristsMeasure: data.data.measurements.wristsMeasure,
                thighMeasure: data.data.measurements.thighMeasure,
                calfMeasure: data.data.measurements.calfMeasure,
            })

            setFatData({
                fatSubscapularis: data.data.fatData.fatSubscapularis,
                fatTriceps: data.data.fatData.fatTriceps,
                fatBreastplate: data.data.fatData.fatBreastplate,
                fatMidAxillary: data.data.fatData.fatMidAxillary,
                fatSuprailiac: data.data.fatData.fatSuprailiac,
                fatAbdominal: data.data.fatData.fatAbdominal,
                fatMidFemoral: data.data.fatData.fatMidFemoral,
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
            measurements: {
                abdomenMeasure: measurements.abdomenMeasure,
                neckMeasure: measurements.neckMeasure,
                chestMeasure: measurements.chestMeasure,
                hipMeasure: measurements.hipMeasure,
                armsMeasure: measurements.armsMeasure,
                forearmsMeasure: measurements.forearmsMeasure,
                wristsMeasure: measurements.wristsMeasure,
                thighMeasure: measurements.thighMeasure,
                calfMeasure: measurements.calfMeasure
            },
            fatData: {
                fatSubscapularis: fatData.fatSubscapularis,
                fatTriceps: fatData.fatTriceps,
                fatBreastplate: fatData.fatBreastplate,
                fatMidAxillary: fatData.fatMidAxillary,
                fatSuprailiac: fatData.fatSuprailiac,
                fatAbdominal: fatData.fatAbdominal,
                fatMidFemoral: fatData.fatMidFemoral
            },
            notes,
            _id 
        }).then(() => {
            alert(`Avaliação física atualizada com sucesso!`)
            navigate(`/avaliacao/${_id}`)
        })
    }

    const updateFieldEvaluation = (e) => {
        setEvaluation({
          ...evaluation,
            [e.target.name]: e.target.value
        });
      };
    
      const updateFieldMeasurements = (e) => {
        setMeasurements({
            ...measurements,
            [e.target.name]: e.target.value
        });
      };
    
      const updateFieldFatData = (e) => {
        setFatData({
            ...fatData,
            [e.target.name]: e.target.value
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
                        <InputStyle type="date" name="date" id="date" onChange={updateFieldEvaluation} required value={dateInverted(evaluation.date)} />
                    </InputLabelCnt>
                    <InputLabelCnt>
                        <InputLabel htmlFor="weight">Peso (em kg)</InputLabel>
                        <InputStyle type="number" step=".01" name="weight" id="weight" onChange={updateFieldEvaluation} required value={evaluation.weight} />
                    </InputLabelCnt>
                    <InputLabelCnt>
                        <InputLabel htmlFor="height">Altura (em metros)</InputLabel>
                        <InputStyle type="number" step=".01" name="height" id="height" onChange={updateFieldEvaluation} required value={evaluation.height} />
                    </InputLabelCnt>
                    <InputLabelCnt>
                        <InputLabel htmlFor="IMC">IMC:</InputLabel>
                        <InputStyle type="number" step=".01" name="IMC" id="IMC" disabled value={evaluation.weight > 0 && evaluation.height > 0
                            ? (
                                evaluation.weight /
                                (evaluation.height * evaluation.height)
                                ).toFixed(2)
                            : 0} />
                    </InputLabelCnt>
                        <PageSubtitle>Medidas de circunferência</PageSubtitle>
                        <InputLabelCnt>
                            <InputLabel htmlFor="abdomenMeasure">Abdômen (em cm)</InputLabel>
                            <InputStyle type="number" name="abdomenMeasure" id="abdomenMeasure" onChange={updateFieldMeasurements} required value={measurements.abdomenMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="neckMeasure">Pescoço (em cm)</InputLabel>
                            <InputStyle type="number" name="neckMeasure" id="neckMeasure" onChange={updateFieldMeasurements} required value={measurements.neckMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="chestMeasure">Tórax (em cm)</InputLabel>
                            <InputStyle type="number" name="chestMeasure" id="chestMeasure" onChange={updateFieldMeasurements} required value={measurements.chestMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="hipMeasure">Quadril (em cm)</InputLabel>
                            <InputStyle type="number" name="hipMeasure" id="hipMeasure" onChange={updateFieldMeasurements} required value={measurements.hipMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="armsMeasure">Braço (em cm)</InputLabel>
                            <InputStyle type="number" name="armsMeasure" id="armsMeasure" onChange={updateFieldMeasurements} required value={measurements.armsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="forearmsMeasure">Antebraço (em cm)</InputLabel>
                            <InputStyle type="number" name="forearmsMeasure" id="forearmsMeasure" onChange={updateFieldMeasurements} required value={measurements.forearmsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="wristsMeasure">Punho (em cm)</InputLabel>
                            <InputStyle type="number" name="wristsMeasure" id="wristsMeasure" onChange={updateFieldMeasurements} required value={measurements.wristsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="thighMeasure">Coxa (em cm)</InputLabel>
                            <InputStyle type="number" name="thighMeasure" id="thighMeasure" onChange={updateFieldMeasurements} required value={measurements.thighMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="calfMeasure">Panturrilha (em cm)</InputLabel>
                            <InputStyle type="number" name="calfMeasure" id="calfMeasure" onChange={updateFieldMeasurements} required value={measurements.calfMeasure} />
                        </InputLabelCnt>
                        <PageSubtitle>Dobras cutâneas (7 dobras)</PageSubtitle>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatSubscapularis">Subescapular (em mm)</InputLabel>
                            <InputStyle type="number" name="fatSubscapularis" id="fatSubscapularis" onChange={updateFieldFatData} required value={fatData.fatSubscapularis} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatTriceps">Tríceps (em mm)</InputLabel>
                            <InputStyle type="number" name="fatTriceps" id="fatTriceps" onChange={updateFieldFatData} required value={fatData.fatTriceps} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatBreastplate">Peitoral (em mm)</InputLabel>
                            <InputStyle type="number" name="fatBreastplate" id="fatBreastplate" onChange={updateFieldFatData} required value={fatData.fatBreastplate} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatMidAxillary">Axilar média (em mm)</InputLabel>
                            <InputStyle type="number" name="fatMidAxillary" id="fatMidAxillary" onChange={updateFieldFatData} required value={fatData.fatMidAxillary} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatSuprailiac">Supra-ilíaca (em mm)</InputLabel>
                            <InputStyle type="number" name="fatSuprailiac" id="fatSuprailiac" onChange={updateFieldFatData} required value={fatData.fatSuprailiac} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatAbdominal">Abdominal (em mm)</InputLabel>
                            <InputStyle type="number" name="fatAbdominal" id="fatAbdominal" onChange={updateFieldFatData} required value={fatData.fatAbdominal} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatMidFemoral">Femoral médio (em mm)</InputLabel>
                            <InputStyle type="number" name="fatMidFemoral" id="fatMidFemoral" onChange={updateFieldFatData} required value={fatData.fatMidFemoral} />
                        </InputLabelCnt>
                    <InputLabelCnt>
                        <InputLabel htmlFor="notes">Observações</InputLabel>
                        <TextareaStyle name="notes" id="notes" cols="30" rows="10" onChange={updateFieldEvaluation} value={evaluation.notes} />
                    </InputLabelCnt>
                    <ButtonCnt1>
                        <SubmitButton type="submit" value="Atualizar avaliação" />
                    </ButtonCnt1>
                </FormStyle>
            </Main>
        </>
    )
}