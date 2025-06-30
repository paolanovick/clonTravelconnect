import axios from "axios";

// Interfaz para la respuesta del endpoint
interface PaqueteEndpoint {
  id: number;
  ciudad: string;
  pais: string;
  imagen_principal: string | null;
  cant_noches: number;
  salidas: {
    doble_precio: string | null;
    fecha_desde: string | null;
  }[];
  tipo_moneda: string; // 👈 Agregado para capturar la moneda
}

// Interfaz para el formato esperado por el componente
export interface PaqueteDestacado {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  descripcion: string;
  fecha: string;
  duracion: number;
  moneda: string; // 👈 Agregado para mostrar la moneda
}

// Función para obtener los paquetes destacados
export const obtenerPaquetesDestacados = async (): Promise<PaqueteDestacado[]> => {
  try {
    const response = await axios.get<PaqueteEndpoint[]>("https://travelconnect.com.ar/get_paquetes");

    console.log("Paquetes crudos recibidos:", response.data);

    const paquetesTransformados: PaqueteDestacado[] = response.data
      .slice(0, 20)
      .map((paquete: PaqueteEndpoint) => {
        console.log("Paquete individual:", paquete);

        const primeraSalida = paquete.salidas?.length > 0 ? paquete.salidas[0] : null;

        return {
          id: paquete.id,
          nombre: `${paquete.ciudad}, ${paquete.pais}`,
          imagen: paquete.imagen_principal || "/placeholder.jpg",
          precio: primeraSalida?.doble_precio ? parseFloat(primeraSalida.doble_precio) : 0,
          descripcion: `${paquete.cant_noches || 1} noches en ${paquete.ciudad}`,
          fecha: primeraSalida?.fecha_desde || "Fecha no disponible",
          duracion: paquete.cant_noches || 1,
          moneda: paquete.tipo_moneda || "Desconocida", // 👈 Nuevo campo
        };
      });

    return paquetesTransformados;
  } catch (error) {
    console.error("Error al obtener los paquetes destacados:", error);
    return [];
  }
};
