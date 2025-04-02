import { Box, Modal, Typography, TextField, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

interface ModalConsultarProps {
  open: boolean;
  onClose: () => void;
  colorPrimario: string;
  tipografia: string;
}

const ModalConsultar = ({ open, onClose, colorPrimario, tipografia }: ModalConsultarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? '95%' : (isTablet ? '90%' : 600),
          maxWidth: '100%',
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: isMobile ? "20px" : "35px",
          overflow: "hidden",
        }}
      >
        {/* 🔹 Banner Superior */}
        <Box
          sx={{
            backgroundColor: colorPrimario,
            color: "white",
            padding: isMobile ? "12px" : "15px",
            textAlign: "center",
            fontFamily: tipografia,
            fontSize: isMobile ? "1rem" : "1.2rem",
            fontWeight: "bold",
          }}
        >
          Déjenos su información de contacto
        </Box>

        {/* 🔹 Formulario de Contacto */}
        <Box sx={{ padding: isMobile ? "15px" : "20px" }}>
          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="bold" fontSize={isMobile ? "0.9rem" : "1rem"}>
                Nombre y Apellido
              </Typography>
              <TextField fullWidth variant="outlined" size={isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="bold" fontSize={isMobile ? "0.9rem" : "1rem"}>
                E-mail
              </Typography>
              <TextField fullWidth variant="outlined" size={isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="bold" fontSize={isMobile ? "0.9rem" : "1rem"}>
                Teléfono
              </Typography>
              <TextField fullWidth variant="outlined" size={isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="bold" fontSize={isMobile ? "0.9rem" : "1rem"}>
                Dirección
              </Typography>
              <TextField fullWidth variant="outlined" size={isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="bold" fontSize={isMobile ? "0.9rem" : "1rem"}>
                País
              </Typography>
              <TextField fullWidth variant="outlined" size={isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="bold" fontSize={isMobile ? "0.9rem" : "1rem"}>
                Ciudad
              </Typography>
              <TextField fullWidth variant="outlined" size={isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight="bold" fontSize={isMobile ? "0.9rem" : "1rem"}>
                Comentarios
              </Typography>
              <TextField 
                fullWidth 
                variant="outlined" 
                size={isMobile ? "small" : "medium"} 
                multiline 
                rows={isMobile ? 2 : 3} 
              />
            </Grid>
          </Grid>

          {/* 🔹 Botón "Consultar" */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: isMobile ? 2 : 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colorPrimario,
                color: "white",
                fontWeight: "bold",
                fontFamily: tipografia,
                minWidth: isMobile ? 150 : 200,
                py: 1,
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
              onClick={onClose}
            >
              CONSULTAR <EmailIcon sx={{ ml: 1, fontSize: isMobile ? "1rem" : "1.2rem" }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConsultar;