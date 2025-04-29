import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { transformarPaqueteBackData } from "./transformarPaqueteService"; // Ajustá la ruta si cambia

export const useBusquedaPorCarta = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const buscarPorId = async (idPaquete: number) => {
    setLoading(true);

    try {
      const response = await fetch(`https://triptest.com.ar/get_paquete/${idPaquete}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("⚠️ NO SE ENCONTRÓ EL PAQUETE.");
          const dataError = [{ id: "error", ciudad: "No se encontró el paquete" }];
          localStorage.setItem("resultadosBusqueda", JSON.stringify(dataError));
          window.dispatchEvent(new Event("actualizarPaquetes"));
          navigate("/paquetes-busqueda");
          return;
        } else {
          throw new Error(`ERROR AL BUSCAR PAQUETE. CÓDIGO: ${response.status}`);
        }
      }

      const responseData = await response.json();

      // 🚨 LOG DEL DATO CRUDO COMPLETO
      console.log("🚨 DATO CRUDO COMPLETO:", responseData);

      let data = responseData.data; // 🔥 Accedemos a "data"

      if (!Array.isArray(data)) {
        console.warn("⚠️ 'data' recibido NO era un array. Lo envolvemos en un array de 1 elemento.");
        data = [data];
      }

      // 🔵 🔥 TRANSFORMAR LOS PAQUETES
      const dataTransformada = data.map(transformarPaqueteBackData);

      console.log("🚀 DATO TRANSFORMADO Y LISTO:", dataTransformada);

      // 🔵 Guardamos ya transformado
      localStorage.setItem("resultadosBusqueda", JSON.stringify(dataTransformada));

      // 🔵 Disparamos evento para actualizar
      window.dispatchEvent(new Event("actualizarPaquetes"));

      // 🔵 Navegamos
      navigate("/paquetes-busqueda");

    } catch (error) {
      console.error("❌ ERROR AL BUSCAR PAQUETE POR ID:", error);
      alert("Ocurrió un error al buscar este paquete.");
    } finally {
      setLoading(false);
    }
  };

  return { buscarPorId, loading };
};
