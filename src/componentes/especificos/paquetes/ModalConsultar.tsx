import { Box, Modal, Typography, TextField, Button, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

interface ModalConsultarProps {
  open: boolean;
  onClose: () => void;
  colorPrimario: string;
  tipografia: string;
}

const ModalConsultar = ({ open, onClose, colorPrimario, tipografia }: ModalConsultarProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: "35px",
          overflow: "hidden",
        }}
      >
        {/* 🔹 Banner Superior */}
        <Box
          sx={{
            backgroundColor: colorPrimario,
            color: "white",
            padding: "15px",
            textAlign: "center",
            fontFamily: tipografia,
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          Déjenos su información de contacto
        </Box>

        {/* 🔹 Formulario de Contacto */}
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Nombre y Apellido
              </Typography>
              <TextField fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                E-mail
              </Typography>
              <TextField fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Teléfono
              </Typography>
              <TextField fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Dirección
              </Typography>
              <TextField fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                País
              </Typography>
              <TextField fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Ciudad
              </Typography>
              <TextField fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight="bold">
                Comentarios
              </Typography>
              <TextField fullWidth variant="outlined" size="small" multiline rows={3} />
            </Grid>
          </Grid>

          {/* 🔹 Botón "Consultar" alineado al centro y con estilo del banner */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colorPrimario,
                color: "white",
                fontWeight: "bold",
                fontFamily: tipografia,
                minWidth: 200,
                py: 1,
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
              onClick={onClose}
            >
              CONSULTAR <EmailIcon sx={{ ml: 1 }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConsultar;
