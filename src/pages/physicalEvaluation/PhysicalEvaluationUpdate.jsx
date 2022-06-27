import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from '../../services/api'
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { dateInverted } from "../../helpers/dateHelpers";
import { ButtonCnt1, FormStyle, InputLabel, InputLabelCnt, InputStyle, PageSubtitle, PageTitle, SubmitButton, TextareaStyle } from "../../assets/styles/Shared";

export default function PhysicalEvaluationNew() {
  const { loggedUser } = useContext(LoginContext);
    let navigate = useNavigate();
    let { evaluationId } = useParams();

    const [evaluation, setEvaluation] = useState({
        createdAt: null,
        personalTrainerId: "",
        clientId: "",
        personalTrainerName: "",
        clientName: "",
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
        notes: "",
        _id: ""
    })

    
    useEffect(() => {
        async function fetchEvaluationData() {
            const data = await api.get(`/avaliacao/${evaluationId}`)
            const { 
                createdAt,
                personalTrainerId,
                personalTrainerName,
                clientId,
                clientName,
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
                notes,
                _id 
            } = data.data
    
            setEvaluation({
                createdAt,
                personalTrainerId,
                personalTrainerName,
                clientId,
                clientName,
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
                notes,
                _id
            })
        }

        fetchEvaluationData()
    }, [])

    function updateEvaluation(e) {
        e.preventDefault();

        const {
            createdAt,
            personalTrainerId,
            personalTrainerName,
            clientId,
            clientName,
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
            notes,
            _id
        } = evaluation

        api.put(`/avaliacao/editar-avaliacao/${evaluation._id}`, {
            createdAt,
            personalTrainerId,
            personalTrainerName,
            clientId,
            clientName,
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
            notes,
            _id
        }).then(() => {
            alert(`Avaliação física atualizada com sucesso!`)
            navigate(`/avaliacao/${_id}`)
        })
    }

    const updateField = e => {
        setEvaluation({
            ...evaluation,
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
                        <InputLabel htmlFor="createdAt">Data da avaliação:</InputLabel>
                        <InputStyle type="date" name="createdAt" id="createdAt" onChange={updateField} required value={dateInverted(evaluation.createdAt)} />
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
                        <InputStyle type="number" step=".01" name="IMC" id="IMC" onChange={updateField} disabled value={evaluation.IMC} />
                    </InputLabelCnt>
                    <div>
                        <PageSubtitle>Medidas de circunferência</PageSubtitle>
                        <InputLabelCnt>
                            <InputLabel htmlFor="abdomenMeasure">Abdômen (em cm)</InputLabel>
                            <InputStyle type="number" name="abdomenMeasure" id="abdomenMeasure" onChange={updateField} required value={evaluation.abdomenMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="neckMeasure">Pescoço (em cm)</InputLabel>
                            <InputStyle type="number" name="neckMeasure" id="neckMeasure" onChange={updateField} required value={evaluation.neckMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="chestMeasure">Tórax (em cm)</InputLabel>
                            <InputStyle type="number" name="chestMeasure" id="chestMeasure" onChange={updateField} required value={evaluation.chestMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="hipMeasure">Quadril (em cm)</InputLabel>
                            <InputStyle type="number" name="hipMeasure" id="hipMeasure" onChange={updateField} required value={evaluation.hipMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="armsMeasure">Braço (em cm)</InputLabel>
                            <InputStyle type="number" name="armsMeasure" id="armsMeasure" onChange={updateField} required value={evaluation.armsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="forearmsMeasure">Antebraço (em cm)</InputLabel>
                            <InputStyle type="number" name="forearmsMeasure" id="forearmsMeasure" onChange={updateField} required value={evaluation.forearmsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="wristsMeasure">Punho (em cm)</InputLabel>
                            <InputStyle type="number" name="wristsMeasure" id="wristsMeasure" onChange={updateField} required value={evaluation.wristsMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="thighMeasure">Coxa (em cm)</InputLabel>
                            <InputStyle type="number" name="thighMeasure" id="thighMeasure" onChange={updateField} required value={evaluation.thighMeasure} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="calfMeasure">Panturrilha (em cm)</InputLabel>
                            <InputStyle type="number" name="calfMeasure" id="calfMeasure" onChange={updateField} required value={evaluation.calfMeasure} />
                        </InputLabelCnt>
                    </div>
                    <div>
                        <PageSubtitle>Dobras cutâneas (7 dobras)</PageSubtitle>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatSubscapularis">Subescapular (em mm)</InputLabel>
                            <InputStyle type="number" name="fatSubscapularis" id="fatSubscapularis" onChange={updateField} required value={evaluation.fatSubscapularis} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatTriceps">Tríceps (em mm)</InputLabel>
                            <InputStyle type="number" name="fatTriceps" id="fatTriceps" onChange={updateField} required value={evaluation.fatTriceps} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatBreastplate">Peitoral (em mm)</InputLabel>
                            <InputStyle type="number" name="fatBreastplate" id="fatBreastplate" onChange={updateField} required value={evaluation.fatBreastplate} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatMidAxillary">Axilar média (em mm)</InputLabel>
                            <InputStyle type="number" name="fatMidAxillary" id="fatMidAxillary" onChange={updateField} required value={evaluation.fatMidAxillary} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatSuprailiac">Supra-ilíaca (em mm)</InputLabel>
                            <InputStyle type="number" name="fatSuprailiac" id="fatSuprailiac" onChange={updateField} required value={evaluation.fatSuprailiac} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatAbdominal">Abdôminal (em mm)</InputLabel>
                            <InputStyle type="number" name="fatAbdominal" id="fatAbdominal" onChange={updateField} required value={evaluation.fatAbdominal} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="fatMidFemoral">Femural médio (em mm)</InputLabel>
                            <InputStyle type="number" name="fatMidFemoral" id="fatMidFemoral" onChange={updateField} required value={evaluation.fatMidFemoral} />
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