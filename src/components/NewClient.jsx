export default function NewClient() {

    return (
        <>
            <section className="container max-w-2xl mx-auto">
                <header className="mx-auto p-4">
                    <h1>Cadastro de Cliente</h1>
                </header>
                <form action="" method="post" className="flex flex-col">
                    <div className="flex flex-col py-2">
                        <label htmlFor="full-name">Nome completo</label>
                        <input type="text" name="full-name" id="full-name" className="border border-primaryGray rounded" />
                    </div>
                    <div className="flex flex-row py-2">
                        <div className="flex flex-col pr-2 w-1/3">
                            <label htmlFor="birthday">Data de nascimento</label>
                            <input type="date" name="birthday" id="birthday" className="border border-primaryGray rounded" />
                        </div>
                        <div className="flex flex-col w-2/3">
                            <label htmlFor="sex">Sexo</label>
                            <select name="sex" id="sex" className="border border-primaryGray rounded">
                                <option value="select"></option>
                                <option value="male">Masculino</option>
                                <option value="female">Feminino</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row py-2">
                        <div className="flex flex-col pr-2 w-1/3">
                            <label htmlFor="tel">Telefone</label>
                            <input type="tel" name="tel" id="tel" className="border border-primaryGray rounded" />
                        </div>
                        <div className="flex flex-col w-2/3">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" className="border border-primaryGray rounded w-full" />
                        </div>
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="profession">Profissão</label>
                        <input type="text" name="profession" id="profession" className="border border-primaryGray rounded" />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="objective">Objetivo</label>
                        <input type="text" name="objective" id="objective" className="border border-primaryGray rounded" />
                    </div>
                    <div className="my-4">
                        <input type="submit" value="Cadastrar Cliente" className="bg-primaryGreen text-secondaryGray p-4 rounded-lg my-4 w-full" />
                    </div>
                </form>
            </section>
        </>
    )
}