import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useBusquedaPorCarta = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const buscarPorId = async (idPaquete: number) => {
    setLoading(true);

    try {
      const response = await fetch("https://triptest.com.ar/paquetes/filtrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPaquete,
          ciudadOrigen: null,
          destino: null,
          fechaSalida: null,
          viajeros: null,
        }),
      });

      let data;
      if (!response.ok) {
        if (response.status === 404) {
          console.warn("⚠️ No se encontró el paquete.");
          data = [{ id: "error", ciudad: "No se encontró el paquete" }];
        } else {
          throw new Error(`Error al buscar paquete. Código: ${response.status}`);
        }
      } else {
        data = await response.json();
      }

      localStorage.setItem("resultadosBusqueda", JSON.stringify(data));
      window.dispatchEvent(new Event("actualizarPaquetes"));
      navigate("/paquetes-busqueda");
    } catch (error) {
      console.error("❌ Error al buscar paquete por ID:", error);
      alert("Ocurrió un error al buscar este paquete.");
    } finally {
      setLoading(false);
    }
  };

  return { buscarPorId, loading };
};
