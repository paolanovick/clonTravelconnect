import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormulario } from "../../../contextos/FormularioContext";
import { transformarPaqueteDesdeBackend } from "./transformarPaquete";

export const useBusqueda = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    ciudadOrigen,
    destino,
    fechaSalida,
    viajeros, // ✅ ahora es { adultos, menores }
    resetFormulario,
  } = useFormulario();

  const guardarValoresPrevios = () => {
    localStorage.setItem(
      "valoresPrevios",
      JSON.stringify({
        ciudadOrigen,
        destino,
        fechaSalida,
        viajeros,
      })
    );
  };

  const handleClick = async () => {
    setLoading(true);

    console.log("📤 Enviando solicitud con los siguientes datos:", {
      ciudadOrigen,
      destino,
      fechaSalida: fechaSalida ? fechaSalida.toISOString() : null,
      viajeros, // 👈 { adultos, menores }
    });

    try {
      const response = await fetch("https://triptest.com.ar/paquetes/filtrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ciudadOrigen,
          destino,
          fechaSalida: fechaSalida ? fechaSalida.toISOString() : null,
          viajeros, // ✅ Se envía como objeto
        }),
      });

      let paquetesTransformados = [];

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("⚠️ No se encontraron paquetes para la búsqueda.");
          paquetesTransformados = [{ id: -1, ciudad: "No se encontraron paquetes" }];
        } else {
          throw new Error(`Error en la búsqueda. Código de estado: ${response.status}`);
        }
      } else {
        const data = await response.json();
        paquetesTransformados = data.map(transformarPaqueteDesdeBackend);
        console.log("📦 Paquetes transformados antes de guardar:", paquetesTransformados);
      }

      localStorage.setItem("resultadosBusqueda", JSON.stringify(paquetesTransformados));
      guardarValoresPrevios();
      resetFormulario();
      window.dispatchEvent(new Event("actualizarPaquetes"));
      navigate("/paquetes-busqueda");
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      alert("Hubo un error en la búsqueda. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleClick };
};
