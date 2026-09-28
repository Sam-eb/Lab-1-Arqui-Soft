import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Clientes from './pages/Clientes';
import Bienvenida from './pages/Bienvenida';
import ConsultarClientes from './pages/ConsultaClientes';
import ConsultarTransferencias from './pages/ConsultarTransferencia';
import Transferir from './pages/Tranferir';


function App() {
  return (
    <Router>
      <NavigationBar />
      {/* Contenedor donde se cargará la vista según la ruta seleccionada */}
      <div className="container mt-4">
        <Routes>
          <Route path= "/" element= {<Bienvenida/>}/>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/consultaClientes" element={<ConsultarClientes />} />
          <Route path= "/ConsultarTransferencias" element= {<ConsultarTransferencias/>}/>
          <Route path= "/Transferir" element= {<Transferir/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;