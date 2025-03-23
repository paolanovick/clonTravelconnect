import React from "react";
import { Card, List, ListItem, ListItemText } from "@mui/material";
import { UbicacionIATA } from "../../../data/ubicacionesIATA";
import { useDatosGenerales, useBuscador } from "../../../contextos/DatosAgenciaContext";

interface ListaSugerenciasProps {
  mostrarSugerencias: boolean;
  sugerencias: UbicacionIATA[];
  seleccion: UbicacionIATA | null;
  handleSeleccion: (ubicacion: UbicacionIATA) => void;
  cerrarLista: () => void; // 🔹 Nueva función para cerrar la lista al hacer clic
}

const ListaSugerencias: React.FC<ListaSugerenciasProps> = ({ mostrarSugerencias, sugerencias, seleccion, handleSeleccion, cerrarLista }) => {
  const datosGenerales = useDatosGenerales();
  const buscador = useBuscador();

  /** 🔹 Definir colores y tipografía con fallbacks */
  const fondoLista = buscador?.inputColor || datosGenerales?.colorPrincipalAgencia || "#FFFFFF";
  const colorTipografia = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#000000";
  const colorHover = buscador?.calendarioColorSecundario || datosGenerales?.colorSecundarioAgencia || "rgba(255, 102, 0, 0.5)"; // 🔹 Color de hover dinámico
  const colorSeleccionado = buscador?.calendarioColorPrimario || datosGenerales?.colorPrincipalAgencia || "rgba(255, 102, 0, 0.3)";
  const tipografia = buscador?.tipografia || datosGenerales?.tipografiaAgencia || "'Poppins', sans-serif";

  if (!mostrarSugerencias || sugerencias.length === 0) return null;

  return (
    <Card
      sx={{
        maxHeight: 200,
        overflowY: "auto",
        bgcolor: fondoLista, // 🔹 Fondo del input de búsqueda
        borderRadius: "10px",
        p: 1,
      }}
    >
      <List>
        {sugerencias.map((ubicacion) => (
          <ListItem
            key={ubicacion.codigo}
            onClick={() => {
              handleSeleccion(ubicacion);
              cerrarLista(); // 🔹 Cierra la lista de sugerencias automáticamente
            }}
            sx={{
              cursor: "pointer",
              bgcolor: seleccion?.codigo === ubicacion.codigo ? colorSeleccionado : "transparent",
              borderRadius: "10px",
              transition: "background-color 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: colorHover, // 🔹 Ahora el hover usa el color de la agencia
              },
            }}
          >
            <ListItemText
              primary={`${ubicacion.nombre} (${ubicacion.codigo})`}
              sx={{
                color: colorTipografia, // 🔹 Usa el color de tipografía definido en el buscador
                fontFamily: tipografia, // 🔹 Aplica la tipografía correcta
              }}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default ListaSugerencias;
