import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { PageTitle, SubmitButton, InputStyle, InputLabel, SelectStyle, FormStyle, InputLabelCnt, ButtonCnt1 } from "../../assets/styles/Shared";

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
            <FormStyle onSubmit={createUser}>
                <InputLabelCnt>
                    <InputLabel htmlFor="name">Nome completo</InputLabel>
                    <InputStyle type="text" name="name" id="name" onChange={updateField} required />
                </InputLabelCnt>
                <InputLabelCnt>
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <InputStyle type="email" name="email" id="email" onChange={updateField} required />
                </InputLabelCnt>
                <InputLabelCnt>
                    <InputLabel htmlFor="password">Senha</InputLabel>
                    <InputStyle type={passwordShown ? 'text' : 'password'} name="password" id="password" onChange={updateField} required />
                    {passwordShown
                        ? <VisibilityOnIcon onClick={() => setPasswordShown(!passwordShown)} />
                        : <VisibilityOffIcon onClick={() => setPasswordShown(!passwordShown)} />
                    }
                </InputLabelCnt>
                <InputLabelCnt>
                    <InputLabel htmlFor="admin">Usuário admin?</InputLabel>
                    <SelectStyle name="admin" id="admin" onChange={updateField} required >
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                    </SelectStyle>
                </InputLabelCnt>
                <ButtonCnt1>
                    <SubmitButton type="submit" value="Cadastrar" />
                </ButtonCnt1>
            </FormStyle>
        </Main>
    </>
  )
}
