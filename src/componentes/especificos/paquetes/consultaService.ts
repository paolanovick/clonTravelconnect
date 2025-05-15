export interface ConsultaData {
    idAgencia: number;
    idPaquete: number;
    nombreCompleto: string;
    email: string;
    telefono: string;
    direccion: string;
    pais: string;
    ciudad: string;
    comentarios: string;
  }
  
  export const enviarConsulta = async (data: ConsultaData): Promise<string> => {
    const payload = {
      agencia_id: data.idAgencia,
      paquete_id: data.idPaquete,
      formularioConsulta: {
        nombre_apellido: data.nombreCompleto,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion,
        pais: data.pais,
        ciudad: data.ciudad,
        comentarios: data.comentarios,
      },
    };
  
    // 🔍 Log para ver exactamente qué se está enviando
    console.log("Payload enviado a /contacto/enviarAgencia:", payload);
  
    const respuesta = await fetch("https://travelconnect.com.ar/contacto/enviarAgencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!respuesta.ok) {
      throw new Error("Error al enviar la consulta");
    }
  
    const result = await respuesta.json();
    return result?.mensaje ?? "Consulta enviada correctamente.";
  };
  