import React from "react";
import { MenuItem, Paper, Popper, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface UbicacionIATA {
  codigo: string;
  nombre: string;
}

interface PopperUbicacionesProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  opcionesFiltradas: UbicacionIATA[];
  handleSelect: (ubicacion: UbicacionIATA) => void;
  label: string;
  colorPrimario: string;
  tipografia: string;
}

const PopperUbicaciones: React.FC<PopperUbicacionesProps> = ({
  open,
  anchorEl,
  opcionesFiltradas,
  handleSelect,
  label,
  colorPrimario,
  tipografia,
}) => {
  return (
    <Popper
      open={open && opcionesFiltradas.length > 0} // 🔥 Solo se muestra si hay opciones
      anchorEl={anchorEl}
      placement="bottom-start"
      modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]}
      sx={{ zIndex: 9999 }}
    >
      <Paper
        sx={{
          mt: 1,
          boxShadow: 3,
          borderRadius: "8px",
          overflow: "hidden",
          width: anchorEl?.clientWidth || "auto",
          fontFamily: tipografia,
        }}
      >
        {/* 🔹 Encabezado con color dinámico */}
        <Box
          sx={{
            backgroundColor: colorPrimario,
            color: "white",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontFamily: tipografia,
          }}
        >
          <LocationOnIcon sx={{ marginRight: "8px" }} />
          {`${label}: ${opcionesFiltradas.length} Encontrados`}
        </Box>

        {/* 🔹 Opciones dentro del menú */}
        {opcionesFiltradas.length > 0 ? (
          opcionesFiltradas.map((ubicacion) => (
            <MenuItem
              key={ubicacion.codigo}
              onClick={() => handleSelect(ubicacion)}
              sx={{ padding: "10px 16px", fontSize: "14px", fontFamily: tipografia }}
            >
              {ubicacion.nombre} {/* 🔥 Solo muestra el nombre */}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled sx={{ padding: "10px 16px", fontSize: "14px", fontFamily: tipografia }}>
            No hay coincidencias
          </MenuItem>
        )}
      </Paper>
    </Popper>
  );
};

export default PopperUbicaciones;
