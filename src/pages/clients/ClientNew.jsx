import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../services/contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import {
  ButtonCnt1,
  FormStyle,
  InputLabel,
  InputLabelCnt,
  InputStyle,
  PageTitle,
  SelectStyle,
  SubmitButton,
} from "../../assets/styles/Shared";

export default function NewClient() {
  const { loggedUser } = useContext(LoginContext);
  let navigate = useNavigate();
  const [users, setusers] = useState([]);

  const [client, setclient] = useState({
    name: "",
    birthDate: null,
    gender: "Feminino",
    phone: "",
    email: "",
    profession: "",
    objective: "Condicionamento físico",
    personalTrainerId: loggedUser._id,
    personalTrainerName: loggedUser.name,
  });

  useEffect(() => {
    api.get("/usuarios").then((response) => {
      setusers(response.data);
    });
  }, []);

  function createClient(e) {
    e.preventDefault();

    if (!loggedUser.isAdmin) {
      setclient({
        ...client,
        personalTrainerId: loggedUser._id,
        personalTrainerName: loggedUser.name,
      });
    }

    api
      .post("/clientes/novo-cliente", {
        name: client.name,
        birthDate: client.birthDate,
        gender: client.gender,
        phone: client.phone,
        email: client.email,
        profession: client.profession,
        objective: client.objective,
        personalTrainerId: client.personalTrainerId,
        personalTrainerName: client.personalTrainerName,
      })
      .then(() => {
        alert(`Cliente ${client.name} adicionado com sucesso!`);
        navigate(`/clientes/`);
      });
  }

  const updateField = (e) => {
    setclient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <Main>
        <header>
          <PageTitle>Cadastro de Cliente</PageTitle>
        </header>
        <FormStyle onSubmit={createClient}>
          {loggedUser.isAdmin && (
            <InputLabelCnt>
              <InputLabel htmlFor="personalTrainerName">
                Personal Trainer:{" "}
              </InputLabel>
              <SelectStyle
                name="personalTrainerName"
                id="personalTrainerName"
                onChange={updateField}
                required
                defaultValue="Admin"
              >
                <option value="default" disabled selected>Escolha o personal</option>
                {users.map((user) => {
                  return (
                    <option key={user._id} value={user.name}>
                      {user.name}
                    </option>
                  );
                })}
              </SelectStyle>
            </InputLabelCnt>
          )}
          <InputLabelCnt>
            <InputLabel htmlFor="name">Nome completo: </InputLabel>
            <InputStyle
              type="text"
              name="name"
              id="name"
              onChange={updateField}
              required
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="birthDate">Data de nascimento: </InputLabel>
            <InputStyle
              type="date"
              name="birthDate"
              id="birthDate"
              onChange={updateField}
              required
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="gender">Sexo: </InputLabel>
            <SelectStyle
              name="gender"
              id="gender"
              onChange={updateField}
              required
              defaultValue="female"
            >
              <option value="default" disabled selected>Escolha o sexo</option>
              <option value={"Feminino"}>Feminino</option>
              <option value={"Masculino"}>Masculino</option>
            </SelectStyle>
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="phone">Telefone: </InputLabel>
            <InputStyle
              type="tel"
              name="phone"
              id="phone"
              onChange={updateField}
              required
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="email">E-mail: </InputLabel>
            <InputStyle
              type="email"
              name="email"
              id="email"
              onChange={updateField}
              required
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="profession">Profissão: </InputLabel>
            <InputStyle
              type="text"
              name="profession"
              id="profession"
              onChange={updateField}
              required
            />
          </InputLabelCnt>
          <InputLabelCnt>
            <InputLabel htmlFor="objective">Objetivo: </InputLabel>
            <SelectStyle
              name="objective"
              id="objective"
              onChange={updateField}
              required
              defaultValue="condicionamento"
            >
              <option value="default" disabled selected>Escolha o objetivo</option>
              <option value={"Condicionamento físico"}>
                Condicionamento físico
              </option>
              <option value={"Perder peso"}>Perder peso</option>
              <option value={"Ganhar massa muscular"}>
                Ganhar massa muscular
              </option>
            </SelectStyle>
          </InputLabelCnt>
          <ButtonCnt1>
            <SubmitButton type="submit" value="Cadastrar Cliente" />
          </ButtonCnt1>
        </FormStyle>
      </Main>
    </>
  );
}
