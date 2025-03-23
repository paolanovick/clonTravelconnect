import { Box, Typography, Grid, IconButton, Skeleton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

interface InfoPaqueteProps {
  titulo: string;
  fechaSalida: string;
  duracion: string;
  regimen: string;
  destinos: string;
  cargando?: boolean;
}

const InfoPaquete = ({ titulo, fechaSalida, duracion, regimen, destinos, cargando = false }: InfoPaqueteProps) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  const tipografia = tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";
  const colorTipografia = tarjetas?.tipografiaColorContenido || datosGenerales?.colorTipografiaAgencia || "#000";
  const colorFondo = "transparent";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%", // 🔥 Se adapta completamente al contenedor padre
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        pt: 4, // 🔥 Mantiene espaciado superior
        px: 0, // 🔹 Espaciado lateral
        backgroundColor: colorFondo,
        flexGrow: 1, // 🔥 Se ajusta al tamaño disponible
      }}
    >
      {/* 🔹 Contenedor de Título y Botones */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexGrow: 1, // 🔥 Se adapta al tamaño del padre
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
            sx={{
              fontFamily: tipografia,
              color: colorTipografia,
              mt: 1, // 🔥 Ajuste menor para un mejor equilibrio
            }}
          >
            {titulo}
          </Typography>
        )}

        {/* 🔹 Botones de acción */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center", // 🔥 Asegura que los botones estén bien alineados
          }}
        >
          <IconButton color="primary" size="small">
            <ShareIcon />
          </IconButton>
          <IconButton color="primary" size="small">
            <PictureAsPdfIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 🔹 Detalles del paquete (Alineados correctamente) */}
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%", // 🔹 Se adapta al tamaño del contenedor padre
          maxWidth: "400px",
          flexGrow: 1, // 🔥 Se ajusta al espacio disponible
          justifyContent: "center", // 🔥 Centra los elementos en el grid
          alignItems: "center", // 🔥 Asegura que todos los ítems estén alineados verticalmente
        }}
      >
        <Grid item xs={6} sx={{ textAlign: "center" }}> {/* 🔥 Asegura alineación del texto */}
          {cargando ? (
            <Skeleton width="80%" />
          ) : (
            <Typography variant="body2" sx={{ fontFamily: tipografia, color: colorTipografia }}>
              <b>Salida:</b> {fechaSalida}
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          {cargando ? (
            <Skeleton width="80%" />
          ) : (
            <Typography variant="body2" sx={{ fontFamily: tipografia, color: colorTipografia }}>
              <b>Regimen:</b> {regimen}
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          {cargando ? (
            <Skeleton width="80%" />
          ) : (
            <Typography variant="body2" sx={{ fontFamily: tipografia, color: colorTipografia }}>
              <b>Duración:</b> {duracion}
            </Typography>
          )}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          {cargando ? (
            <Skeleton width="80%" />
          ) : (
            <Typography variant="body2" sx={{ fontFamily: tipografia, color: colorTipografia }}>
              <b>Destinos:</b> {destinos}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoPaquete;
