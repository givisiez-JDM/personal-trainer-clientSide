import { ThemeProvider } from "styled-components";
import { HeaderCnt, HeaderLink, HeaderNav } from "./HeaderStyle";
import { mainThemeColor } from "../../assets/styles/Shared";

export default function Header() {
  return (
    <ThemeProvider theme={mainThemeColor}>
      <HeaderCnt>
        <HeaderNav>
          <ul>
            <HeaderLink to="/"><li>Home</li></HeaderLink>
            <HeaderLink to="/usuarios"><li>Usuários</li></HeaderLink>
            <HeaderLink to="/clientes"><li>Clientes</li></HeaderLink>
            <HeaderLink to="/treinos"><li>Treinos</li></HeaderLink>
          </ul>
          <HeaderLink to="/userdetails">Perfil</HeaderLink>
        </HeaderNav>
      </HeaderCnt>
    </ThemeProvider>
  )
}
