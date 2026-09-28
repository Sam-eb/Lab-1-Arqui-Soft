import api from "../api/axiosConfig";

export const clienteService = {
  // GET
  obtenerTodos: () => api.get('/clientes'),
  obtenerPorId: (id) => api.get(`/clientes/${id}`),
  
  // POST / PUT / DELETE (Funcionalidad opcional)
  crear: (datosCliente) => api.post("/clientes", datosCliente),
  eliminar: (id) => api.delete(`/clientes/${id}`)
};