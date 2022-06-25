import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderCnt = styled.header`
    width: 100%;
    background-color: ${props => props.theme.secondaryGreen};
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
`

export const UserNameButton = styled.button`
    color: white;
    font-weight: 600;
    margin: 0 10px;
    font-size: 16px;
    border: none;
    background-color: ${props => props.theme.secondaryGreen};
    cursor: pointer;
`

export const UserOptionDiv = styled.div`
    width: 180px;
    height: 60px;
    border: none;
    padding: 10px 20px;
    position: fixed;
    top: 53px;
    left: 0;
    display: flex;
    flex-flow: column nowrap;
    background-color: ${props => props.theme.darkGreen};

    a {
        text-decoration: none;
        color: white;
        font-weight: 600;
        margin: 5px;
        font-size: 16px;
    }

    button {
        text-decoration: none;
        color: white;
        font-weight: 600;
        margin: 5px;
        font-size: 16px;
        background-color: ${props => props.theme.darkGreen};
        border: none;
        text-align: left;
        padding: 0;
        cursor: pointer;
    }
`