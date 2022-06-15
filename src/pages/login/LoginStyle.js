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

export const LoginLabel = styled.label``

export const LoginInput = styled.input`
    border-radius: 5px;
`

export const LoginSubmit = styled.input`
    background-color: ${props => props.theme.darkGreen};
    border: none;
    color: white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    font-weight: 700;
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
    max-width: 140px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FacebookButton = styled.button`
    background-color: #1976d2;
    border: none;
    color: white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    max-width: 140px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`