import { FunctionComponent } from "react";
import { Stack, Button, Box } from "@mui/material";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

const menuItems = [
  { label: "Condiciones Generales", href: "#" },
  { label: "Botón de Arrepentimiento", href: "#" },
 
];

const DerechaAbajo: FunctionComponent = () => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  const tipografia =
    footer?.tipografia || datosGenerales?.tipografiaAgencia || "inherit";
  const textoColor =
    footer?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";
  const colorHover =
    footer?.color?.secundario || datosGenerales?.color?.secundario;

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        py: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2, md: 0 },
        width: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 1.5, md: 2 }}
        justifyContent={{ xs: "center", md: "flex-end" }}
        alignItems={{ xs: "center", md: "center" }}
        textAlign="center"
        width="100%"
      >
        {menuItems.map((item, index) => (
          <Button
            key={index}
            href={item.href}
            variant="text"
            sx={{
              color: textoColor,
              fontSize: { xs: "0.72rem", sm: "0.78rem", md: "0.82rem" },
              fontFamily: tipografia,
              textTransform: "none",
              padding: "4px 8px",
              minWidth: "auto",
              maxWidth: { xs: "100%", md: "220px" },
              width: { xs: "100%", md: "auto" },
              whiteSpace: "nowrap",
              "&:hover": {
                color: colorHover,
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default DerechaAbajo;
