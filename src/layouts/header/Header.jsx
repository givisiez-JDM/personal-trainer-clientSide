import { ThemeProvider } from "styled-components";
import { HeaderCnt, HeaderLink, HeaderNav, UserNameButton, UserOptionDiv } from "./HeaderStyle";
import { mainThemeColor } from "../../assets/styles/Shared";
import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { loggedUser, signOut } = useContext(LoginContext);
  const [toggleUserOptions, setToggleUserOptions] = useState(false)

  return (
    <ThemeProvider theme={mainThemeColor}>
      <HeaderCnt>
        <HeaderNav>
          <UserNameButton onClick={() => setToggleUserOptions(!toggleUserOptions)}>Olá, {loggedUser.name} </UserNameButton>
          <ul>
            <HeaderLink to="/"><li>Home</li></HeaderLink>
            {loggedUser.isAdmin && <HeaderLink to="/usuarios"><li>Usuários</li></HeaderLink>}
            {loggedUser.isAdmin && <HeaderLink to="/avaliacao/lista"><li>Avaliações físicas</li></HeaderLink>}
            <HeaderLink to="/clientes"><li>Clientes</li></HeaderLink>
            <HeaderLink to="/exercicios"><li>Exercícios</li></HeaderLink>
            <HeaderLink to="/treinos"><li>Treinos</li></HeaderLink>
          </ul>
        </HeaderNav>
      </HeaderCnt>
      {toggleUserOptions &&
        <UserOptionDiv>
          <Link to={`/usuarios/${loggedUser._id}`}>Perfil</Link>
          <button onClick={signOut}>Sair do app</button>
        </UserOptionDiv>
      }
    </ThemeProvider>
  )
}
