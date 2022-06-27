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
    margin: 10px;
    padding: 10px 0;
`

export const PageSubtitle = styled.h2`
    color: #01934a;
    margin: 20px 10px;
`

export const PageSubtitle3 = styled.h3`
    color: #01934a;
    margin: 10px;
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
    margin: 10px;
    font-size: 1.2em;

    @media (max-width: 480px) {
        max-width: 300px;
    }
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
    margin: 10px;
    font-size: 1.2em;

    @media (max-width: 480px) {
        max-width: 300px;
    }
`

export const LinkButton = styled(Link)`
    width: 100%;
    height: auto;
    background-color: white;
    color: #01934a;
    border: 1px solid #01934a;
    border-radius: 15px;
    padding: 10px;
    margin: 10px 0;
    cursor: pointer;
    margin: 10px;
    font-size: 1.2em;
    text-decoration: none;
    text-align: center;

    @media (max-width: 480px) {
        max-width: 300px;
    }
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
    margin: 10px auto;
    font-size: 1.2em;

    @media (max-width: 480px) {
        max-width: 300px;
    }
`

export const InputStyle = styled.input`
    padding: 10px;
    border-radius: 15px;
    margin: 10px 0;
    width: 100%;
    max-width: 778px;
    
    @media (max-width: 480px) {
        width: 278px;
    }
`

export const TextareaStyle = styled.input`
    padding: 10px;
    border-radius: 15px;
    margin: 10px 0;
    width: 100%;
    height: 150px;
    max-width: 778px;
    white-space: pre-wrap;
    
    @media (max-width: 480px) {
        width: 278px;
    }
`

export const SelectStyle = styled.select`
    padding: 10px;
    border-radius: 15px;
    margin: 10px 0;
    width: 100%;

    @media (max-width: 480px) {
        width: 300px;
    }
`

export const InputLabel = styled.label`
    color: #1d1d1d;
    font-size: 1.2em;
`

export const InputLabelCnt = styled.div`
    display: flex;
    flex-flow: column wrap;

    @media (max-width: 480px) {
        margin: 0 auto;
    }
`

export const ButtonCnt1 = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
`

export const ButtonCnt2 = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
`

export const ButtonCnt3 = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin: 0 auto;
`

export const Paragraph = styled.p`
    font-size: 1.2em;
`

export const FlexRowCnt = styled.div`
    display: flex;
    flex-flow: row wrap;

    @media (max-width: 480px) {
        flex-flow: column wrap;
        justify-content: center;
    }
`

export const FlexColumnCnt = styled.div`
    display: flex;
    flex-flow: column wrap;
`

export const FormStyle = styled.form`
    max-width: 800px;
    margin: 30px auto;
    
    @media (max-width: 480px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

export const WrittenLink = styled(Link)`
    text-decoration: none;
    color: #01934a; 
    cursor: pointer;
`

export const MarginCnt = styled.div`
    padding: 10px;
`