import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import Register from "../pages/login/Register"
import HomePage from '../pages/home/HomePage'
import ClientsList from '../pages/clients/ClientsList'
import ClientDetails from '../pages/clients/ClientDetails'
import ClientNew from '../pages/clients/ClientNew'
import UserList from '../pages/user/UserList'
import UserDetails from '../pages/user/UserDetails'
import UserNew from '../pages/user/UserNew'
import UserUpdate from '../pages/user/UserUpdate'
import TrainingList from '../pages/training/TrainingList'
import { LoginContext } from "../contexts/LoginContext"
import ClientUpdate from "../pages/clients/ClientUpdate"

const RoutesApp = () => {
    const Private = ({ Item }) => {
        const { signed, loadingLocalStorage } = useContext(LoginContext);
        
        if (loadingLocalStorage) {
            return <p>Carregando...</p>
        } else {
            return signed ? <Item /> : <Login />
        }
    }

    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/" element={<Private Item={HomePage} />} />
            <Route path="/clientes" element={<Private Item={ClientsList} />} />
            <Route path="/clientes/:clientId" element={<Private Item={ClientDetails} />} />
            <Route path="/clientes/novo-cliente" element={<Private Item={ClientNew} />} />
            <Route path="/clientes/editar-cliente/:clientId" element={<Private Item={ClientUpdate} />} />
            <Route path="/usuarios" element={<Private Item={UserList} />} />
            <Route path="/usuarios/:userId" element={<Private Item={UserDetails} />} />
            <Route path="/usuarios/novo-usuario" element={<Private Item={UserNew} />} />
            <Route path="/usuarios/editar-usuario/:userId" element={<Private Item={UserUpdate} />} />
            <Route path="/treinos" element={<Private Item={TrainingList} />} />
            <Route path="*" element={<Login />} />
        </Routes>
    )
}

export default RoutesApp