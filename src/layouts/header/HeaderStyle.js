import styled from "styled-components";
import { Link } from "react-router-dom";
import { SwipeableDrawer } from "@mui/material";
import { PrimaryButton } from "../../assets/styles/Shared";

export const HeaderCnt = styled.header`
    width: 100%;
    background-color: ${props => props.theme.secondaryGreen};
    position: sticky;
    top: 0;
`

export const HeaderNav = styled.nav`
    max-width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;

    ul {
        list-style: none;
        display: flex;
    }
`

export const HeaderLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-weight: 600;
    margin: 0 10px;
    font-size: 1.2em;
`

export const MobileLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.secondaryGreen};
    font-weight: 600;
    padding: 10px;
    font-size: 1.2em;
    border-bottom: 1px solid ${props => props.theme.secondaryGreen}; 
`

export const UserNameP = styled.p`
    color: white;
    font-size: 1.2em;
`

export const CloseMenuBtn = styled.button`
    color: white;
    background-color: #01934a;
    border: none;
    padding: 10px;
    text-align: right;
`

export const ExitButton = styled.button`
    width: 100%;
    max-width: 150px;
    margin: 10px auto;
    height: auto;
    background-color: #01934a;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    font-size: 1.2em;
`

export const UserNameButton = styled.button`
    color: white;
    font-weight: 600;
    margin: 0 10px;
    font-size: 16px;
    border: none;
    background-color: ${props => props.theme.secondaryGreen};
    cursor: pointer;
    font-size: 1.2em;
`

export const UserOptionDiv = styled.div`
    width: 180px;
    height: 80px;
    border: none;
    padding: 10px 20px;
    position: fixed;
    top: 53px;
    left: 0;
    display: flex;
    flex-flow: column nowrap;
    background-color: ${props => props.theme.secondaryGreen};
    cursor: pointer;

    a {
        text-decoration: none;
        color: white;
        font-weight: 600;
        margin: 5px;
        font-size: 16px;
        font-size: 1.2em;
    }

    button {
        text-decoration: none;
        color: white;
        font-weight: 600;
        margin: 5px;
        font-size: 16px;
        background-color: ${props => props.theme.secondaryGreen};
        border: none;
        text-align: left;
        padding: 0;
        cursor: pointer;
        font-size: 1.2em;
    }
`