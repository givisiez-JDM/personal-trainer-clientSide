import { FormCnt, LoginCnt, LoginForm, LoginInput, LoginLabel, LoginLogo, LoginSubmit } from "./LoginStyle";
import Logo from "../../assets/images/logo/logo-horizontal.png"
import { ThemeProvider } from "styled-components";
import { mainThemeColor } from "../../assets/styles/Shared";

export default function Login() {
  return (
    <ThemeProvider theme={mainThemeColor}>
      <LoginCnt>
        <FormCnt>
          <LoginLogo src={Logo} alt="" />
          <LoginForm action="/" method="post">
            <LoginLabel htmlFor="login">Login</LoginLabel>
            <LoginInput type="text" name="login" id="login" />
            <LoginLabel htmlFor="password">Senha</LoginLabel>
            <LoginInput type="password" name="password" id="password" />
            <LoginSubmit type="submit" value="Login" />
          </LoginForm>
        </FormCnt>
      </LoginCnt>
    </ThemeProvider>
  )
}
