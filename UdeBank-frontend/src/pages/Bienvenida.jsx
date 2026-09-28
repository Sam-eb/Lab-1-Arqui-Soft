import { Container } from "react-bootstrap";
import Carrusel from '../components/Carrusel';

function Bienvenida() {
  return (
    <div>
    <Carrusel />
    <Container >
    <div >
    </div>
    <div className="text-succes p-4 bg-light rounded-3 " >
      <h1 className="text-success">BIENVENIDO</h1>
      <p className="text-success-emphasis">Banco UdeBank, creado para ti.</p>
    </div>
    </Container>
    </div>
  );
}

export default Bienvenida;