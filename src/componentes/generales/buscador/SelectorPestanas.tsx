import React, { useState, useEffect } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useBuscador, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import CheckIcon from "@mui/icons-material/Check";

const SelectorPestanas: React.FC = () => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery('(max-width:400px)');
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  
  // Cambié la opción por defecto a "paquetes"
  const [pestanaActiva, setPestanaActiva] = useState("paquetes");
  const [isWrapped, setIsWrapped] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(5);

  // Tamaños responsivos mejorados para legibilidad
  const getTabSize = () => {
    if (isExtraSmall) return 90;    // Móviles muy pequeños
    if (isSmall) return 110;       // Móviles
    if (isMedium) return 130;      // Tablets
    return 150;                    // Desktop
  };

  const getFontSize = () => {
    if (isExtraSmall) return "0.75rem";  // ~12px
    if (isSmall) return "0.8125rem";     // ~13px
    return "0.875rem";                  // ~14px
  };

  const getIconSize = () => {
    if (isExtraSmall) return 16;
    if (isSmall) return 18;
    return 20;
  };

  const getPadding = () => {
    if (isExtraSmall) return "6px 8px";
    if (isSmall) return "8px 10px";
    return "8px 12px";
  };

  useEffect(() => {
    if (!datosGenerales) return;

    const checkIfWrapped = () => {
      const container = document.getElementById('tabs-container');
      if (container) {
        const children = Array.from(container.children);
        if (children.length > 0) {
          const firstChildTop = children[0].getBoundingClientRect().top;
          const isAnyChildWrapped = children.some(child => 
            child.getBoundingClientRect().top > firstChildTop
          );
          setIsWrapped(isAnyChildWrapped);
          
          const containerWidth = container.clientWidth;
          const calculatedItemsPerRow = Math.max(1, Math.floor(containerWidth / (getTabSize() + 8)));
          setItemsPerRow(calculatedItemsPerRow);
        }
      }
    };

    checkIfWrapped();
    window.addEventListener('resize', checkIfWrapped);
    
    return () => {
      window.removeEventListener('resize', checkIfWrapped);
    };
  }, [datosGenerales, isExtraSmall, isSmall, isMedium]);

  if (!datosGenerales) return null;

  const fondoSeleccionado = buscador?.color?.secundario || datosGenerales?.color?.secundario || "#D1E3FF";
  const hoverColor = buscador?.color?.primario || datosGenerales?.color?.primario || "#0056b3";
  const tipografiaColorSeleccionado = buscador?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "black";

  const opciones = [
    { valor: "paquetes", label: "Paquetes" },
    { valor: "vuelos", label: "Vuelos" },
    { valor: "hoteles", label: "Hoteles" },
    { valor: "autos", label: "Autos" },
    { valor: "circuitos", label: "Circuitos" },
  ];

  const getBorderRadius = (index: number) => {
    if (!isWrapped) return "35px";
    
    const rowStartIndex = Math.floor(index / itemsPerRow) * itemsPerRow;
    const rowEndIndex = Math.min(rowStartIndex + itemsPerRow - 1, opciones.length - 1);
    
    if (index === rowStartIndex && index === rowEndIndex) return "35px";
    if (index === rowStartIndex) return "35px 0 0 35px";
    if (index === rowEndIndex) return "0 35px 35px 0";
    return "0";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        maxWidth: "858px",
        mb: 2,
        overflowX: "auto",
        backgroundColor: "transparent",
      }}
    >
      <ToggleButtonGroup
        value={pestanaActiva}
        exclusive
        onChange={(_, nuevaPestana) => {
          if (nuevaPestana !== null) setPestanaActiva(nuevaPestana);
        }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: { xs: "100%", md: "858px" },
          backgroundColor: "transparent",
          borderRadius: "35px",
          padding: "4px",
          gap: isWrapped ? "4px" : 0,
        }}
        id="tabs-container"
      >
        {opciones.map((opcion, index) => (
          <ToggleButton
            key={opcion.valor}
            value={opcion.valor}
            sx={{
              flex: isWrapped ? `0 0 ${getTabSize()}px` : 1,
              minWidth: `${getTabSize()}px`,
              height: "44px",
              borderRadius: getBorderRadius(index),
              textTransform: "none",
              fontSize: getFontSize(),
              fontWeight: "600",
              fontFamily: "Poppins, sans-serif",
              color: pestanaActiva === opcion.valor ? tipografiaColorSeleccionado : "black",
              backgroundColor: pestanaActiva === opcion.valor ? fondoSeleccionado : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              transition: "all 0.3s ease",
              padding: getPadding(),
              "&:hover": {
                backgroundColor: pestanaActiva === opcion.valor ? hoverColor : "#f5f5f5",
                color: tipografiaColorSeleccionado,
              },
              "&.Mui-selected": {
                backgroundColor: fondoSeleccionado,
                color: tipografiaColorSeleccionado,
              },
              "&.Mui-selected:hover": {
                backgroundColor: hoverColor,
                color: tipografiaColorSeleccionado,
              },
              marginRight: isWrapped ? "0" : "4px",
              marginBottom: isWrapped ? "4px" : "0",
              "&:last-child": {
                marginRight: "0",
              },
            }}
          >
            {pestanaActiva === opcion.valor && (
              <CheckIcon sx={{ fontSize: `${getIconSize()}px` }} />
            )}
            <Typography 
              fontWeight="bold"
              sx={{
                fontSize: "inherit",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.2"
              }}
            >
              {opcion.label}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SelectorPestanas;
