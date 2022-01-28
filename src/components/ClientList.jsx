import React from 'react'

export default function ClientList() {
    return (
        <section className="max-w-4xl mx-auto">
            <h1>Lista de Clientes</h1>
            <table className="m-10">
                <thead>
                    <tr>
                        <th>Nome </th>
                        <th>Próximo treino</th>
                        <th>Próxima avaliação física</th>
                        <th>Observações</th>
                        <th>Detalhes do cliente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Gilmere</td>
                        <td>19/12/2021</td>
                        <td>19/05/2022</td>
                        <td>Remarcou treino para o dia 10/12 por motivos pessoais</td>
                        <td><button className="bg-primaryGreen text-secondaryGray p-4 rounded-lg my-4 ">Detalhes do cliente</button></td>
                    </tr>
                    <tr>
                        <td>Edilson</td>
                        <td>20/12/2021</td>
                        <td>20/05/2022</td>
                        <td></td>
                        <td><button className="bg-primaryGreen text-secondaryGray p-4 rounded-lg my-4 ">Detalhes do cliente</button></td>
                    </tr>
                    <tr>
                        <td>Janeide</td>
                        <td>21/12/2021</td>
                        <td>21/05/2022</td>
                        <td></td>
                        <td><button className="bg-primaryGreen text-secondaryGray p-4 rounded-lg my-4 ">Detalhes do cliente</button></td>
                    </tr>
                    <tr>
                        <td>Juliana</td>
                        <td>22/12/2021</td>
                        <td>22/05/2022</td>
                        <td></td>
                        <td><button className="bg-primaryGreen text-secondaryGray p-4 rounded-lg my-4 ">Detalhes do cliente</button></td>
                    </tr>
                </tbody>
            </table>
            <div className="my-4">
                <input type="submit" value="Novo(a) Cliente" className="bg-primaryGreen text-secondaryGray p-4 rounded-lg my-4 w-full" />
            </div>
        </section>
    )
}
