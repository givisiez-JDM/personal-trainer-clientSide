import styled from "styled-components";
import bgLogin from "../images/images/homem-fazendo-flexao.jpg"

export const LoginCnt = styled.main`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5) url(${bgLogin}) no-repeat fixed top;
    background-blend-mode: darken;
    position: fixed;
    top: 0;
`

export const FormCnt = styled.main`
    background-color: white;
    max-width: 400px;
    margin: 30vh auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 20px;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`

export const LoginLogo = styled.img`
    max-width: 250px;
    height: auto;
`

export const LoginInput = styled.input`
    border-radius: 5px;
`