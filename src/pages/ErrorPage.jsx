import React from "react";
import { LinkButton, PageTitle } from "../assets/styles/Shared";

export default function ErrorPage() {
  return (
    <>
      <PageTitle>Página não encontrada</PageTitle>
      <LinkButton to="/">Retornar para a Home</LinkButton>
    </>
  );
}
