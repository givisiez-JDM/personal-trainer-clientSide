import React from 'react'

export default function ExerciseList() {
    return (
        <section className="max-w-4xl mx-auto">
            <h1>Lista de Exercícios</h1>
            <table className="m-10">
                <thead>
                    <tr>
                        <th>Grupo Muscular</th>
                        <th>Exercício</th>
                        <th>Valência</th>
                        <th>Material</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Peito</td>
                        <td>Supino Reto</td>
                        <td>Potência</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Peito</td>
                        <td>Crucifixo</td>
                        <td>Flexibilidade</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Costas</td>
                        <td>Puxador</td>
                        <td>Equilíbrio</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Costas</td>
                        <td>Remada baixa</td>
                        <td>Potência</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Perna</td>
                        <td>Agachamento</td>
                        <td>Força</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Perna</td>
                        <td>Flexora</td>
                        <td>Mobilidade</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Ombro</td>
                        <td>Desenvolvimento barra</td>
                        <td>Potência</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Ombro</td>
                        <td>Remada alta</td>
                        <td>Força</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Biceps</td>
                        <td>Rosca direita</td>
                        <td>Força</td>
                        <td>Aparelho</td>
                    </tr>
                    <tr>
                        <td>Biceps</td>
                        <td>Rosca martelo</td>
                        <td>Força</td>
                        <td>Aparelho</td>
                    </tr>
                </tbody>
            </table>
            <div className="my-4">
                <input type="submit" value="Novo Exercicio" className="bg-primaryGreen text-secondaryGray p-4 rounded-lg my-4 w-full" />
            </div>
        </section>
    )
}
