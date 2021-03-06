import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import Register from "../pages/login/Register"
import HomePage from '../pages/home/HomePage'
import UserList from '../pages/user/UserList'
import UserNew from '../pages/user/UserNew'
import UserDetails from '../pages/user/UserDetails'
import UserUpdate from '../pages/user/UserUpdate'
import ClientsList from '../pages/clients/ClientsList'
import ClientNew from '../pages/clients/ClientNew'
import ClientDetails from '../pages/clients/ClientDetails'
import ClientUpdate from "../pages/clients/ClientUpdate"
import PhysicalEvaluationList from "../pages/physicalEvaluation/PhysicalEvaluationList"
import PhysicalEvaluationNew from "../pages/physicalEvaluation/PhysicalEvaluationNew"
import PhysicalEvaluationDetails from "../pages/physicalEvaluation/PhysicalEvaluationDetails"
import PhysicalEvaluationUpdate from "../pages/physicalEvaluation/PhysicalEvaluationUpdate"
import TrainingList from '../pages/training/TrainingList'
import { LoginContext } from "../services/contexts/LoginContext"
import ErrorPage from "../pages/ErrorPage"
import ExerciseNew from "../pages/exercise/ExerciseNew"
import ExerciseDetails from "../pages/exercise/ExerciseDetails"
import ExerciseList from "../pages/exercise/ExerciseList"
import ExerciseUpdate from "../pages/exercise/ExerciseUpdate"
import TrainingDetails from "../pages/training/TrainingDetails"
import TrainingNew from "../pages/training/TrainingNew"
import TrainingUpdate from "../pages/training/TrainingUpdate"
import { Paragraph } from "../assets/styles/Shared"

const RoutesApp = () => {
    const Private = ({ Item }) => {
        const { signed, loadingLocalStorage } = useContext(LoginContext);
        
        if (loadingLocalStorage) {
            return <Paragraph>Carregando...</Paragraph>
        } else {
            return signed ? <Item /> : <Login />
        }
    }

    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/" element={<Private Item={HomePage} />} />
            <Route path="/usuarios" element={<Private Item={UserList} />} />
            <Route path="/usuarios/:userId" element={<Private Item={UserDetails} />} />
            <Route path="/usuarios/novo-usuario" element={<Private Item={UserNew} />} />
            <Route path="/usuarios/editar-usuario/:userId" element={<Private Item={UserUpdate} />} />
            <Route path="/clientes" element={<Private Item={ClientsList} />} />
            <Route path="/clientes/:clientId" element={<Private Item={ClientDetails} />} />
            <Route path="/clientes/novo-cliente" element={<Private Item={ClientNew} />} />
            <Route path="/clientes/editar-cliente/:clientId" element={<Private Item={ClientUpdate} />} />
            <Route path="/avaliacao/lista" element={<Private Item={PhysicalEvaluationList} />} />
            <Route path="/avaliacao/:evaluationId" element={<Private Item={PhysicalEvaluationDetails} />} />
            <Route path="/avaliacao/nova-avaliacao/:clientId" element={<Private Item={PhysicalEvaluationNew} />} />
            <Route path="/avaliacao/editar-avaliacao/:evaluationId" element={<Private Item={PhysicalEvaluationUpdate} />} />
            <Route path="/exercicios/" element={<Private Item={ExerciseList} />} />
            <Route path="/exercicios/:exerciseId" element={<Private Item={ExerciseDetails} />} />
            <Route path="/exercicios/novo-exercicio" element={<Private Item={ExerciseNew} />} />
            <Route path="/exercicios/editar-exercicio/:exerciseId" element={<Private Item={ExerciseUpdate} />} />
            <Route path="/treinos" element={<Private Item={TrainingList} />} />
            <Route path="/treinos/:trainingId" element={<Private Item={TrainingDetails} />} />
            <Route path="/treinos/novo-treino" element={<Private Item={TrainingNew} />} />
            <Route path="/treinos/editar-treino/:trainingId" element={<Private Item={TrainingUpdate} />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default RoutesApp