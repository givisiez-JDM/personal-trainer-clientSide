import { FormCnt, LoginCnt, LoginForm, LoginInput, LoginLogo } from "./LoginStyle";
import { ThemeProvider } from "styled-components";
import { InputLabel, mainThemeColor, SubmitButton, WrittenLink } from "../../assets/styles/Shared";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { api } from "../../services/api";
import Logo from "../../assets/images/logo/logo-horizontal.png"
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoginContext } from "../../contexts/LoginContext";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    isAdmin: false,
    password: null,
    email: ""
  })

  const [passwordShown, setPasswordShown] = useState(false)

  const { signIn } = useContext(LoginContext)

  let navigate = useNavigate();

  async function createUser(e) {
    e.preventDefault()

    try {
      await api.post("/usuarios/novo-usuario", {
        name: user.name,
        isAdmin: false,
        password: user.password,
        email: user.email,
      }).then(async () => {
        await signIn(user.email, user.password)
        navigate(`/`)
      })
    } catch (error) {
      alert(error.response.data)
    }

    
    }

  const updateField = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ThemeProvider theme={mainThemeColor}>
      <LoginCnt>
        <FormCnt>
          <LoginLogo src={Logo} alt="" />
          <LoginForm onSubmit={createUser}>
            <InputLabel htmlFor="name">Nome completo</InputLabel>
            <LoginInput type="text" name="name" id="name" onChange={updateField} required />
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <LoginInput type="email" name="email" id="email" onChange={updateField} required />
            <InputLabel htmlFor="password">Senha</InputLabel>
            <div>
              <LoginInput type={passwordShown ? 'text' : 'password'} name="password" id="password" onChange={updateField} required />
              {passwordShown
                ? <VisibilityOnIcon onClick={() => setPasswordShown(!passwordShown)} />
                : <VisibilityOffIcon onClick={() => setPasswordShown(!passwordShown)} />
                }
            </div>
            <SubmitButton type="submit" value="Cadastrar" />
          </LoginForm>
          <WrittenLink to="/">Já tem cadastro? Clique aqui</WrittenLink>
        </FormCnt>
      </LoginCnt>
    </ThemeProvider>
  )
}
