import { Box, Typography, Button, Skeleton } from "@mui/material";
import { useDestacadosMes } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

interface TarifaPaqueteProps {
  tarifa: number;
  impuestos: number;
  total: number;
  cargando?: boolean;
}

const TarifaPaquete = ({ tarifa, impuestos, total, cargando = false }: TarifaPaqueteProps) => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();

  const colorPrimario = destacadosMes?.tarjetaColorPrimario || datosGenerales?.colorPrincipalAgencia;
  const colorSecundario = destacadosMes?.tarjetaColorSecundario || datosGenerales?.colorSecundarioAgencia;
  const colorTipografia = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 220 },
        bgcolor: colorSecundario,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {cargando ? (
        <>
          <Skeleton width="60%" height={30} />
          <Skeleton width="100%" height={40} />
        </>
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold" sx={{ color: colorTipografia }}>
            USD {tarifa.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ color: colorTipografia }}>
            Tarifa: USD {tarifa.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ color: colorTipografia }}>
            Impuestos: USD {impuestos.toLocaleString()}
          </Typography>
          <Typography variant="body2" fontWeight="bold" sx={{ color: colorTipografia }}>
            TOTAL: USD {total.toLocaleString()}
          </Typography>
          <Button variant="outlined" fullWidth sx={{ mt: 2, color: colorPrimario, borderColor: colorPrimario }}>
            Consultar
          </Button>
        </>
      )}
    </Box>
  );
};

export default TarifaPaquete;
