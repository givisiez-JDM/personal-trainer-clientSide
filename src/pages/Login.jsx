import { FormCnt, LoginCnt, LoginForm, LoginInput, LoginLogo } from "../assets/styles/LoginStyle";
import Logo from "../assets/images/logo/logo-horizontal.png"

export default function Login() {
  return (
    <LoginCnt>
      <FormCnt>
        <LoginLogo src={Logo} alt="" />
        <LoginForm action="/" method="post">
          <label htmlFor="login">Login</label>
          <LoginInput type="text" name="login" id="login" />
          <label htmlFor="password">Senha</label>
          <LoginInput type="password" name="password" id="password" />
        </LoginForm>
      </FormCnt>
    </LoginCnt>
  )
}
