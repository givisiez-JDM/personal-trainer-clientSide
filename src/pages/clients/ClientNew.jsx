import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";

export default function NewClient() {

    return (
        <>
        <Header />
        <Main>
            <header>
                <h1>Cadastro de Cliente</h1>
            </header>
            <form action="" method="post">
                <div>
                    <label htmlFor="full-name">Nome completo</label>
                    <input type="text" name="full-name" id="full-name" />
                </div>
                <div>
                    <div>
                        <label htmlFor="birthday">Data de nascimento</label>
                        <input type="date" name="birthday" id="birthday" />
                    </div>
                    <div>
                        <label htmlFor="gender">Sexo</label>
                        <select name="gender" id="gender">
                            <option value="select"></option>
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="tel">Telefone</label>
                        <input type="tel" name="tel" id="tel" />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" />
                    </div>
                </div>
                <div>
                    <label htmlFor="profession">Profissão</label>
                    <input type="text" name="profession" id="profession" />
                </div>
                <div>
                    <label htmlFor="objective">Objetivo</label>
                    <input type="text" name="objective" id="objective" />
                </div>
                <div>
                    <input type="submit" value="Cadastrar Cliente" />
                </div>
            </form>
        </Main>
        </>
    )
}