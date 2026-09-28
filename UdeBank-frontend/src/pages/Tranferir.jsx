import { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import {Alert, FloatingLabel, FormControl, InputGroup, Row,Col, Container, Collapse } from 'react-bootstrap';

import ChargingButton from '../components/ChargingButton'
import axios from 'axios';

function Transferir(){

  const [showAlertWarning, setShowAlertWarning] = useState(false);
  const [showAlertSucces, setShowAlertSucces] = useState(false);
  const [alertMessage,setAlertMessage] = useState('');

  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resetFormulario = () => {
    setSenderAccountNumber('');
    setReceiverAccountNumber('');
    setAmount('');
  };


  const timestamp = new Date().toISOString().substring(0, 19)
  const handleCrearCliente = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowAlertWarning(false);
    setShowAlertSucces(false);

    const transaction= {
      senderAccountNumber: senderAccountNumber.trim() == ''? null : senderAccountNumber.trim(),
      receiverAccountNumber: receiverAccountNumber.trim() == ''? null : receiverAccountNumber.trim(),
      amount: amount.trim() === '' ? 0 : parseFloat(amount),
      timestamp,
    };
    try{
      await axios.post('http://localhost:8080/api/transactions', transaction);

      setOpen(true)
      setShowAlertSucces(true);
      setAlertMessage("¡Tranferencia Exitosa!")
      resetFormulario();
    }catch (error){
      console.error('Error al crear el generar la transferencia:', error);
      const mensajeBackend = 
      error.
      response?.
      data?.
      message || 
      (typeof error.response?.data === 'string' ? error.response.data : null) || 
      'Error al guardar el cliente';

      setAlertMessage(mensajeBackend);
      setShowAlertWarning(true);
    }
    finally{
      setIsLoading(false);
    }
  };


return(
  <Container>
  <div>
    {showAlertWarning && (
      <Alert
        variant="warning"        
        onClose={() => setShowAlertWarning(false)}
        dismissible
        className="mb-3"
      >
        {alertMessage}
      </Alert>
    )}
      <form 
      onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      onSubmit={handleCrearCliente} 
      className='g-2'>
        <FormControl
        maxLength="50"
        type='text'
          placeholder='Cuenta Origen'
          value={senderAccountNumber}
          onChange={(e) => {
            setSenderAccountNumber(e.target.value);
            if (open) setOpen(setOpen);
          }}
        />
        <br/>
        <FormControl
        type='text'
          maxLength="50"
          placeholder='Cuenta destino'
          value={receiverAccountNumber}
          onChange={(e) => {
            setReceiverAccountNumber(e.target.value);
            if (open) setOpen(setOpen);
          }}
        />
        <br/>
          <FormControl
          maxLength="50"
        type='text'
          placeholder='Monto a transferir'
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            if (open) setOpen(setOpen);
          }}
        />
        <br/>
        <ChargingButton
          type="submit"
          color="success"
          text="Guardar"
          loadingText="Guardando"
          isLoading={isLoading}/>
        </form>
        <br/>
        {showAlertSucces && (
      <Alert
        variant="success"        
        onClose={() => setShowAlertSucces(false)}
        dismissible
        className="mb-3"
      >
        {alertMessage}
      </Alert>
    )}
  </div>
  
</Container>
);
}


export default Transferir;