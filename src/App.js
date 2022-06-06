import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage"
import ClientsList from "./pages/clients/ClientsList"
import TrainingList from "./pages/TrainingList";
import ClientNew from "./pages/clients/ClientNew";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientsList />} />
          <Route path="/clientes/novo-cliente" element={<ClientNew />} />
          <Route path="/treinos" element={<TrainingList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
