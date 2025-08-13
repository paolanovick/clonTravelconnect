import React from "react";
import { Box, Typography, Grid, IconButton, Skeleton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useTarjetas, useDatosGenerales } from "../../contextos/agencia/DatosAgenciaContext";
import ModalCompartir from "./ModalCompartir";

interface InfoPaqueteProps {
  idPaquete: number; // ✅ coincide con PaqueteData.id
  titulo: string;
  fechaSalida: string;
  duracion: string;
  regimen: string;
  destinos: string;
  cargando?: boolean;
}

const InfoPaquete: React.FC<InfoPaqueteProps> = ({
  idPaquete,
  titulo,
  duracion,
  regimen,
  destinos,
  cargando = false,
}) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const [openModalCompartir, setOpenModalCompartir] = React.useState(false);

  const tipografia =
    tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";
  const colorTipografia =
    tarjetas?.tipografiaColorContenido ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000";
  const colorFondo = "transparent";

  // ✅ Mostrar "Consultar" si no hay duración válida
  const duracionTexto =
    !duracion || duracion.trim() === "" ? "Consultar" : duracion;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        pt: 4,
        px: 0,
        backgroundColor: colorFondo,
        flexGrow: 1,
      }}
    >
      {/* Título + acciones */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexGrow: 1,
          gap: 1.5,
          mb: 2,
        }}
      >
        {cargando ? (
          <Skeleton width="60%" height={30} />
        ) : (
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontFamily: tipografia, color: colorTipografia, mt: 1 }}
          >
            {titulo}
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpenModalCompartir(true)}
            aria-label="Compartir paquete"
          >
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Detalles */}
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "400px",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          {cargando ? (
            <Skeleton width="80%" />
          ) : (
            <Typography
              variant="body2"
              sx={{ fontFamily: tipografia, color: colorTipografia }}
            >
              <b>Régimen:</b> {regimen}
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          {cargando ? (
            <Skeleton width="80%" />
          ) : (
            <Typography
              variant="body2"
              sx={{ fontFamily: tipografia, color: colorTipografia }}
            >
              <b>Duración:</b> {duracionTexto}
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          {cargando ? (
            <Skeleton width="80%" />
          ) : (
            <Typography
              variant="body2"
              sx={{ fontFamily: tipografia, color: colorTipografia }}
            >
              <b>Destinos:</b> {destinos}
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Modal Compartir */}
      {openModalCompartir && (
        <ModalCompartir
          open={openModalCompartir}
          onClose={() => setOpenModalCompartir(false)}
          paqueteId={idPaquete}
        />
      )}
    </Box>
  );
};

export default InfoPaquete;
