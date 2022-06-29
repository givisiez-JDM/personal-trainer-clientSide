import { FormCnt, GFButtonsDiv, GoogleButton, LoginCnt, LoginForm, LoginInput, LoginLogo } from "./LoginStyle";
import Logo from "../../assets/images/logo/logo-horizontal.png"
import { ThemeProvider } from "styled-components";
import { mainThemeColor, Paragraph, SubmitButton, WrittenLink, InputLabel } from "../../assets/styles/Shared";
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../../services/contexts/LoginContext";

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  })

  const { signIn } = useContext(LoginContext)
  // const { signIn, signInWithGoogle } = useContext(LoginContext)

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
            <SubmitButton type="submit" value="Login" />
            <Paragraph>Ou</Paragraph>
            <GFButtonsDiv>
              {/* <GoogleButton onClick={signInWithGoogle}>Faça login com <GoogleIcon />oogle</GoogleButton> */}
              <GoogleButton>Faça login com <GoogleIcon />oogle</GoogleButton>
            </GFButtonsDiv>
            <WrittenLink to="/registrar">Ainda não tem cadastro? Registre-se aqui</WrittenLink>
          </LoginForm>
        </FormCnt>
      </LoginCnt>
    </ThemeProvider>
  )
}
