import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderCnt = styled.header`
    width: 100%;
    background-color: ${props => props.theme.darkGreen};
`

export const HeaderNav = styled.nav`
    max-width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;

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

    &:hover {
        font-weight: 900;
    }
`