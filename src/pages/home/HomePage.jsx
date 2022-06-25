import { useContext, useEffect, useState } from "react";
import { PrimaryButton } from "../../assets/styles/Shared";
import PieCharts from "../../components/PieCharts";
import { LoginContext } from "../../contexts/LoginContext";
import { getAgeFrom } from "../../helpers/dateHelpers";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import { ChartHeader, ChartsCnt, PieChartCnt, UpdateChartsBtnCnt } from "./HomePageStyle";

export default function HomePage() {
  const { loggedUser } = useContext(LoginContext);
  const [clients, setClients] = useState();
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
          label: "Quantidade de clientes por gênero",
          data: [women, men],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
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
      labels: ["Perder peso", "Ganhar massa muscular", "Condicionamento físico" ],
      datasets: [
        {
          label: "Objetivo dos clientes",
          data: [peso, massa, condicionamento],
          backgroundColor: [
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
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
      labels: ["Até 18 anos", "Entre 19 e 30 anos", "Entre 31 e 50 anos", "Entre 51 a 70 anos", "Mais de 70 anos" ],
      datasets: [
        {
          label: "Objetivo dos clientes",
          data: [menos18.length, ate30.length, ate50.length, ate70.length, mais70.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }

  function updateChartsData() {
    updateGenderData();
    updateObjectiveData();
    updateAgeData();
  }

  async function fetchUserData() {
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
        <h1>Relatório</h1>
        <UpdateChartsBtnCnt>
          <PrimaryButton onClick={updateChartsData}>Mostrar dados atualizados dos relatórios</PrimaryButton>
        </UpdateChartsBtnCnt>
        <ChartsCnt>
          <PieChartCnt>
            <ChartHeader>Quantidade de clientes por gênero</ChartHeader>
            <PieCharts data={genderChartData} />
          </PieChartCnt>
          <PieChartCnt>
            <ChartHeader>Objetivo dos clientes</ChartHeader>
            <PieCharts data={objectiveChartData} />
          </PieChartCnt>
          <PieChartCnt>
            <ChartHeader>Idade dos clientes</ChartHeader>
            <PieCharts data={ageChartData} />
          </PieChartCnt>
        </ChartsCnt>

      </Main>
    </>
  );
}
