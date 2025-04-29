import { Box, Typography, Skeleton, Divider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import BotonConsultar from "./BotonConsultar";
import { PaqueteData } from "../../../interfaces/tarjetasInterfaces";

interface TarifaPaqueteProps {
  tarifa: number | null | undefined;
  impuestos: number | null | undefined;
  divisa: string | null | undefined;
  total: number | null | undefined;
  wp: PaqueteData;
  cargando?: boolean;
}

const TarifaPaquete = ({ tarifa, impuestos, total, wp, divisa, cargando = false }: TarifaPaqueteProps) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  // 🔹 Colores con fallback
  const colorPrimario = tarjetas?.color?.primario || datosGenerales?.color?.primario || "#FF9800"; // Naranja
  const colorTipografia = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";

  // 🔹 Traducción de divisa a símbolo
  const traducirDivisa = (divisaRaw: string | null | undefined): string => {
    if (!divisaRaw) return "USD";
    const valor = divisaRaw.toLowerCase();
    if (valor.includes("peso")) return "ARS";
    if (valor.includes("dólar") || valor.includes("dolar")) return "USD";
    return divisaRaw.toUpperCase(); // fallback
  };

  const simboloDivisa = traducirDivisa(divisa);

  /** ✅ Evita `null` o `undefined` en los valores */
  const formatearValor = (valor: number | null | undefined) => (valor != null ? valor.toLocaleString() : "N/A");

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: colorPrimario,
        pt: 4,
        px: 3,
        pb: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 4,
        flexGrow: 1,
      }}
    >
      {cargando ? (
        <>
          <Skeleton width="80%" height={25} />
          <Skeleton width="60%" height={45} />
          <Skeleton width="70%" height={20} />
          <Skeleton width="50%" height={20} />
          <Skeleton width="80%" height={30} />
          <Skeleton width="60%" height={45} />
        </>
      ) : (
        <>
          <Box sx={{ width: "100%" }}>
            <Typography variant="body1" fontWeight="bold" sx={{ color: colorTipografia, mb: 2 }}>
              Tarifa promedio por pasajero
            </Typography>

            <Typography variant="h3" fontWeight="bold" sx={{ color: colorTipografia }}>
              {simboloDivisa} {formatearValor(tarifa)}
            </Typography>
          </Box>

          {/* 🔹 Contenedor de información */}
          <Box sx={{ width: "100%", mt: 4, flexGrow: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <MonetizationOnIcon sx={{ color: colorTipografia, mr: 1 }} />
              <Typography variant="body1" sx={{ color: colorTipografia, flexGrow: 1, textAlign: "left" }}>
                Tarifa
              </Typography>
              <Typography variant="body1" sx={{ color: colorTipografia, fontWeight: "bold" }}>
                {simboloDivisa} {formatearValor(tarifa)}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <MonetizationOnIcon sx={{ color: colorTipografia, mr: 1 }} />
              <Typography variant="body1" sx={{ color: colorTipografia, flexGrow: 1, textAlign: "left" }}>
                Impuestos
              </Typography>
              <Typography variant="body1" sx={{ color: colorTipografia, fontWeight: "bold" }}>
                {simboloDivisa} {formatearValor(impuestos)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: "#fff", width: "100%" }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <AttachMoneyIcon sx={{ color: colorTipografia, mr: 1 }} />
              <Typography variant="h6" fontWeight="bold" sx={{ color: colorTipografia, flexGrow: 1, textAlign: "left" }}>
                TOTAL
              </Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ color: colorTipografia }}>
                {simboloDivisa} {formatearValor(total)}
              </Typography>
            </Box>
          </Box>

          {/* 🔹 Botón separado con mayor margen superior */}
          <Box sx={{ mt: 4, width: "100%" }}>
            <BotonConsultar paquete={wp} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TarifaPaquete;
