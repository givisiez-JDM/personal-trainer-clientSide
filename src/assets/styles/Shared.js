import styled from "styled-components"
import { Link } from "react-router-dom";

export const mainThemeColor = {
    primaryGreen: "#4cde75",
    secondaryGreen: "#01934a",
    darkerGreen: "#1c2f21",
    lightGray: "#c7c7c7",
    darkGray: "1d1d1d"
}

export const PrimaryButton = styled.button`
    width: 100%;
    height: auto;
    background-color: #01934a;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
`

export const SecondaryButton = styled.button`
    width: 100%;
    height: auto;
    background-color: #4cde75;
    color: #01934a;
    border: none;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
`

export const LinkButton = styled(Link)`
    width: 100%;
    height: auto;
    background-color: white;
    color: #01934a;
    border: 1px solid #01934a;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
`