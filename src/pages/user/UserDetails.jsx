import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ButtonCnt2, MarginCnt, PageTitle, Paragraph, PrimaryButton, SecondaryButton } from "../../assets/styles/Shared";
import { LoginContext } from "../../services/contexts/LoginContext";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";

export default function UserDetails() {
  let { userId } = useParams();
  let navigate = useNavigate();
  const { signOut, loggedUser } = useContext(LoginContext);

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
      if (user._id === loggedUser) {
        signOut()
      } else {
        navigate("/usuarios")
      }
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
        <ButtonCnt2>
          <PrimaryButton onClick={updateUser}>Alterar dados do usuário</PrimaryButton>
          <SecondaryButton onClick={deleteUser}>Deletar usuário</SecondaryButton>
        </ButtonCnt2>
        <MarginCnt>
          <Paragraph>Nome completo: {user.name !== "" ? user.name : 'Carregando...'} </Paragraph>
          <Paragraph>E-mail: {user.email !== "" ? user.email : 'Carregando...'} </Paragraph>
          <Paragraph>Usuário administrador: {user.isAdmin !== null ? user.isAdmin ? 'Sim' : 'Não' : 'Carregando...'}</Paragraph>
        </MarginCnt>
      </Main>
    </>
  )
}
