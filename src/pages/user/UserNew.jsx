import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
                    <input type={passwordShown ? 'text' : 'password'} name="password" id="password" onChange={updateField} />
                    {passwordShown
                        ? <VisibilityOnIcon onClick={() => setPasswordShown(!passwordShown)} />
                        : <VisibilityOffIcon onClick={() => setPasswordShown(!passwordShown)} />
                    }
                </div>
                <div>
                    <label htmlFor="admin">Usuário admin?</label>
                    <select name="admin" id="admin" onChange={updateField} >
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
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
