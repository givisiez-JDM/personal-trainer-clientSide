import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { PageTitle, SubmitButton, InputStyle } from "../../assets/styles/Shared";

export default function UserNew() {
  const [user, setUser] = useState({
        name: "",
        isAdmin: false,
        password: null,
        email: "",
    })

    const [passwordShown, setPasswordShown] = useState(false)

    let navigate = useNavigate();

    async function createUser(e) {
        e.preventDefault()

        await api.post("/usuarios/novo-usuario", {
            name: user.name,
            isAdmin: user.isAdmin,
            password: user.password,
            email: user.email,
        }).then(() => {
            alert(`Usuário ${user.name} adicionado com sucesso!`)
            navigate(`/usuarios/`)
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
                <PageTitle>Cadastro de usuário</PageTitle>
            </header>
            <form onSubmit={createUser}>
                <div>
                    <label htmlFor="name">Nome completo</label>
                    <InputStyle type="text" name="name" id="name" onChange={updateField} required />
                </div>
                <div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <InputStyle type="email" name="email" id="email" onChange={updateField} required />
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <InputStyle type={passwordShown ? 'text' : 'password'} name="password" id="password" onChange={updateField} required />
                    {passwordShown
                        ? <VisibilityOnIcon onClick={() => setPasswordShown(!passwordShown)} />
                        : <VisibilityOffIcon onClick={() => setPasswordShown(!passwordShown)} />
                    }
                </div>
                <div>
                    <label htmlFor="admin">Usuário admin?</label>
                    <select name="admin" id="admin" onChange={updateField} required >
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                    </select>
                </div>
                <div>
                    <SubmitButton type="submit" value="Cadastrar" />
                </div>
            </form>
        </Main>
    </>
  )
}
