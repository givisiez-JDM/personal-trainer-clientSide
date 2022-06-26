import styled from "styled-components"
import { Link } from "react-router-dom";

export const mainThemeColor = {
    primaryGreen: "#4cde75",
    secondaryGreen: "#01934a",
    darkerGreen: "#1c2f21",
    lightGray: "#c7c7c7",
    darkGray: "1d1d1d"
}

export const PageTitle = styled.h1`
    border-bottom: 1px solid #01934a;
`

export const PageSubtitle = styled.h2`
    color: #01934a;
`

export const PageSubtitle3 = styled.h3`
    color: #01934a;
`

export const PrimaryButton = styled.button`
    width: 100%;
    height: auto;
    background-color: #01934a;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    margin: 10px 0;
`

export const SecondaryButton = styled.button`
    width: 100%;
    height: auto;
    background-color: #4cde75;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    margin: 10px 0;
`

export const LinkButton = styled(Link)`
    width: 100%;
    height: auto;
    background-color: white;
    color: #01934a;
    border: 1px solid #01934a;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    margin: 10px 0;
`

export const SubmitButton = styled.input.attrs({
    type: 'submit'
})`
    width: 100%;
    height: auto;
    background-color: #01934a;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    margin: 10px 0;
`

export const InputStyle = styled.input`
    padding: 10px;
    border-radius: 15px;
`