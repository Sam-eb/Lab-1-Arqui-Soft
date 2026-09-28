import { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import {Alert, FloatingLabel, FormControl, InputGroup, Row,Col } from 'react-bootstrap';

import ChargingButton from '../components/ChargingButton'
import axios from 'axios';


function CrearCliente({open, setOpen}){

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('warning');
  const [alertMessage, setAlertMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [subiendo,setSubiendo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetFormulario = () => {
    setFirstName('');
    setLastName('');
    setAccountNumber('');
    setBalance('');
  };

  useEffect(()=>{
    if(!open){
      resetFormulario();
    }
  },[open]);

  const handleCrearCliente = async (e) => {
    e.preventDefault();
    setSubiendo(true);
    setShowAlert(false);

    const cliente= {
      firstName,
      lastName,
      accountNumber,
      balance: balance == ' '? null: parseFloat(balance),
    };
    if(!balance.trim()){
      
    }
    try{
      await axios.post('http://localhost:8080/api/customers', cliente);

      setAlertVariant('success');
      setAlertMessage('Cliente guardado con exito');
      setShowAlert(true);

      resetFormulario();
    }catch (error){
      console.error('Error al crear el cliente:', error);
      const mensajeBackend = 
      error.
      response?.
      data?.
      message || 
      (typeof error.response?.data === 'string' ? error.response.data : null) || 
      'Error al guardar el cliente';
       
      setAlertVariant('warning');
      setAlertMessage(mensajeBackend);
      setShowAlert(true);
    }
    finally{
      setSubiendo(false);
    }
  };

return(
  <div>
    {showAlert && (
      <Alert
        variant={alertVariant}
        onClose={() => setShowAlert(false)}
        dismissible
        className="mb-3"
      >
        {alertMessage}
      </Alert>
    )}
      <form 
      
      onSubmit={handleCrearCliente} 
      className='g-2'
      onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
          }}>
        <FormControl
          maxLength = "50"
          placeholder='Nombre'
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          
          }}
        />
        <br/>
        <FormControl
          placeholder='Apellidos'
          maxLength = "50"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <br/>
          <FormControl
          type='number'
          maxLength = "50"
          placeholder='Numero personalizado de cuenta'
          value={accountNumber}
          onChange={(e) => {
            setAccountNumber(e.target.value);
          }}
        />
        <br/>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
            <Form.Control 
            type='number'
            maxLength = "50"
            placeholder = 'Monto inicial'
            value = {balance}
            onChange={(e) => {
              setBalance(e.target.value)
              if (showAlert) setShowAlert(false);
            }}
                  />
        </InputGroup>
        <ChargingButton
          type="submit"
          color="success"
          text="Guardar"
          loadingText="Guardando"
          isLoading={subiendo}/>
        </form>
  </div>
);
}

export default CrearCliente
