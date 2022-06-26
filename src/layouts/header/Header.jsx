import { ThemeProvider } from "styled-components";
import { CloseMenuBtn, ExitButton, HeaderCnt, HeaderLink, HeaderNav, MobileLink, UserNameButton, UserNameP, UserOptionDiv } from "./HeaderStyle";
import { mainThemeColor } from "../../assets/styles/Shared";
import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { Link } from "react-router-dom";
import { Hidden, IconButton,  SwipeableDrawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const { loggedUser, signOut } = useContext(LoginContext);
  const [toggleUserOptions, setToggleUserOptions] = useState(false)

  return (
    <>
      <ThemeProvider theme={mainThemeColor}>
        <Hidden smUp>
          <HeaderCnt>
            <HeaderNav>
              <UserNameP>Olá, {loggedUser.name}! </UserNameP>
              <IconButton onClick={() => setToggleUserOptions(!toggleUserOptions)}>
                <MenuIcon />
              </IconButton>
            </HeaderNav>
            <SwipeableDrawer
              anchor="right"
              open={toggleUserOptions}
              onClose={() => setToggleUserOptions(false)}
              onOpen={() => setToggleUserOptions(true)}
            >
              <CloseMenuBtn onClick={() => setToggleUserOptions(false)}>x</CloseMenuBtn>
              <MobileLink to={`/usuarios/${loggedUser._id}`}>Perfil</MobileLink>
              <ExitButton onClick={signOut}>Sair do app</ExitButton>
              <br />
              <br />
              <MobileLink to="/">Home</MobileLink>
              {loggedUser.isAdmin && <MobileLink to="/usuarios">Usuários</MobileLink>}
              <MobileLink to="/clientes">Clientes</MobileLink>
              {loggedUser.isAdmin && <MobileLink to="/avaliacao/lista">Avaliações físicas</MobileLink>}
              <MobileLink to="/exercicios">Exercícios</MobileLink>
              <MobileLink to="/treinos">Treinos</MobileLink>
            </SwipeableDrawer>
          </HeaderCnt>
        </Hidden>
        <Hidden smDown>
          <HeaderCnt>
            <HeaderNav>
              <UserNameButton onClick={() => setToggleUserOptions(!toggleUserOptions)}>Olá, {loggedUser.name}! </UserNameButton>
              <ul>
                <HeaderLink to="/"><li>Home</li></HeaderLink>
                {loggedUser.isAdmin && <HeaderLink to="/usuarios"><li>Usuários</li></HeaderLink>}
                <HeaderLink to="/clientes"><li>Clientes</li></HeaderLink>
                {loggedUser.isAdmin && <HeaderLink to="/avaliacao/lista"><li>Avaliações físicas</li></HeaderLink>}
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
        </Hidden>
      </ThemeProvider>
    </>
  )
}
