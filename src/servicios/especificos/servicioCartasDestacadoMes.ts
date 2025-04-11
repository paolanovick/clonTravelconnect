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
}

// Interfaz para el formato esperado por el componente
export interface PaqueteDestacado {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  descripcion: string;
  fecha: string;
  duracion: number; // ✅ Se corrige a `number` en lugar de `string`
}

// Función para obtener los paquetes destacados
export const obtenerPaquetesDestacados = async (): Promise<PaqueteDestacado[]> => {
  try {
    // 🔥 Definir el tipo esperado en la petición
    const response = await axios.get<PaqueteEndpoint[]>("https://triptest.com.ar/get_paquetes");

    // Transformar los datos
    const paquetesTransformados: PaqueteDestacado[] = response.data
      .slice(0, 20) // Tomar solo los primeros 20 paquetes
      .map((paquete: PaqueteEndpoint) => {
        // Obtener la primera salida disponible
        const primeraSalida = paquete.salidas?.length > 0 ? paquete.salidas[0] : null;

        return {
          id: paquete.id,
          nombre: `${paquete.ciudad}, ${paquete.pais}`,
          imagen: paquete.imagen_principal || "/placeholder.jpg", // 🔥 Imagen por defecto si es null
          precio: primeraSalida?.doble_precio ? parseFloat(primeraSalida.doble_precio) : 0, // 🔥 Validación de precio
          descripcion: `${paquete.cant_noches || 1} noches en ${paquete.ciudad}`,
          fecha: primeraSalida?.fecha_desde || "Fecha no disponible",
          duracion: paquete.cant_noches || 1, // ✅ Ahora es `number`, no `string`
        };
      });

    return paquetesTransformados;
  } catch (error) {
    console.error("Error al obtener los paquetes destacados:", error);
    return [];
  }
};