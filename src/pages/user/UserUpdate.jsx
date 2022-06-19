import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function UserNew() {
    let { userId } = useParams();
    let navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false)

    const [user, setUser] = useState({
        name: "",
        isAdmin: null,
        password: "",
        email: "",
    })

    async function fetchUserData() {
        const data = await api.get(`/usuarios/${userId}`)
        const { email, isAdmin, name, password, _id } = data.data
        setUser({
          email,
          isAdmin,
          name,
          password,
          _id
        })
    }

    useEffect(() => {
        fetchUserData()
      }, [])

    async function updateUser(e) {
        e.preventDefault()

        await api.put(`/usuarios/editar-usuario/${user._id}`, {
            name: user.name,
            isAdmin: user.isAdmin,
            password: user.password,
            email: user.email,
        }).then(() => {
            alert(`Usuário ${user.name} editado com sucesso!`)
            navigate(`/usuarios/${user._id}`)
        })
    }

const updateField = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

return (
    <>
        <Header />
        <Main>
            <h1>Editar usuário</h1>
                {user.name === ''
                    ? <p>Carregando...</p>
                    : <form onSubmit={updateUser} method="post">
                        <div>
                            <label htmlFor="name">Nome completo</label>
                            <input type="text" name="name" id="name" onChange={updateField} value={user.name} />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email" onChange={updateField} value={user.email ? user.email : 'carregando...'} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">Senha</label>
                            <input type={passwordShown ? 'text' : 'password'} name="password" id="password" onChange={updateField}  value={user.password} />
                            {passwordShown ?
                            <VisibilityOnIcon onClick={() => setPasswordShown(!passwordShown)} />
                            : <VisibilityOffIcon onClick={() => setPasswordShown(!passwordShown)} />
                            }
                        </div>
                        <div>
                            <label htmlFor="admin">Usuário admin?</label>
                            <select name="admin" id="admin" onChange={updateField} >
                                <option value={false} selected={!user.isAdmin ? true : false}>Não</option>
                                <option value={true} selected={user.isAdmin ? true : false}>Sim</option>
                            </select>
                        </div>
                        <div>
                            <input type="submit" value="Editar usuário" />
                        </div>
                    </form>
                }
        </Main>
    </>
  )
}
