import { FunctionComponent } from "react";
import { Stack, Button, Box } from "@mui/material";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

const menuItems = ["Nosotros", "Testimonios", "Planes", "Contacto"];

const DerechaArriba: FunctionComponent = () => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();



  /** 🔥 Definir tipografía y colores con fallback */
  const tipografia = footer?.tipografia || datosGenerales?.tipografiaAgencia || "inherit";
  const textoColor = footer?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";

  return (
    <Box sx={{ backgroundColor: "transparent", padding: 2 }}>
      <Stack direction="row" spacing={3} justifyContent="flex-end">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="text"
            sx={{
              color: textoColor,
              fontSize: 14,
              fontFamily: tipografia,
              textTransform: "none",
              "&:hover": { color: footer?.color?.secundario || datosGenerales?.color?.secundario },
            }}
          >
            {item}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default DerechaArriba;
