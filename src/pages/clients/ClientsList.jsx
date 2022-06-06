import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'

export default function ClientsList() {
  return (
    <>
      <Header />
      <Main>
        <h1>Lista de clientes</h1>
        <Link to="/clientes/novo-cliente">Adicionar novo cliente</Link>

      </Main>
    </>
  )
}
