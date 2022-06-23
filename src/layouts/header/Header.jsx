import { ThemeProvider } from "styled-components";
import { HeaderCnt, HeaderLink, HeaderNav } from "./HeaderStyle";
import { mainThemeColor } from "../../assets/styles/Shared";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

export default function Header() {
  const { loggedUser } = useContext(LoginContext);

  return (
    <ThemeProvider theme={mainThemeColor}>
      <HeaderCnt>
        <HeaderNav>
          <HeaderLink to={`/usuarios/${loggedUser._id}`}>Olá, {loggedUser.name} </HeaderLink>
          <ul>
            <HeaderLink to="/"><li>Home</li></HeaderLink>
            {loggedUser.isAdmin && <HeaderLink to="/usuarios"><li>Usuários</li></HeaderLink>}
            {loggedUser.isAdmin && <HeaderLink to="/avaliacao/lista"><li>Avaliações físicas</li></HeaderLink>}
            <HeaderLink to="/clientes"><li>Clientes</li></HeaderLink>
            <HeaderLink to="/treinos"><li>Treinos</li></HeaderLink>
          </ul>
        </HeaderNav>
      </HeaderCnt>
    </ThemeProvider>
  )
}
