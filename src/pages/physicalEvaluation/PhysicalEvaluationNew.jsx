import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../services/contexts/LoginContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  ButtonCnt1,
  FormStyle,
  InputLabel,
  InputLabelCnt,
  InputStyle,
  PageSubtitle,
  PageTitle,
  SubmitButton,
  TextareaStyle,
} from "../../assets/styles/Shared";
import { useEffect } from "react";

export default function PhysicalEvaluationNew() {
  const { loggedUser } = useContext(LoginContext);
  let navigate = useNavigate();
  let { clientId } = useParams();
  const [client, setClient] = useState();

  const [evaluation, setevaluation] = useState({
    date: null,
    personalTrainerId: "",
    clientId: "",
    personalTrainerName: "",
    clientName: "",
    weight: 0,
    height: 0,
    IMC: 0,
    measurements: {},
    fatData: {},
    notes: ""
  });

  const [measurements, setmeasurements] = useState({
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

  const [fatData, setfatData] = useState({
    fatSubscapularis: 0,
    fatTriceps: 0,
    fatBreastplate: 0,
    fatMidAxillary: 0,
    fatSuprailiac: 0,
    fatAbdominal: 0,
    fatMidFemoral: 0
  });

  async function createEvaluation(e) {
    e.preventDefault();

    await api.post("/avaliacao/nova-avaliacao", {
      date: evaluation.date,
      personalTrainerId: evaluation.personalTrainerId,
      personalTrainerName: evaluation.personalTrainerName,
      clientId: evaluation.clientId,
      clientName: evaluation.clientName,
      measurements: evaluation.measurements,
      fatData: evaluation.fatData,
      weight: evaluation.weight,
      height: evaluation.height,
      notes: evaluation.notes
    })
    .then(() => {
      alert(`Avaliação física feita com sucesso!`);
      navigate(`/clientes/${clientId}`);
    });
  }

  async function getData() {

    await api.get(`/clientes/${clientId}`)
    .then((response) => {
      setClient(response.data);

      setevaluation({
        ...evaluation,
        personalTrainerId: loggedUser._id,
        clientId: response.data._id,
        personalTrainerName: loggedUser.name,
        clientName: response.data.name
      })
    })
  }

  useEffect(() => {
    getData();
  }, []);

  const updateFieldEvaluation = (e) => {
    setevaluation({
      ...evaluation,
      [e.target.name]: e.target.value,
    });
  };

  const updateFieldMeasurements = (e) => {
    setmeasurements({
      ...measurements,
      [e.target.name]: e.target.value,
    });

    setevaluation({
      ...evaluation,
      measurements: measurements,
    });
  };

  const updateFieldFatData = (e) => {
    setfatData({
      ...fatData,
      [e.target.name]: e.target.value,
    });

    setevaluation({
      ...evaluation,
      fatData: fatData,
    });
  };

  return (
    <>
      <Header />
      <Main>
        <header>
          <PageTitle>Avaliação física</PageTitle>
        </header>
        <FormStyle onSubmit={createEvaluation}>
          <InputLabelCnt>
            <InputLabel htmlFor="date">Data da avaliação:</InputLabel>
            <InputStyle
              type="date"
              name="date"
              id="date"
              onChange={updateFieldEvaluation}
              required
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="weight">Peso (em kg)</InputLabel>
            <InputStyle
              type="number"
              step=".01"
              name="weight"
              id="weight"
              onChange={updateFieldEvaluation}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="height">Altura (em metros)</InputLabel>
            <InputStyle
              type="number"
              step=".01"
              name="height"
              id="height"
              onChange={updateFieldEvaluation}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="IMC">IMC:</InputLabel>
            <InputStyle
              type="number"
              step=".01"
              name="IMC"
              id="IMC"
              disabled
              value={
                evaluation.weight > 0 && evaluation.height > 0
                  ? (
                      evaluation.weight /
                      (evaluation.height * evaluation.height)
                    ).toFixed(2)
                  : 0
              }
            />
          </InputLabelCnt>
          <PageSubtitle>Medidas de circunferência</PageSubtitle>
          <InputLabelCnt>
            <InputLabel htmlFor="abdomenMeasure">Abdômen (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="abdomenMeasure"
              id="abdomenMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="neckMeasure">Pescoço (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="neckMeasure"
              id="neckMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="chestMeasure">Tórax (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="chestMeasure"
              id="chestMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="hipMeasure">Quadril (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="hipMeasure"
              id="hipMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="armsMeasure">Braço (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="armsMeasure"
              id="armsMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="forearmsMeasure">Antebraço (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="forearmsMeasure"
              id="forearmsMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="wristsMeasure">Punho (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="wristsMeasure"
              id="wristsMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="thighMeasure">Coxa (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="thighMeasure"
              id="thighMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="calfMeasure">Panturrilha (em cm)</InputLabel>
            <InputStyle
              type="number"
              name="calfMeasure"
              id="calfMeasure"
              onChange={updateFieldMeasurements}
              required
              min="0"
            />
          </InputLabelCnt>
          <PageSubtitle>Dobras cutâneas (7 dobras)</PageSubtitle>
          <InputLabelCnt>
            <InputLabel htmlFor="fatSubscapularis">
              Subescapular (em mm)
            </InputLabel>
            <InputStyle
              type="number"
              name="fatSubscapularis"
              id="fatSubscapularis"
              onChange={updateFieldFatData}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="fatTriceps">Tríceps (em mm)</InputLabel>
            <InputStyle
              type="number"
              name="fatTriceps"
              id="fatTriceps"
              onChange={updateFieldFatData}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="fatBreastplate">Peitoral (em mm)</InputLabel>
            <InputStyle
              type="number"
              name="fatBreastplate"
              id="fatBreastplate"
              onChange={updateFieldFatData}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="fatMidAxillary">
              Axilar média (em mm)
            </InputLabel>
            <InputStyle
              type="number"
              name="fatMidAxillary"
              id="fatMidAxillary"
              onChange={updateFieldFatData}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="fatSuprailiac">
              Supra-ilíaca (em mm)
            </InputLabel>
            <InputStyle
              type="number"
              name="fatSuprailiac"
              id="fatSuprailiac"
              onChange={updateFieldFatData}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="fatAbdominal">Abdominal (em mm)</InputLabel>
            <InputStyle
              type="number"
              name="fatAbdominal"
              id="fatAbdominal"
              onChange={updateFieldFatData}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="fatMidFemoral">
              Femoral médio (em mm)
            </InputLabel>
            <InputStyle
              type="number"
              name="fatMidFemoral"
              id="fatMidFemoral"
              onChange={updateFieldFatData}
              required
              min="0"
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="notes">Observações</InputLabel>
            <TextareaStyle
              name="notes"
              id="notes"
              cols="30"
              rows="10"
              onChange={updateFieldEvaluation}
            />
          </InputLabelCnt>
          <ButtonCnt1>
            <SubmitButton type="submit" value="Cadastrar avaliação" />
          </ButtonCnt1>
        </FormStyle>
      </Main>
    </>
  );
}
