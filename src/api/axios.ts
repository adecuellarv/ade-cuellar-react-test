import axios from 'axios';
import Swal from 'sweetalert2';

const apiBaseUrl: any = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      Swal.fire({
        title: 'Error del servidor',
        text: '',
        icon: 'error',
        confirmButtonText: '¡Entendido!'
      })
    } else if (error.request) {
      Swal.fire({
        title: 'No se recibió respuesta',
        text: '',
        icon: 'error',
        confirmButtonText: '¡Entendido!'
      })
    } else {
      Swal.fire({
        title: 'Error al configurar la solicitud',
        text: '',
        icon: 'error',
        confirmButtonText: '¡Entendido!'
      })
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;