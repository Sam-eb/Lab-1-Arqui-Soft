import api from '../api/axiosConfig';

export const transaccionService = {
  // POST para realizar la transferencia entre cuentas
  transferir: (datosTransferencia) => api.post('/transactions', datosTransferencia),
  
  // GET para buscar
  obtenerTransaccionesPorCuenta: (accountNumber) => api.get(`/transactions/${accountNumber}`)
};