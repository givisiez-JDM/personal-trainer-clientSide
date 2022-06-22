import { FormCnt, GFButtonsDiv, GoogleButton, LoginCnt, LoginForm, LoginInput, LoginLabel, LoginLogo, LoginSubmit } from "./LoginStyle";
import Logo from "../../assets/images/logo/logo-horizontal.png"
import { ThemeProvider } from "styled-components";
import { mainThemeColor } from "../../assets/styles/Shared";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  })

  const { signIn, signed } = useContext(LoginContext)

  const [passwordShown, setPasswordShown] = useState(false)

  async function login(e) {
    e.preventDefault();

    try {
      await signIn(userLogin.email, userLogin.password)
    } catch (error) {
      alert(error.response.data)
    }

  }

  const updateField = e => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ThemeProvider theme={mainThemeColor}>
      <LoginCnt>
        <FormCnt onSubmit={login}>
          <LoginLogo src={Logo} alt="" />
          <LoginForm action="/">
            <LoginLabel htmlFor="email">E-mail</LoginLabel>
            <LoginInput type="email" name="email" id="email" onChange={updateField} required />
            <LoginLabel htmlFor="password">Senha</LoginLabel>
            <div>
              <LoginInput type={passwordShown ? 'text' : 'password'} name="password" id="password" onChange={updateField} required />
              {passwordShown
                ? <VisibilityOnIcon onClick={() => setPasswordShown(!passwordShown)} />
                : <VisibilityOffIcon onClick={() => setPasswordShown(!passwordShown)} />
              }
            </div>
            <LoginSubmit type="submit" value="Login" />
            <p>Ou</p>
            <GFButtonsDiv>
              <GoogleButton>Faça login com <GoogleIcon />oogle</GoogleButton>
            </GFButtonsDiv>
            <Link to="/registrar">Ainda não tem cadastro? Registre-se aqui</Link>
          </LoginForm>
        </FormCnt>
      </LoginCnt>
    </ThemeProvider>
  )
}
