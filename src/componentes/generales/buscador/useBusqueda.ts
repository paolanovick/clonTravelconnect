import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormulario } from "../../../contextos/FormularioContext"; // 🔥 Importamos el contexto

export const useBusqueda = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { ciudadOrigen, destino, fechaSalida, viajeros, resetFormulario } = useFormulario(); // 🔥 Ahora obtenemos resetFormulario

  const handleClick = async () => {
    setLoading(true);

    console.log("📤 Enviando solicitud con los siguientes datos:", {
      ciudadOrigen,
      destino,
      fechaSalida: fechaSalida ? fechaSalida.toISOString() : null, // Convertimos la fecha
      viajeros,
    });

    try {
      const response = await fetch("http://triptest.com.ar/paquetes/filtrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ciudadOrigen,
          destino,
          fechaSalida: fechaSalida ? fechaSalida.toISOString() : null, // Enviamos la fecha en formato ISO
          viajeros,
        }),
      });

      let data;
      if (!response.ok) {
        if (response.status === 404) {
          console.warn("⚠️ No se encontraron paquetes para la búsqueda.");
          data = [{ id: "error", ciudad: "No se encontraron paquetes" }];
        } else {
          throw new Error(`Error en la búsqueda. Código de estado: ${response.status}`);
        }
      } else {
        data = await response.json();
      }

      localStorage.setItem("resultadosBusqueda", JSON.stringify(data));
      window.dispatchEvent(new Event("actualizarPaquetes"));
      resetFormulario();
      navigate("/paquetes-busqueda"); // 🔥 Ahora siempre redirige
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      alert("Hubo un error en la búsqueda. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleClick };
};
