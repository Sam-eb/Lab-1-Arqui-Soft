import { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import {FloatingLabel, FormControl, InputGroup, Button, Card, Collapse, Row, Col} from 'react-bootstrap';

import ChargingButton from '../components/ChargingButton'
import Overlay from 'react-bootstrap/Overlay';
import axios from 'axios';


function ClienteID(){
  const [userID, setUserID] = useState('');
  const [cliente, setCliente] = useState(null);
  const target = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [mensajeError, setMensajeError] = useState(' ');
  const [open,setOpen] = useState(false);



  const handleConsultar =  async (e) => {
    const iDtrim = userID.trim();
    setShow(false);
    if (e) e.preventDefault();

    if (!iDtrim){
      setMensajeError('Ingresa el ID');
      setShow(true);
      setOpen(false);
      setCliente(null);
      return;
    }
    setIsLoading(true);
    setShow(false);
    try{
      setShow(false);
      const response = await axios.get(`http://localhost:8080/api/customers/${userID}`);

      setCliente(response.data);
      setOpen(true)
      console.log(response.data)

    }
    
    catch (error) {
      console.error("Error al obtener el cliente:", error);
      setCliente(null);
      setOpen(false);

      setMensajeError('No encontrado');
      setShow(true);
    }finally {
      setIsLoading(false);
    }
  };
    return(
     <div style={{ position: 'relative' }}>
      <h2>Ingrese el ID del usuario a consultar</h2>
      <Form 
      onSubmit={handleConsultar}
      onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}>
        <InputGroup>
          <FloatingLabel
          controlId='Id-cliente'
          label = "ID del Cliente"
          >
            <FormControl
            type = "text" 
            maxLength = "50"
            placeholder='99999' 
            value = {userID}
            onChange={(e) => {
              setUserID(e.target.value);
              if (show) setShow(false);
            }}
            />
          </FloatingLabel>
        <ChargingButton
            ref={target}
            type="submit"
            color="success"
            text="Consultar"
            loadingText="Consultando"
            isLoading={isLoading}
          />
        <Overlay target={target.current} show={show} placement="top">
            {({
              placement: _placement,
              arrowProps: _arrowProps,
              show: _show,
              popper: _popper,
              hasDoneInitialMeasure: _hasDoneInitialMeasure,
              ...props
            }) => (
              <div
                {...props}
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(220, 53, 69, 0.95)', // Rojo tipo Bootstrap Danger
                  padding: '6px 12px',
                  color: 'white',
                  borderRadius: 4,
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  ...props.style,
                }}
              >
                {mensajeError}
              </div>
            )}
          </Overlay>
        </InputGroup>
      </Form>
      <Collapse in={open}>
        <div className="mt-3">
          <Card body>
            <Row>
            <Col md={4} className="d-flex">
            {cliente ? (
          <img
            className="img-fluid rounded"
            src='https://cdn.cosmos.so/fb0e1526-4d00-4394-9626-91c0baff2700?format=webp'>
          </img>
            ) : null}
          </Col>
            <Col>
            {cliente ? (
              <div>
                <h5>Información del Cliente</h5>
                <p><strong>ID:</strong> {cliente.id}</p>
                <p><strong>Nombre:</strong> {cliente.firstName}</p>
                <p><strong>Apellido:</strong> {cliente.lastName}</p>
                <p><strong>Numero de Cuenta:</strong> {cliente.accountNumber}</p>
                <p><strong>Balance:</strong> {cliente.balance}</p>
              </div>
            ) : null}
            </Col>
            </Row>
          </Card>
        </div>
      </Collapse>
     </div>
    )
}


export default ClienteID