import styled from "styled-components";

export const UpdateChartsBtnCnt = styled.div`
    max-width: 300px;
`

export const ChartsCnt = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`

export const PieChartCnt = styled.div`
    width: 100%;
    max-width: 340px;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #c7c7c7;
    border-radius: 20px;

    @media screen and (max-width: 480px) {
        max-width: 300px;
    }
`

export const BarChartCnt = styled.div`
    width: 100%;
    max-width: 530px;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #c7c7c7;
    border-radius: 20px;

    @media screen and (max-width: 480px) {
        max-width: 300px;
    }
`

export const ChartHeader = styled.h3`
    text-align: center;
`