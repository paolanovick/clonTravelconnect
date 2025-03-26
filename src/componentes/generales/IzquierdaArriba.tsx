import { FunctionComponent } from "react";
import { Stack, Typography, Box } from "@mui/material";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

interface IzquierdaArribaProps {
  logo: string | null;
}

const IzquierdaArriba: FunctionComponent<IzquierdaArribaProps> = ({ logo }) => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  const tipografia = footer?.tipografia || datosGenerales?.tipografiaAgencia || "inherit";
  const textoColor = footer?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";
  const textoFooter =
    footer?.texto || "© 2025 Citrus Energía - Todos los derechos reservados";

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center" // ✅ Alinea el texto con el centro del logo
      justifyContent="flex-start"
      sx={{
        backgroundColor: "transparent",
        borderRadius: 0,
        width: "100%",
        m: 0,
        p: 0,
      }}
    >
      {logo && (
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: 300,
            maxHeight: 400,
            objectFit: "contain",
            display: "block",
          }}
        />
      )}
      <Typography
        variant="body2"
        sx={{
          color: textoColor,
          fontFamily: tipografia,
          lineHeight: 1.6,
        }}
      >
        {textoFooter}
      </Typography>
    </Stack>
  );
};

export default IzquierdaArriba;
