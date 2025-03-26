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
    <Box sx={{ backgroundColor: "transparent", p: 2 }}>
      <Stack direction="row" spacing={3} justifyContent="flex-end">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            href={item.href}
            variant="text"
            sx={{
              color: textoColor,
              fontSize: 14,
              fontFamily: tipografia,
              textTransform: "none",
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
