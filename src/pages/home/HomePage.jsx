import { useContext, useEffect, useState } from "react";
import { PageTitle, Paragraph, PrimaryButton } from "../../assets/styles/Shared";
import BarCharts from "../../components/BarCharts";
import PieCharts from "../../components/PieCharts";
import { LoginContext } from "../../services/contexts/LoginContext";
import { getAgeFrom } from "../../helpers/dateHelpers";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import { BarChartCnt, ChartHeader, ChartsCnt, PieChartCnt, UpdateChartsBtnCnt } from "./HomePageStyle";

export default function HomePage() {
  const { loggedUser } = useContext(LoginContext);
  const [clients, setClients] = useState([]);
  const [exercises, setExercises] = useState();
  const [genderChartData, setgenderChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0,
      },
    ],
  });
  
  const [objectiveChartData, setObjectiveChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0,
      },
    ],
  });

  const [ageChartData, setAgeChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0,
      },
    ],
  });
  
  const [valenceChartData, setValenceChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0,
      },
    ],
  });
  
  const [muscleChartData, setMuscleChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0,
      },
    ],
  });

  const chartDarkColors = ['#4cde75', '#4cb2de', '#ded94c', '#de4e4c', '#8e4cde' ]
  const chartLightColors = ['#01934a', '#013993', '#936c01', '#931201', '#540193' ]
  
  function updateGenderData() {
    let women = 0;
    let men = 0;
    
    if (clients) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].gender === "Feminino") {
          women++;
        } else {
          men++;
        }
      }
    }

    setgenderChartData({
      labels: ["Mulheres", "Homens"],
      datasets: [
        {
          label: "Quantidade de clientes por g??nero",
          data: [women, men],
          backgroundColor: [
            "#de4e4c", "#4cb2de"
            
          ],
          borderColor: ["#931201",
          "#013993",],
          borderWidth: 1,
        },
      ],
    });
  }

  function updateObjectiveData() {
    let peso = 0;
    let massa = 0;
    let condicionamento = 0;

    if (clients) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].objective === "Perder peso") {
          peso++;
        } else if (clients[i].objective === "Ganhar massa muscular") {
          massa++;
        } else {
          condicionamento++
        }
      }
    }

    setObjectiveChartData({
      labels: ["Perder peso", "Ganhar massa muscular", "Condicionamento f??sico" ],
      datasets: [
        {
          label: "Objetivo dos clientes",
          data: [peso, massa, condicionamento],
          backgroundColor: chartDarkColors,
          borderColor: chartLightColors,
          borderWidth: 1,
        },
      ],
    });
  }

  function updateAgeData() {
    let age = 0;
    let menos18 = [];
    let ate30 = [];
    let ate50 = [];
    let ate70 = [];
    let mais70 = [];

    clients.forEach(client => {
      age = getAgeFrom(client.birthDate)

      if (age <= 18) {
        menos18.push(age)
      } 
      if (age >=19 && age <= 30) {
        ate30.push(age)
      } 
      if (age >=31 && age <= 50) {
        ate50.push(age)
      } 
      if (age >=51 && age <= 70) {
        ate70.push(age)
      } 
      if (age > 70) {
        mais70.push(age)
      } 
    })

    setAgeChartData({
      labels: ["At?? 18 anos", "Entre 19 e 30 anos", "Entre 31 e 50 anos", "Entre 51 a 70 anos", "Mais de 70 anos" ],
      datasets: [
        {
          label: "Objetivo dos clientes",
          data: [menos18.length, ate30.length, ate50.length, ate70.length, mais70.length],
          backgroundColor: chartDarkColors,
          borderColor: chartLightColors,
          borderWidth: 1,
        },
      ],
    });
  }


  function updateValenceData() {
    let equilibrio = 0;
    let flexibilidade = 0;
    let forca = 0;
    let mobilidade = 0;
    let potencia = 0;

    exercises.forEach(exercise => {

      if (exercise.valence === 'Equil??brio') {
        equilibrio++
      } 
      if (exercise.valence === 'Flexibilidade') {
        flexibilidade++
      } 
      if (exercise.valence === 'For??a') {
        forca++
      } 
      if (exercise.valence === 'Mobilidade') {
        mobilidade++
      } 
      if (exercise.valence === 'Pot??ncia') {
        potencia++
      } 
      
    })

    setValenceChartData({
      labels: ['Equil??brio', 'Flexibilidade', 'For??a', 'Mobilidade', 'Pot??ncia'],
      datasets: [
        {
          label: 'Quantidade de exerc??cios por val??ncia',
          data: [equilibrio, flexibilidade, forca, mobilidade, potencia],
          backgroundColor: chartDarkColors,
          borderColor: chartLightColors,
          borderWidth: 1
        },
      ],
    })
  }

  function updateMuscleData() {
    let abdominal = 0;
    let biceps = 0;
    let costas = 0;
    let dorsal = 0;
    let ombro = 0;
    let peito = 0;
    let perna = 0;
    let quatriceps = 0;
    let triceps = 0;

    exercises.forEach(exercise => {

      if (exercise.muscleGroup === 'Abdominal') {
        abdominal++
      } 
      if (exercise.muscleGroup === 'Biceps') {
        biceps++
      } 
      if (exercise.muscleGroup === 'Costas') {
        costas++
      } 
      if (exercise.muscleGroup === 'Dorsal') {
        dorsal++
      } 
      if (exercise.muscleGroup === 'Ombro') {
        ombro++
      } 
      if (exercise.muscleGroup === 'Peito') {
        peito++
      } 
      if (exercise.muscleGroup === 'Perna') {
        perna++
      } 
      if (exercise.muscleGroup === 'Quatriceps') {
        quatriceps++
      } 
      if (exercise.muscleGroup === 'Triceps') {
        triceps++
      } 
      
    })

    setMuscleChartData({
      labels: ['Abdominal', 'Biceps', 'Costas', 'Dorsal', 'Ombro', 'Peito', 'Perna', 'Quatriceps', 'Triceps' ],
      datasets: [
        {
          label: 'Quantidade de exerc??cios por grupo muscular',
          data: [abdominal, biceps, costas, dorsal, ombro, peito, perna, quatriceps, triceps],
          backgroundColor: chartDarkColors,
          borderColor: chartLightColors,
          borderWidth: 1
        },
      ],
    })
  }

  function updateChartsData() {
    updateGenderData();
    updateObjectiveData();
    updateAgeData();
    updateValenceData();
    updateMuscleData();
  }

  async function fetchUserData() {
    loggedUser.isAdmin ?
    await api.get(`/clientes/lista`).then((response) => {
      setClients(response.data);
    })
    :
    await api.get(`/clientes/lista/${loggedUser._id}`).then((response) => {
      setClients(response.data);
    });

    await api.get(`/exercicios/`).then((response) => {
      setExercises(response.data);
    });
    updateChartsData();
  }


  useEffect(() => {
    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Main>
        <PageTitle>Relat??rio</PageTitle>
        <UpdateChartsBtnCnt>
          <PrimaryButton onClick={updateChartsData}>Mostrar dados atualizados dos relat??rios</PrimaryButton>
        </UpdateChartsBtnCnt>
        <ChartsCnt>
          <PieChartCnt>
            <ChartHeader>Quantidade de clientes por g??nero</ChartHeader>
            {clients.length !== 0 ?
              <PieCharts data={genderChartData} />
              : <Paragraph>Voc?? ainda n??o possui clientes</Paragraph>
            }
          </PieChartCnt>
          <PieChartCnt>
            <ChartHeader>Objetivo dos clientes</ChartHeader>
            {clients.length !== 0 ?
              <PieCharts data={objectiveChartData} />
              : <Paragraph>Voc?? ainda n??o possui clientes</Paragraph>
            }
          </PieChartCnt>
          <PieChartCnt>
            <ChartHeader>Idade dos clientes</ChartHeader>
            {clients.length !== 0 ?
              <PieCharts data={ageChartData} />
            : <Paragraph>Voc?? ainda n??o possui clientes</Paragraph>
            }
          </PieChartCnt>
        </ChartsCnt>
        <ChartsCnt>
          <BarChartCnt>
            <ChartHeader>Exerc??cios por val??ncia</ChartHeader>
            <BarCharts data={valenceChartData} />
          </BarChartCnt>
          <BarChartCnt>
            <ChartHeader>Exerc??cios por grupo muscular</ChartHeader>
            <BarCharts data={muscleChartData} />
          </BarChartCnt>
        </ChartsCnt>
      </Main>
    </>
  );
}
