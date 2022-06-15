import { FacebookButton, FormCnt, GFButtonsDiv, GoogleButton, LoginCnt, LoginForm, LoginInput, LoginLabel, LoginLogo, LoginSubmit } from "./LoginStyle";
import Logo from "../../assets/images/logo/logo-horizontal.png"
import { ThemeProvider } from "styled-components";
import { mainThemeColor } from "../../assets/styles/Shared";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

export default function Login() {
  
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  })

  const { signIn } = useContext(LoginContext)
  
  async function login(e) {
      e.preventDefault();
      await signIn(userLogin.email, userLogin.password);
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
            <LoginInput type="email" name="email" id="email" onChange={updateField} />
            <LoginLabel htmlFor="password">Senha</LoginLabel>
            <LoginInput type="password" name="password" id="password" onChange={updateField} />
            <LoginSubmit type="submit" value="Login" />
            <GFButtonsDiv>
              <GoogleButton><GoogleIcon />oogle</GoogleButton>
              <FacebookButton><FacebookIcon />acebook</FacebookButton>
            </GFButtonsDiv>
            <Link to="/registrar">Ainda não tem cadastro? Registre-se aqui</Link>
          </LoginForm>
        </FormCnt>
      </LoginCnt>
    </ThemeProvider>
  )
}
