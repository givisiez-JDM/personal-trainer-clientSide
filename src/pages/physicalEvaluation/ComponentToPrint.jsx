import React, { Component } from 'react'
import ReactToPrint from 'react-to-print'
import { MarginCnt, PageSubtitle, PageTitle, Paragraph, PrimaryButton } from '../../assets/styles/Shared';
import { dateTransform } from "../../helpers/dateHelpers";

export class ComponentToPrint extends Component {

  render() {
      return (
        <>
          <ReactToPrint
            trigger ={() => {
              return <PrimaryButton>Imprimir avaliação física</PrimaryButton>
            }}
            content={() => this.componentRef}
            documentTitle={`Avaliação física do dia ${dateTransform(this.props.evaluation.date)}`}
            pageStyle='print'
          />
          <MarginCnt ref={el => (this.componentRef = el) }>
            <PageTitle>Detalhes da Avaliação Física</PageTitle>
            <Paragraph>Data da avaliação: {this.props.evaluation.date !== "" ? dateTransform(this.props.evaluation.date) : 'Carregando...'} </Paragraph>
            <Paragraph>Peso (em kg): {this.props.evaluation.weight !== "" ? this.props.evaluation.weight : 'Carregando...'} </Paragraph>
            <Paragraph>Altura (em metros): {this.props.evaluation.height !== 0 ? this.props.evaluation.height : 'Carregando...'}</Paragraph>
            <Paragraph>IMC: {this.props.evaluation.weight > 0 && this.props.evaluation.height > 0 ? (this.props.evaluation.weight / (this.props.evaluation.height * this.props.evaluation.height)).toFixed(2) : 0} </Paragraph>
            <PageSubtitle>Medidas de circunferência</PageSubtitle>
            {this.props.evaluation.measurements ?
            <>
              <Paragraph>Abdômen (em cm): {this.props.evaluation.measurements.abdomenMeasure}</Paragraph>
              <Paragraph>Pescoço (em cm): {this.props.evaluation.measurements.neckMeasure}</Paragraph>
              <Paragraph>Tórax (em cm): {this.props.evaluation.measurements.chestMeasure}</Paragraph>
              <Paragraph>Quadril (em cm): {this.props.evaluation.measurements.hipMeasure}</Paragraph>
              <Paragraph>Braço (em cm): {this.props.evaluation.measurements.armsMeasure}</Paragraph>
              <Paragraph>Antebraço (em cm): {this.props.evaluation.measurements.abdomenMeasure !== 0}</Paragraph>
              <Paragraph>Punho (em cm): {this.props.evaluation.measurements.wristsMeasure !== 0}</Paragraph>
              <Paragraph>Coxa (em cm): {this.props.evaluation.measurements.thighMeasure !== 0}</Paragraph>
              <Paragraph>Panturrilha (em cm): {this.props.evaluation.measurements.calfMeasure !== 0}</Paragraph>
            </>
            : <Paragraph>Carregando...</Paragraph>
            }
            <PageSubtitle>Dobras cutâneas (7 dobras)</PageSubtitle>
            {this.props.evaluation.fatData ? 
            <>
              <Paragraph>Subescapular (em mm): {this.props.evaluation.fatData.fatSubscapularis}</Paragraph>
              <Paragraph>Tríceps (em mm): {this.props.evaluation.fatData.fatTriceps}</Paragraph>
              <Paragraph>Peitoral (em mm): {this.props.evaluation.fatData.fatBreastplate}</Paragraph>
              <Paragraph>Axilar média (em mm): {this.props.evaluation.fatData.fatMidAxillary}</Paragraph>
              <Paragraph>Supra-ilíaca (em mm): {this.props.evaluation.fatData.fatSuprailiac}</Paragraph>
              <Paragraph>Abdominal (em mm): {this.props.evaluation.fatData.fatAbdominal}</Paragraph>
              <Paragraph>Femoral médio (em mm): {this.props.evaluation.fatData.fatMidFemoral}</Paragraph>
              <Paragraph>Observações: <br /> {this.props.evaluation.notes}</Paragraph>
            </>
            : <Paragraph>Carregando...</Paragraph>
          }
          </MarginCnt>
        </>
      );
    }''
  }