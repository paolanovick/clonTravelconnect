// TabsPaquete.tsx
import React, { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

export interface TabsPaqueteProps {
  onTabChange?: (tabIndex: number, expansionOpen: boolean) => void;
}

const TabsPaquete: React.FC<TabsPaqueteProps> = ({ onTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Inicialmente, ninguna pestaña está seleccionada
  const [tabSeleccionada, setTabSeleccionada] = useState<number | null>(null);
  const [expansionOpen, setExpansionOpen] = useState<boolean>(false);

  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const colorFondo = tarjetas?.color?.secundario || datosGenerales?.color?.secundario || "#f5f5f5";
  const colorIndicador = tarjetas?.color?.primario || datosGenerales?.color?.primario || "#1976d2";
  const colorTexto = tarjetas?.tipografiaColorContenido || datosGenerales?.colorTipografiaAgencia || "#000";

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabSeleccionada(newValue);
    setExpansionOpen(true);
    onTabChange?.(newValue, true);
  };

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
        p: isMobile ? 0.5 : 1,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Tabs
        value={tabSeleccionada === null ? false : tabSeleccionada}
        onChange={handleTabChange}
        textColor="inherit"
        indicatorColor="primary"
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          width: "100%",
          minHeight: isMobile ? 48 : 64, // Altura mínima reducida en móviles
          "& .MuiTabs-flexContainer": { 
            justifyContent: "center",
            gap: isMobile ? 0.5 : 1, // Espacio entre tabs reducido en móviles
          },
          "& .MuiTabs-indicator": { 
            backgroundColor: colorIndicador,
            height: 3, // Altura del indicador reducida
          },
          "& .MuiTabs-scrollButtons": {
            width: isMobile ? 24 : 32, // Tamaño de botones de scroll reducido
          },
        }}
      >
        {["Hoteles", "Descripción", "Salidas", "Transporte"].map((label, index) => (
          <Tab
            key={index}
            label={label}
            onClick={() => handleTabClick(index)}
            sx={{
              color: colorTexto,
              flex: isMobile ? 'none' : 1, // En móviles no usamos flex:1 para evitar estiramiento
              minWidth: isMobile ? 'auto' : undefined, // Ancho mínimo automático en móviles
              padding: isMobile ? '6px 8px' : '12px 16px', // Padding reducido en móviles
              fontSize: isMobile ? '0.7rem' : (isTablet ? '0.8rem' : '0.875rem'), // Tamaño de fuente responsive
              fontWeight: "bold",
              textTransform: 'none', // Mantenemos el texto sin mayúsculas
              "&:hover": { opacity: 0.8 },
              whiteSpace: 'nowrap', // Evitamos saltos de línea
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsPaquete;