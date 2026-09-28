import { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import {Alert, Spinner,Table, FloatingLabel, FormControl, InputGroup, Button, Card, Collapse, FormGroup, FormLabel } from 'react-bootstrap';

import ChargingButton from '../components/ChargingButton'
import Overlay from 'react-bootstrap/Overlay';
import axios from 'axios';

function ConsultarTransferencias(){

    const [accountNumber, setAccountNumber] = useState('');
    const [historico, setHistorico] = useState([]);
    const target = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const [show, setShow] = useState(false);
    const [mensajeError, setMensajeError] = useState(' ');
    const [open,setOpen] = useState(false);

    const [error, setError] = useState(null);
    const handleConsultar = async (e) => {
        const numberLimpio = accountNumber.trim();
        e.preventDefault();
        setShow(false);

        if(!numberLimpio){
            setMensajeError("Ingrese un número de cuenta");
            setShow(true);
            setOpen(false);
            setHistorico([]);
            return;
        }
        
        try{
            setOpen(false)
            setShow(false);
            const response = await axios.get(`http://localhost:8080/api/transactions/${accountNumber}`)
            const data = response.data;
            const listaTransacciones = Array.isArray(data) ? data : (data.data || []);
      
            setHistorico(listaTransacciones);
            setOpen(true)

        }catch(err){
            console.error("Error al obtener el cliente:", err);
            setHistorico([]);
            setOpen(false);

            setMensajeError('No encontrado');
            setShow(true);

        }finally{
            setIsLoading(false);
        }

        
    };

return(
    <div style={{ position: 'relative' }}>
        <h2>Consulte su historico de transferencias</h2>
      <Form 
        onSubmit={handleConsultar}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
            }}>
        <FormLabel className='mb-3'>Ingrese su número de cuenta</FormLabel>
        <InputGroup>
          <FloatingLabel
          controlId='account-Number-fl'
          label = "Número de cuenta"
          >
            <FormControl
            type = "text" 
            maxLength="50"
            placeholder='Número de cuenta' 
            value = {accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
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
            {error && <Alert variant="danger">{error}</Alert>}

        {isLoading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Cargando información del servidor...</p>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark bg-success">
              <tr>
                <th>ID</th>
                <th>Cuenta Origen</th>
                <th>Cuenta Destino</th>
                <th>Monto Transferido</th>
                <th>TimeStamp</th>
              </tr>
            </thead>
            <tbody>
              {historico.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay transferencias registradas con ese número de cuenta en la base de datos.
                  </td>
                </tr>
              ) : (
                historico.map((historico) => (
                  <tr key={historico.Id}>
                    <td>{historico.id}</td>
                    <td>{historico.senderAccountNumber}</td>
                    <td>{historico.receiverAccountNumber}</td>
                    <td>{historico.amount}</td>
                    <td>${historico.timestamp}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
          </Card>
        </div>
      </Collapse>
     </div>
);
};
export default ConsultarTransferencias;