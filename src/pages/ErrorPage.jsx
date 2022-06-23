import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <>
        <h1>Página não encontrada</h1>
        <Link to="/">Retornar para a Home</Link>
    </>
  )
}
