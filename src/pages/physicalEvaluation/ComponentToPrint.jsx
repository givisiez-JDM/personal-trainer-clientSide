import React, { Component } from 'react'
import ReactToPrint from 'react-to-print'
import { dateTransform } from "../../helpers/dateHelpers";

export class ComponentToPrint extends Component {

  render() {
      return (
        <>
          <ReactToPrint
            trigger ={() => {
              return <button>Imprimir avaliação física</button>
            }}
            content={() => this.componentRef}
            documentTitle={`Avaliação física do dia ${dateTransform(this.props.evaluation.createdAt)}`}
            pageStyle='print'
          />
          <div ref={el => (this.componentRef = el) }>
            <h1>Detalhes da Avaliação Física</h1>
            <p>Data da avaliação: {this.props.evaluation.createdAt !== "" ? dateTransform(this.props.evaluation.createdAt) : 'Carregando...'} </p>
            <p>Peso (em kg): {this.props.evaluation.weight !== "" ? this.props.evaluation.weight : 'Carregando...'} </p>
            <p>Altura (em metros): {this.props.evaluation.height !== 0 ? this.props.evaluation.height : 'Carregando...'}</p>
            <p>IMC: {this.props.evaluation.weight > 0 && this.props.evaluation.height > 0 ? (this.props.evaluation.weight / (this.props.evaluation.height * this.props.evaluation.height)).toFixed(2) : 0} </p>
            <h2>Medidas de circunferência</h2>
            <p>Abdômen (em cm): {this.props.evaluation.abdomenMeasure !== 0 ? this.props.evaluation.abdomenMeasure : 'Carregando...'}</p>
            <p>Pescoço (em cm): {this.props.evaluation.neckMeasure !== 0 ? this.props.evaluation.neckMeasure : 'Carregando...'}</p>
            <p>Tórax (em cm): {this.props.evaluation.chestMeasure !== 0 ? this.props.evaluation.chestMeasure : 'Carregando...'}</p>
            <p>Quadril (em cm): {this.props.evaluation.hipMeasure !== 0 ? this.props.evaluation.hipMeasure : 'Carregando...'}</p>
            <p>Braço (em cm): {this.props.evaluation.armsMeasure !== 0 ? this.props.evaluation.armsMeasure : 'Carregando...'}</p>
            <p>Antebraço (em cm): {this.props.evaluation.abdomenMeasure !== 0 ? this.props.evaluation.abdomenMeasure : 'Carregando...'}</p>
            <p>Punho (em cm): {this.props.evaluation.wristsMeasure !== 0 ? this.props.evaluation.wristsMeasure : 'Carregando...'}</p>
            <p>Coxa (em cm): {this.props.evaluation.thighMeasure !== 0 ? this.props.evaluation.thighMeasure : 'Carregando...'}</p>
            <p>Panturrilha (em cm): {this.props.evaluation.calfMeasure !== 0 ? this.props.evaluation.calfMeasure : 'Carregando...'}</p>
            <h2>Dobras cutâneas (7 dobras)</h2>
            <p>Subescapular (em mm): {this.props.evaluation.fatSubscapularis !== 0 ? this.props.evaluation.fatSubscapularis : 'Carregando...'}</p>
            <p>Tríceps (em mm): {this.props.evaluation.fatTriceps !== 0 ? this.props.evaluation.fatTriceps : 'Carregando...'}</p>
            <p>Peitoral (em mm): {this.props.evaluation.fatBreastplate !== 0 ? this.props.evaluation.fatBreastplate : 'Carregando...'}</p>
            <p>Axilar média (em mm): {this.props.evaluation.fatMidAxillary !== 0 ? this.props.evaluation.fatMidAxillary : 'Carregando...'}</p>
            <p>Supra-ilíaca (em mm): {this.props.evaluation.fatSuprailiac !== 0 ? this.props.evaluation.fatSuprailiac : 'Carregando...'}</p>
            <p>Abdôminal (em mm): {this.props.evaluation.fatAbdominal !== 0 ? this.props.evaluation.fatAbdominal : 'Carregando...'}</p>
            <p>Femural médio (em mm): {this.props.evaluation.fatMidFemoral !== 0 ? this.props.evaluation.fatMidFemoral : 'Carregando...'}</p>
            <p>Observações: <br /> {this.props.evaluation.notes !== 0 ? this.props.evaluation.notes : 'Carregando...'}</p>
          </div>
        </>
      );
    }
  }