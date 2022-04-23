export default function ClientDetails() {
    return (
        <section>
            <h1>Detalhes do cliente</h1>
            <p>Nome completo: Gilmere Araújo Gimenes </p>
            <p>Data de nascimento: 11/07/1991 (30 anos)</p>
            <p>Sexo: Feminino</p>
            <p>Telefone: (31) 93458-7516</p>
            <p>E-mail: ggimenes@hotmail.com</p>
            <p>Profissão: mecânica de automóveis</p>
            <p>Objetivo: melhorar condicionamento físico</p>
            <table>
                <thead>
                    <tr>
                        <th>Avaliação</th>
                        <th>Data</th>
                        <th>Comentários</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Avaliação 1</td>
                        <td>19/09/2021</td>
                        <td>Baixo desempenho no agachamento. <br />Encurtamento no músculo posterior de coxa. <br />Facilidade em exercícios de ombro e costas. <br />Pressão alterada durante a avaliação (alta), focar em exercícios aeróbicos.</td>
                    </tr>
                    <tr>
                        <td>Avaliação 2</td>
                        <td>19/12/2021</td>
                        <td>Melhora nos exercícios de agachamento. <br />Maior elasticidade no posterior de coxa. <br />Pressão estável durante a avaliação. <br />Dificuldade em exercícios com utilização do punho esquerdo devido a fratura. </td>
                    </tr>
                    <tr>
                        <td>Avaliação 3</td>
                        <td>19/03/2022</td>
                        <td>Próximo agendamento.</td>
                    </tr>
                    <tr>
                        <td>Avaliação 4</td>
                        <td>19/06/2022</td>
                        <td>Próximo agendamento.</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}
