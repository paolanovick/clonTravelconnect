import React, { useState, useEffect } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useBuscador, useDatosGenerales } from "../../../../contextos/agencia/DatosAgenciaContext";
import CheckIcon from "@mui/icons-material/Check";

const SelectorPestanas: React.FC = () => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery("(max-width:400px)");
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();

  const [pestanaActiva, setPestanaActiva] = useState("paquetes");
  const [isWrapped, setIsWrapped] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(5);

  const esVaguViajes =
    typeof window !== "undefined" &&
    window.location.hostname.includes("vaguviajes.tur.ar");

  const getTabSize = () => {
    if (isExtraSmall) return 90;
    if (isSmall) return 110;
    if (isMedium) return 130;
    return 150;
  };

  const getFontSize = () => {
    if (isExtraSmall) return "0.75rem";
    if (isSmall) return "0.8125rem";
    return "0.875rem";
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
      const container = document.getElementById("tabs-container");
      if (container) {
        const children = Array.from(container.children);
        if (children.length > 0) {
          const firstChildTop = children[0].getBoundingClientRect().top;
          const isAnyChildWrapped = children.some(
            (child) => child.getBoundingClientRect().top > firstChildTop
          );
          setIsWrapped(isAnyChildWrapped);

          const containerWidth = container.clientWidth;
          const calculatedItemsPerRow = Math.max(
            1,
            Math.floor(containerWidth / (getTabSize() + 8))
          );
          setItemsPerRow(calculatedItemsPerRow);
        }
      }
    };

    checkIfWrapped();
    window.addEventListener("resize", checkIfWrapped);
    return () => window.removeEventListener("resize", checkIfWrapped);
  }, [datosGenerales, isExtraSmall, isSmall, isMedium]);

  if (!datosGenerales) return null;

  // 🎯 Estilos desde el Buscador (con fallbacks)
  const tipografia =
    buscador?.tipografia || datosGenerales.tipografiaAgencia || "Poppins, sans-serif";

  const colorTexto =
    buscador?.tipografiaColor || datosGenerales.colorTipografiaAgencia || "black";

  const fondoBase =
    buscador?.inputFondoColor ||
    buscador?.color?.terciario ||
    "#ffffff";

  const fondoSeleccionado =
    buscador?.color?.secundario ||
    datosGenerales?.color?.secundario ||
    "#D1E3FF";

  const hoverColorPrimario =
    buscador?.color?.primario ||
    datosGenerales?.color?.primario ||
    "#0056b3";

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
        {opciones.map((opcion, index) => {
          const isSelected = pestanaActiva === opcion.valor;

          const commonStyles = {
            flex: isWrapped ? `0 0 ${getTabSize()}px` : 1,
            minWidth: `${getTabSize()}px`,
            height: "44px",
            borderRadius: getBorderRadius(index),
            textTransform: "none" as const,
            fontSize: getFontSize(),
            fontWeight: 600,
            fontFamily: tipografia,
            color: isSelected ? colorTexto : colorTexto,
            backgroundColor: isSelected ? fondoSeleccionado : fondoBase,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            transition: "all 0.3s ease",
            padding: getPadding(),
            "&:hover": {
              backgroundColor: isSelected ? hoverColorPrimario : `${hoverColorPrimario}14`,
              color: colorTexto,
            },
            marginRight: isWrapped ? "0" : "4px",
            marginBottom: isWrapped ? "4px" : "0",
            "&:last-child": { marginRight: 0 },
          };

          if (opcion.valor === "circuitos" && esVaguViajes) {
            return (
              <Box
                key={opcion.valor}
                component="a"
                href="https://incomtour.com.ar/whitelabel/?token=5872a6367a276526266e477bd2a9844f"
                sx={{ ...commonStyles, textDecoration: "none" }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{
                    fontSize: "inherit",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "1.2",
                  }}
                >
                  {opcion.label}
                </Typography>
              </Box>
            );
          }

          return (
            <ToggleButton key={opcion.valor} value={opcion.valor} sx={commonStyles}>
              {isSelected && <CheckIcon sx={{ fontSize: `${getIconSize()}px` }} />}
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: "inherit",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: "1.2",
                }}
              >
                {opcion.label}
              </Typography>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SelectorPestanas;
