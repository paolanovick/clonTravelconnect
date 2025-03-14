import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDestacadosMes } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import { ReactNode } from "react";

interface FiltroItemProps {
  label: string;
  icon: ReactNode;
}

const FiltroItem = ({ label, icon }: FiltroItemProps) => {
  const destacadosMes = useDestacadosMes();
  const datosGenerales = useDatosGenerales();

  const colorFondo = destacadosMes?.tarjetaColorSecundario || datosGenerales?.colorSecundarioAgencia;
  const colorTexto = destacadosMes?.tarjetaTipografiaColor || datosGenerales?.colorTipografiaAgencia || "inherit";

  return (
    <Accordion
      sx={{
        bgcolor: colorFondo,
        color: colorTexto,
        borderRadius: 2,
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: colorTexto }} />} sx={{ fontWeight: "bold" }}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: colorTexto }}>
          {icon} {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: colorTexto }}>Opciones del filtro "{label}" aquí...</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FiltroItem;
