import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from '../../services/api'
import { useState } from "react";

export default function NewClient() {

    const [client, setclient] = useState({
        name: "",
        birthDate: null,
        gender: "",
        phone: "",
        email: "",
        profession: "",
        objective: ""
    })

    function createClient(e) {
        e.preventDefault();

        api.post("/clientes/novo-cliente", {
            name: client.name,
            birthDate: client.birthDate,
            gender: client.gender,
            phone: client.phone,
            email: client.email,
            profession: client.profession,
            objective: client.objective,
            // personalTrainerId: 
        }).then(() => {
            alert(`Cliente ${client.name} adicionado com sucesso!`)
        })
    }

    const updateField = e => {
        setclient({
          ...client,
          [e.target.name]: e.target.value
        });
      };

    return (
        <>
            <Header />
            <Main>
                <header>
                    <h1>Cadastro de Cliente</h1>
                </header>
                <form onSubmit={createClient}>
                    <div>
                        <label htmlFor="name">Nome completo</label>
                        <input type="text" name="name" id="name" onChange={updateField} />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="birthDate">Data de nascimento</label>
                            <input type="date" name="birthDate" id="birthDate" onChange={updateField} />
                        </div>
                        <div>
                            <label htmlFor="gender">Sexo</label>
                            <select name="gender" id="gender" onChange={updateField} >
                                <option value="select"></option>
                                <option value="male">Masculino</option>
                                <option value="female">Feminino</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="phone">Telefone</label>
                            <input type="tel" name="phone" id="phone" onChange={updateField} />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={updateField} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="profession">Profissão</label>
                        <input type="text" name="profession" id="profession" onChange={updateField} />
                    </div>
                    <div>
                        <label htmlFor="objective">Objetivo</label>
                        <input type="text" name="objective" id="objective" onChange={updateField}  />
                    </div>
                    <div>
                        <input type="submit" value="Cadastrar Cliente" />
                    </div>
                </form>
            </Main>
        </>
    )
}