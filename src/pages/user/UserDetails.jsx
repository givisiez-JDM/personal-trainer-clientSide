import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        <h1>Perfil do usuário</h1>
        <p>Nome completo: {user.name !== "" ? user.name : 'Carregando...'} </p>
        <p>E-mail: {user.email !== "" ? user.email : 'Carregando...'} </p>
        <p>Usuário administrador: {user.isAdmin !== null ? user.isAdmin ? 'Sim' : 'Não' : 'Carregando...'}</p>
        <button onClick={updateUser}>Alterar dados do usuário</button>
        <button onClick={deleteUser}>Deletar usuário</button>
      </Main>
    </>
  )
}
