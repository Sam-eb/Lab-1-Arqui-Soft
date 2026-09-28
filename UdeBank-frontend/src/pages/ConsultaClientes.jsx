import { useEffect, useState } from 'react';
import { Table, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { clienteService } from '../services/clienteService';
import axios from 'axios';

function ConsultarClientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar clientes desde el backend
  const cargarClientes = async () => {
    try {
      setCargando(true);
      const response = await axios.get(`http://localhost:8080/api/customers`)
      setClientes(response.data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener clientes:", err);
      setError("No se pudo conectar con el servidor o cargar la lista de clientes.");
    } finally {
      setCargando(false);
    }
  };

  // Cargar al montar el componente
  useEffect(() => {
    cargarClientes();
  }, []);

  
  return (
    <Card className="shadow-sm">
      <Card.Header as="h4" className="bg-success text-white">
        Consultar Clientes
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {cargando ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Cargando información del servidor...</p>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark bg-success">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Número de Cuenta</th>
                <th>Saldo Actual</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay clientes registrados en la base de datos.
                  </td>
                </tr>
              ) : (
                clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.firstName}</td>
                    <td>{cliente.lastName}</td>
                    <td>{cliente.accountNumber}</td>
                    <td>${cliente.balance?.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

export default ConsultarClientes;