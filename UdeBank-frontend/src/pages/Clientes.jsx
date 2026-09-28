import { Container, Collapse, Card, Button, Row,Col } from 'react-bootstrap';
import ClienteID from './ConsultaClienteID'
import CrearCliente from './CrearCliente'
import { useState } from 'react';

function Clientes() {
  const [open,setOpen] = useState(false);
  return (
    <Container>
    <div>
      <ClienteID></ClienteID>
    </div>
    <br></br>
    <div>
      <Button 
      variant='success'
      onClick={() => setOpen(!open)}>
        Crear Cliente
      </Button>
      <Collapse in={open}>
      <div className="mt-3">
        <h3>Rellene el siguiente formulario:</h3>
        <Card body>
          <Row className="align-items-stretch">
          <Col md={4} className="d-flex">
          <img
            className="img-fluid rounded"
            src='https://cdn.cosmos.so/55c80a43-9d7a-43a8-aa0d-91a76bc9ac87?format=webp&w=2048'>
          </img>
          </Col>
          <Col>
          <CrearCliente
          open = {open}
          setOpen={setOpen}/>
          </Col>
          </Row>
        </Card>
      </div>
      </Collapse>
    </div>
    </Container>
  );
}

export default Clientes;