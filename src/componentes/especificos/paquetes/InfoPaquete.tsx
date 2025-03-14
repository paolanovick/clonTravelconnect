import { Box, Typography, Grid, IconButton, Skeleton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface InfoPaqueteProps {
  titulo: string;
  fechaSalida: string;
  duracion: string;
  destinos: string;
  cargando?: boolean;
}

const InfoPaquete = ({ titulo, fechaSalida, duracion, destinos, cargando = false }: InfoPaqueteProps) => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {cargando ? (
          <Skeleton width="60%" height={30} />
        ) : (
          <Typography variant="h6" fontWeight="bold">
            {titulo}
          </Typography>
        )}

        <Box>
          <IconButton color="primary" size="small">
            <ShareIcon />
          </IconButton>
          <IconButton color="primary" size="small">
            <PictureAsPdfIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          {cargando ? <Skeleton width="80%" /> : <Typography variant="body2"><b>Salida:</b> {fechaSalida}</Typography>}
        </Grid>
        <Grid item xs={6}>
          {cargando ? <Skeleton width="80%" /> : <Typography variant="body2"><b>Duración:</b> {duracion}</Typography>}
        </Grid>
        <Grid item xs={12}>
          {cargando ? <Skeleton width="60%" /> : <Typography variant="body2"><b>Destinos:</b> {destinos}</Typography>}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoPaquete;
