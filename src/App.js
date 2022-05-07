import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage"
import ClientsList from "./pages/ClientsList"
import TrainingList from "./pages/TrainingList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientsList />} />
          <Route path="/treinos" element={<TrainingList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
