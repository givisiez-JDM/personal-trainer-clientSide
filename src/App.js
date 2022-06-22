import RoutesApp from './routes/routes'
import { LoginProvider } from "./contexts/LoginContext";

function App() {

  return (
    <div className="App">
      <LoginProvider>
        <RoutesApp />
      </LoginProvider>
    </div>
  );
}

export default App;
