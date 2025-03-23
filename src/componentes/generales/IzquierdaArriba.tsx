import { FunctionComponent } from "react";
import { Stack, Typography, Box } from "@mui/material";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

interface IzquierdaArribaProps {
  logo: string | null;
}

const IzquierdaArriba: FunctionComponent<IzquierdaArribaProps> = ({ logo }) => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  if (!footer || !datosGenerales) return null;

  /** 🔥 Definir tipografía, colores y fondo con fallback */
  const tipografia = footer.tipografia || datosGenerales.tipografiaAgencia || "inherit";
  const textoColor = footer.tipografiaColor || datosGenerales.colorTipografiaAgencia || "#FFFFFF";
  const textoFooter =
    footer.texto ||
    "Somos una agencia especializada en brindar soluciones digitales y estrategias innovadoras para potenciar tu negocio.";

  return (
    <Stack
      spacing={2}
      sx={{
        backgroundColor: "transparent", // 🔥 Fondo completamente transparente
        padding: 2,
        borderRadius: 2,
      }}
    >
      {logo && (
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ width: 120, height: "auto" }}
        />
      )}
      <Typography
        variant="body2"
        sx={{
          maxWidth: 350,
          color: textoColor,
          fontFamily: tipografia,
        }}
      >
        {textoFooter}
      </Typography>
    </Stack>
  );
};

export default IzquierdaArriba;
