import { FormCnt, LoginCnt, LoginForm, LoginInput, LoginLabel, LoginLogo, LoginSubmit } from "./LoginStyle";
import { ThemeProvider } from "styled-components";
import { mainThemeColor } from "../../assets/styles/Shared";
import { Link, useNavigate } from "react-router-dom";
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
    console.log(user)
    e.preventDefault()

    try {
      await api.post("/usuarios/novo-usuario", {
        name: user.name,
        isAdmin: false,
        password: user.password,
        email: user.email,
      }).then(async () => {
        await signIn(user.email, user.password)
      }).then(() => {
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
            <LoginLabel htmlFor="name">Nome completo</LoginLabel>
            <LoginInput type="text" name="name" id="name" onChange={updateField} />
            <LoginLabel htmlFor="email">E-mail</LoginLabel>
            <LoginInput type="email" name="email" id="email" onChange={updateField} />
            <LoginLabel htmlFor="password">Senha</LoginLabel>
            <div>
              <LoginInput type={passwordShown ? 'text' : 'password'} name="password" id="password" onChange={updateField} />
              {passwordShown
                ? <VisibilityOnIcon onClick={() => setPasswordShown(!passwordShown)} />
                : <VisibilityOffIcon onClick={() => setPasswordShown(!passwordShown)} />
                }
            </div>
            <LoginSubmit type="submit" value="Cadastrar" />
          </LoginForm>
          <Link to="/">Já tem cadastro? Clique aqui</Link>
        </FormCnt>
      </LoginCnt>
    </ThemeProvider>
  )
}
