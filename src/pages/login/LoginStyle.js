import styled from "styled-components";
import bgLogin from "../../assets/images/images/homem-fazendo-flexao.jpg"

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
    margin: 10vh auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 20px;

    @media (max-width: 480px) {
        margin: 5vh auto;
        max-width: 300px;
    }
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

export const GFButtonsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const GoogleButton = styled.button`
    background-color: red;
    border: none;
    color: white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2em;
`