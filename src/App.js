import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage"
import ClientsList from "./pages/clients/ClientsList"
import TrainingList from "./pages/TrainingList";
import ClientNew from "./pages/clients/ClientNew";
import ClientDetails from "./pages/clients/ClientDetails";
import UserList from "./pages/user/UserList";
import UserNew from "./pages/user/UserNew";
import { LoginContext, LoginProvider } from "./contexts/LoginContext";
import { useContext } from "react";
import Register from "./pages/login/Register";

function App() {

  const { signed } = useContext(LoginContext)

  return (
    <div className="App">
      <LoginProvider>
        <Router>
          {!signed ? 
            <Routes>
              <Route index path="/" element={<Login />} />
              <Route index path="/registrar" element={<Register />} />
            </Routes>
            :
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/clientes" element={<ClientsList />} />
              <Route path="/clientes/:id" element={<ClientDetails />} />
              <Route path="/clientes/novo-cliente" element={<ClientNew />} />
              <Route path="/usuarios" element={<UserList />} />
              <Route path="/usuarios/novo-usuario" element={<UserNew />} />
              <Route path="/treinos" element={<TrainingList />} />
            </Routes>
            }
        </Router>
      </LoginProvider>
    </div>
  );
}

export default App;
