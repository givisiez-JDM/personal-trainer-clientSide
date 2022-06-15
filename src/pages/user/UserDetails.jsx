import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

export default function UserDetails() {
  let { userId } = useParams(); 

  const [user, setUser] = useState({})

  async function fetchUserData() {
    const data = await api.get(`/usuarios/${userId}`)
    .then(() => {
      setUser(data)      
    })

    
  }

  console.log(user)

  useEffect(() => {
    fetchUserData()
  }, [])  

  return (
    <>
      <h1>Perfil do usuário</h1>
      {/* <p>Nome completo: {user.name} </p>
      <p>E-mail: {user.email} </p>
      <p>Usuário administrador: {user.isAdmin ? 'Sim' : 'Não'}</p> */}
      <button>Alterar senha</button>
      <button>Deletar usuário</button>
    </>
  )
}
