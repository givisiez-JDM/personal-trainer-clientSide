import { useState, useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";

export default function UserNew() {
  const [user, setUser] = useState({
        name: "",
        isAdmin: false, 
        password: null,
        email: "",
    })

    const { signed } = useContext(LoginContext)

    async function createUser() {
        await api.post("/usuarios/novo-usuario", {
            name: user.name,
            isAdmin: user.isAdmin,
            password: user.password,
            email: user.email,
        }).then(() => {
            alert(`Usuário ${user.name} adicionado com sucesso!`)
        })
    }

const updateField = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

return (
    <>
        <Header />
        <Main>
            <header>
                <h1>Cadastro de usuário</h1>
            </header>
            <form onSubmit={createUser}>
                <div>
                    <label htmlFor="name">Nome completo</label>
                    <input type="text" name="name" id="name" onChange={updateField} />
                </div>
                <div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" onChange={updateField} />
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" onChange={updateField}  />
                </div>
                <div>
                    <label htmlFor="admin">Usuário admin?</label>
                    <select name="admin" id="admin" onChange={updateField} >
                        <option value="select"></option>
                        <option value="male">Sim</option>
                        <option value="female">Não</option>
                    </select>
                </div>
                <div>
                    <input type="submit" value="Cadastrar" />
                </div>
            </form>
        </Main>
    </>
  )
}
