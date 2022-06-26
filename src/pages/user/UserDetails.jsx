import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageTitle, PrimaryButton, SecondaryButton } from "../../assets/styles/Shared";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";

export default function UserDetails() {
  let { userId } = useParams();
  let navigate = useNavigate();

  const [user, setUser] = useState([])

  async function fetchUserData() {
    const data = await api.get(`/usuarios/${userId}`)
    setUser(data.data)
  }

  function updateUser() {
    navigate(`/usuarios/editar-usuario/${user._id}`)
  }

  async function deleteUser() {
    await api.delete(`/usuarios/deletar-usuario/${user._id}`)
    .then(() => {
      alert('Usuário deletado com sucesso')
      navigate("/usuarios")
    })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <>
      <Header />
      <Main>
        <PageTitle>Perfil do usuário</PageTitle>
        <p>Nome completo: {user.name !== "" ? user.name : 'Carregando...'} </p>
        <p>E-mail: {user.email !== "" ? user.email : 'Carregando...'} </p>
        <p>Usuário administrador: {user.isAdmin !== null ? user.isAdmin ? 'Sim' : 'Não' : 'Carregando...'}</p>
        <PrimaryButton onClick={updateUser}>Alterar dados do usuário</PrimaryButton>
        <SecondaryButton onClick={deleteUser}>Deletar usuário</SecondaryButton>
      </Main>
    </>
  )
}
