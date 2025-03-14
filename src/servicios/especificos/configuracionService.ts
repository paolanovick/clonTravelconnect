import { httpRequest } from '../generales/httpsService';
import { EstilosAgencia } from '../../interfaces';

export const obtenerConfiguracionEstilos = async (): Promise<EstilosAgencia> => {
    try {
        const estilos = await httpRequest<EstilosAgencia>('/api/configuracion/estilos');

        if (!estilos || !estilos.colores || !estilos.tipografia) {
            throw new Error('La respuesta de la API no contiene los datos esperados.');
        }

        return estilos;
    } catch (error) {
        console.error('Error al obtener la configuración de estilos:', error);
        throw new Error('No se pudo obtener la configuración de estilos.');
    }
};

// Definición de paletas de colores

const estilosVerde: EstilosAgencia = {
    colores: {
        primario: "#4CAF50",
        secundario: "#81C784",
        fondo: "#E8F5E9",
    },
    tipografia: {
        familia: "'Poppins', sans-serif",
        tamano: "16px",
    },
    imagenFondo: "https://ejemplo.com/fondo-verde.jpg",
    logo: "https://ejemplo.com/logo-verde.png",
};

const estilosAzul: EstilosAgencia = {
    colores: {
        primario: "#2196F3",
        secundario: "#64B5F6",
        fondo: "#E3F2FD",
    },
    tipografia: {
        familia: "'Poppins', sans-serif",
        tamano: "16px",
    },
    imagenFondo: "https://ejemplo.com/fondo-azul.jpg",
    logo: "https://ejemplo.com/logo-azul.png",
};

// Simula una demora de 1 segundo para imitar una solicitud HTTP
const simularDemora = () => new Promise<void>((resolve) => setTimeout(resolve, 1000));

export const obtenerEstilosSimulados = async (paleta: 'verde' | 'azul'): Promise<EstilosAgencia> => {
    await simularDemora();
    return paleta === 'verde' ? estilosVerde : estilosAzul;
};
