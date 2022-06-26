import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Main from "../../layouts/main/Main";
import { api } from "../../services/api";
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoginContext } from "../../contexts/LoginContext";
import { PageTitle, SubmitButton, InputStyle, InputLabel, SelectStyle, Paragraph, ButtonCnt1, FormStyle, InputLabelCnt } from "../../assets/styles/Shared";

export default function UserNew() {
    let { userId } = useParams();
    let navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false)

    const [user, setUser] = useState({
        name: "",
        isAdmin: null,
        password: "",
        email: "",
        _id: ""
    })

    const { loggedUser } = useContext(LoginContext);

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
            _id: user._id
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
            <PageTitle>Editar usuário</PageTitle>
                {user.name === ''
                    ? <Paragraph>Carregando...</Paragraph>
                    : <FormStyle onSubmit={updateUser} method="post">
                        <InputLabelCnt>
                            <InputLabel htmlFor="name">Nome completo</InputLabel>
                            <InputStyle type="text" name="name" id="name" onChange={updateField} value={user.name} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="email">E-mail</InputLabel>
                            <InputStyle type="email" name="email" id="email" onChange={updateField} value={user.email ? user.email : 'carregando...'} />
                        </InputLabelCnt>
                        <InputLabelCnt>
                            <InputLabel htmlFor="password">Nova senha</InputLabel>
                            <InputStyle type={passwordShown ? 'text' : 'password'} name="password" id="password" onChange={updateField} />
                            {passwordShown ?
                            <VisibilityOnIcon onClick={() => setPasswordShown(!passwordShown)} />
                            : <VisibilityOffIcon onClick={() => setPasswordShown(!passwordShown)} />
                            }
                        </InputLabelCnt>
                        {loggedUser.isAdmin && 
                            <InputLabelCnt>
                                <InputLabel htmlFor="admin">Usuário admin?</InputLabel>
                                <SelectStyle name="admin" id="admin" onChange={updateField} >
                                    <option value={false} selected={!user.isAdmin ? true : false}>Não</option>
                                    <option value={true} selected={user.isAdmin ? true : false}>Sim</option>
                                </SelectStyle>
                            </InputLabelCnt>
                        }
                        <ButtonCnt1>
                            <SubmitButton type="submit" value="Editar usuário" />
                        </ButtonCnt1>
                    </FormStyle>
                }
        </Main>
    </>
  )
}
