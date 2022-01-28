import TopNavigation from './components/TopNavigation';
import NewPhysicalExamination from './components/NewPhysicalExamination';
import NewClient from './components/NewClient';
import ExerciseList from './components/ExerciseList';
import Training from './components/Training';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';

function App() {

  let newClient = false
  let newPhysical = false
  let exerciseList = false
  let training = false
  let clientList = false
  let clientDetails = true

  return (
    <div className="App">
      <TopNavigation />
      {newClient && <NewClient />}
      {newPhysical && <NewPhysicalExamination />}
      {exerciseList && <ExerciseList />} 
      {training && <Training />}
      {clientList && <ClientList />}
      {clientDetails && <ClientDetails />}
    </div>
  );
}

export default App;
