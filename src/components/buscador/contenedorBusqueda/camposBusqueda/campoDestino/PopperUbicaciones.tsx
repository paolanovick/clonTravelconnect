import React from "react";
import { MenuItem, Paper, Popper, Box, List } from "@mui/material";
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
  colorPrimario: string;   // Fondo del header
  tipografia: string;
  colorTerciario?: string; // Hover de items
}

const PopperUbicaciones: React.FC<PopperUbicacionesProps> = ({
  open,
  anchorEl,
  opcionesFiltradas,
  handleSelect,
  label,
  colorPrimario,
  tipografia,
  colorTerciario,
}) => {
  const ancho = anchorEl?.clientWidth || 320;
  const hoverBg = `${(colorTerciario || colorPrimario)}33`; // ~20% alpha

  return (
    <Popper
      open={open && opcionesFiltradas.length > 0}
      anchorEl={anchorEl}
      placement="bottom-start"
      modifiers={[{ name: "preventOverflow", options: { boundary: "window" } }]}
      sx={{ zIndex: 9999 }}
    >
      <Paper
        elevation={4}
        sx={{
          mt: 1,
          borderRadius: "12px",
          overflow: "hidden",
          width: ancho,
          maxWidth: "90vw",
          fontFamily: tipografia,
          backdropFilter: "saturate(1.1)",
          border: "none", // sin borde
        }}
        role="listbox"
        aria-label={`Opciones para ${label}`}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: colorPrimario,
            color: "#fff",
            px: 1.5,
            py: 1,
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            fontFamily: tipografia,
            gap: 1,
          }}
        >
          <LocationOnIcon fontSize="small" />
          {`${label}: ${opcionesFiltradas.length} encontrados`}
        </Box>

        {/* Lista */}
        <List dense disablePadding sx={{ maxHeight: 240, overflowY: "auto" }}>
          {opcionesFiltradas.map((ubicacion) => (
            <MenuItem
              key={ubicacion.codigo}
              onClick={() => handleSelect(ubicacion)}
              role="option"
              aria-label={`${ubicacion.nombre}`}
              sx={{
                py: 1,
                px: 1.5,
                fontSize: 14,
                fontFamily: tipografia,
                "&:hover": {
                  backgroundColor: hoverBg,
                },
              }}
            >
              {ubicacion.nombre}
            </MenuItem>
          ))}
        </List>
      </Paper>
    </Popper>
  );
};

export default PopperUbicaciones;
