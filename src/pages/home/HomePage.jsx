import { useContext, useEffect, useState } from "react";
import PieCharts from "../../components/PieCharts";
import { LoginContext } from "../../contexts/LoginContext";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import { ChartCnt, ChartHeader, ChartsCnt } from "./HomePageStyle";

export default function HomePage() {
  const { loggedUser } = useContext(LoginContext);
  const [clients, setClients] = useState();
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

  function updateChartsData() {
    updateGenderData();
    updateObjectiveData();
  }

  async function fetchUserData() {
    await api.get(`/clientes/lista/${loggedUser._id}`).then((response) => {
      setClients(response.data);
    });
    updateChartsData();
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <h1>Relatório</h1>
        <button onClick={updateChartsData}>Mostrar dados atualizados dos relatórios</button>
        <ChartsCnt>
          <ChartCnt>
            <ChartHeader>Quantidade de clientes por gênero</ChartHeader>
            <PieCharts data={genderChartData} />
          </ChartCnt>
          <ChartCnt>
            <ChartHeader>Objetivo dos clientes</ChartHeader>
            <PieCharts data={objectiveChartData} />
          </ChartCnt>
        </ChartsCnt>

      </Main>
    </>
  );
}
