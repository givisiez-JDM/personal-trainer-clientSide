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
            documentTitle={`Avaliação física do dia ${dateTransform(this.props.evaluation.createdAt)}`}
            pageStyle='print'
          />
          <MarginCnt ref={el => (this.componentRef = el) }>
            <PageTitle>Detalhes da Avaliação Física</PageTitle>
            <Paragraph>Data da avaliação: {this.props.evaluation.createdAt !== "" ? dateTransform(this.props.evaluation.createdAt) : 'Carregando...'} </Paragraph>
            <Paragraph>Peso (em kg): {this.props.evaluation.weight !== "" ? this.props.evaluation.weight : 'Carregando...'} </Paragraph>
            <Paragraph>Altura (em metros): {this.props.evaluation.height !== 0 ? this.props.evaluation.height : 'Carregando...'}</Paragraph>
            <Paragraph>IMC: {this.props.evaluation.weight > 0 && this.props.evaluation.height > 0 ? (this.props.evaluation.weight / (this.props.evaluation.height * this.props.evaluation.height)).toFixed(2) : 0} </Paragraph>
            <PageSubtitle>Medidas de circunferência</PageSubtitle>
            <Paragraph>Abdômen (em cm): {this.props.evaluation.abdomenMeasure !== 0 ? this.props.evaluation.abdomenMeasure : 'Carregando...'}</Paragraph>
            <Paragraph>Pescoço (em cm): {this.props.evaluation.neckMeasure !== 0 ? this.props.evaluation.neckMeasure : 'Carregando...'}</Paragraph>
            <Paragraph>Tórax (em cm): {this.props.evaluation.chestMeasure !== 0 ? this.props.evaluation.chestMeasure : 'Carregando...'}</Paragraph>
            <Paragraph>Quadril (em cm): {this.props.evaluation.hipMeasure !== 0 ? this.props.evaluation.hipMeasure : 'Carregando...'}</Paragraph>
            <Paragraph>Braço (em cm): {this.props.evaluation.armsMeasure !== 0 ? this.props.evaluation.armsMeasure : 'Carregando...'}</Paragraph>
            <Paragraph>Antebraço (em cm): {this.props.evaluation.abdomenMeasure !== 0 ? this.props.evaluation.abdomenMeasure : 'Carregando...'}</Paragraph>
            <Paragraph>Punho (em cm): {this.props.evaluation.wristsMeasure !== 0 ? this.props.evaluation.wristsMeasure : 'Carregando...'}</Paragraph>
            <Paragraph>Coxa (em cm): {this.props.evaluation.thighMeasure !== 0 ? this.props.evaluation.thighMeasure : 'Carregando...'}</Paragraph>
            <Paragraph>Panturrilha (em cm): {this.props.evaluation.calfMeasure !== 0 ? this.props.evaluation.calfMeasure : 'Carregando...'}</Paragraph>
            <PageSubtitle>Dobras cutâneas (7 dobras)</PageSubtitle>
            <Paragraph>Subescapular (em mm): {this.props.evaluation.fatSubscapularis !== 0 ? this.props.evaluation.fatSubscapularis : 'Carregando...'}</Paragraph>
            <Paragraph>Tríceps (em mm): {this.props.evaluation.fatTriceps !== 0 ? this.props.evaluation.fatTriceps : 'Carregando...'}</Paragraph>
            <Paragraph>Peitoral (em mm): {this.props.evaluation.fatBreastplate !== 0 ? this.props.evaluation.fatBreastplate : 'Carregando...'}</Paragraph>
            <Paragraph>Axilar média (em mm): {this.props.evaluation.fatMidAxillary !== 0 ? this.props.evaluation.fatMidAxillary : 'Carregando...'}</Paragraph>
            <Paragraph>Supra-ilíaca (em mm): {this.props.evaluation.fatSuprailiac !== 0 ? this.props.evaluation.fatSuprailiac : 'Carregando...'}</Paragraph>
            <Paragraph>Abdôminal (em mm): {this.props.evaluation.fatAbdominal !== 0 ? this.props.evaluation.fatAbdominal : 'Carregando...'}</Paragraph>
            <Paragraph>Femural médio (em mm): {this.props.evaluation.fatMidFemoral !== 0 ? this.props.evaluation.fatMidFemoral : 'Carregando...'}</Paragraph>
            <Paragraph>Observações: <br /> {this.props.evaluation.notes !== 0 ? this.props.evaluation.notes : 'Carregando...'}</Paragraph>
          </MarginCnt>
        </>
      );
    }
  }