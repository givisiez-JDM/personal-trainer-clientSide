import { FormCnt, LoginCnt, LoginForm, LoginInput, LoginLabel, LoginLogo, LoginSubmit } from "./LoginStyle";
import Logo from "../../assets/images/logo/logo-horizontal.png"
import { ThemeProvider } from "styled-components";
import { mainThemeColor } from "../../assets/styles/Shared";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <ThemeProvider theme={mainThemeColor}>
      <LoginCnt>
        <FormCnt>
          <LoginLogo src={Logo} alt="" />
          <LoginForm action="/" method="post">
            <LoginLabel htmlFor="name">Nome completo</LoginLabel>
            <LoginInput type="text" name="name" id="name" />
            <LoginLabel htmlFor="login">E-mail</LoginLabel>
            <LoginInput type="email" name="login" id="login" />
            <LoginLabel htmlFor="password">Senha</LoginLabel>
            <LoginInput type="password" name="password" id="password" />
            <LoginSubmit type="submit" value="Cadastrar" />
            <Link to="/">Já tem cadastro? Clique aqui</Link>
          </LoginForm>
        </FormCnt>
      </LoginCnt>
    </ThemeProvider>
  )
}
