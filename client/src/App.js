import Navbar from "./components/navbar"
import Bottom from "./components/bottom"
import Table from "./components/table"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Navbar />
      <Bottom key={4} placement={"bottom"} name={"Crear"} />
      <Table />
    </div>
  );
}

export default App;