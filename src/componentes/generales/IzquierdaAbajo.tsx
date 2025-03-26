import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

interface IzquierdaAbajoProps {
  year: number;
}

const IzquierdaAbajo: FunctionComponent<IzquierdaAbajoProps> = ({ year }) => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  const tipografia =
    footer?.tipografia || datosGenerales?.tipografiaAgencia || "inherit";
  const textoColor =
    footer?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#FFFFFF";

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
    >
      <Typography
        variant="caption"
        sx={{ color: textoColor, fontFamily: tipografia }}
      >
        © {year} — Todos los derechos reservados.
      </Typography>
    </Stack>
  );
};

export default IzquierdaAbajo;
