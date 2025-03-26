// TabsPaquete.tsx
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

export interface TabsPaqueteProps {
  onTabChange?: (tabIndex: number, expansionOpen: boolean) => void;
}

const TabsPaquete: React.FC<TabsPaqueteProps> = ({ onTabChange }) => {
  // Inicialmente, ninguna pestaña está seleccionada
  const [tabSeleccionada, setTabSeleccionada] = useState<number | null>(null);
  const [expansionOpen, setExpansionOpen] = useState<boolean>(false);

  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const colorFondo = tarjetas?.color?.secundario || datosGenerales?.color?.secundario || "#f5f5f5";
  const colorIndicador = tarjetas?.color?.primario || datosGenerales?.color?.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColorContenido || datosGenerales?.colorTipografiaAgencia || "#000";

  // Se dispara cuando se selecciona una pestaña distinta
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabSeleccionada(newValue);
    setExpansionOpen(true);
    onTabChange?.(newValue, true);
  };

  // Si se vuelve a hacer clic en la misma pestaña, se hace toggle en la expansión
  const handleTabClick = (index: number) => {
    if (index === tabSeleccionada) {
      const newExpansionState = !expansionOpen;
      setExpansionOpen(newExpansionState);
      onTabChange?.(index, newExpansionState);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorFondo,
        p: 1,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Tabs
        value={tabSeleccionada === null ? false : tabSeleccionada}
        onChange={handleTabChange}
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          "& .MuiTabs-flexContainer": { justifyContent: "center" },
          "& .MuiTabs-indicator": { backgroundColor: colorIndicador },
        }}
      >
        {["Hoteles", "Descripción", "Salidas", "Transporte"].map((label, index) => (
          <Tab
            key={index}
            label={label}
            onClick={() => handleTabClick(index)}
            sx={{
              color: colorTexto,
              flex: 1,
              textAlign: "center",
              fontWeight: "bold",
              "&:hover": { opacity: 0.8 },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsPaquete;
