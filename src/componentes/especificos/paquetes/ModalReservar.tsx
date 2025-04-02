import { useState, useEffect } from "react";
import { Box, Modal, Typography, TextField, Button, Grid, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 

interface ModalReservarProps {
  open: boolean;
  onClose: () => void;
  colorPrimario: string;
  tipografia: string;
}

const ModalReservar = ({ open, onClose, colorPrimario, tipografia }: ModalReservarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [cantidadPasajeros, setCantidadPasajeros] = useState(1);
  const [indicePasajero, setIndicePasajero] = useState(0);
  const [pasajeros, setPasajeros] = useState<Array<{ nombre: string; apellido: string; email: string; telefono: string; pasaporte: string; fechaNacimiento: string; }>>([]);

  useEffect(() => {
    if (open) {
      setCantidadPasajeros(1);
      setIndicePasajero(0);
      setPasajeros(Array(1).fill({ nombre: "", apellido: "", email: "", telefono: "", pasaporte: "", fechaNacimiento: "" }));
    }
  }, [open]);

  const handleChange = (campo: string, valor: string) => {
    setPasajeros((prev) => {
      const copia = [...prev];
      copia[indicePasajero] = { ...copia[indicePasajero], [campo]: valor };
      return copia;
    });
  };

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
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* 🔹 Banner Superior */}
        <Box sx={{ 
          backgroundColor: colorPrimario, 
          color: "white", 
          padding: isMobile ? "12px" : "15px", 
          textAlign: "center", 
          fontFamily: tipografia, 
          fontSize: isMobile ? "1.1rem" : (isTablet ? "1.3rem" : "1.4rem"), 
          fontWeight: "bold", 
          borderBottom: "4px solid white" 
        }}>
          Información de los pasajeros
        </Box>

        {/* 🔹 Selección de Cantidad de Pasajeros */}
        <Box sx={{ padding: isMobile ? "15px" : "20px" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: isMobile ? "0.95rem" : "1.1rem" }}>
            Número de pasajeros
          </Typography>
          <TextField
            select
            fullWidth
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            value={cantidadPasajeros}
            onChange={(e) => {
              const nuevaCantidad = Number(e.target.value);
              setCantidadPasajeros(nuevaCantidad);
              setPasajeros((prev) => {
                const nuevaLista = [...prev];
                while (nuevaLista.length < nuevaCantidad) {
                  nuevaLista.push({ nombre: "", apellido: "", email: "", telefono: "", pasaporte: "", fechaNacimiento: "" });
                }
                return nuevaLista.slice(0, nuevaCantidad);
              });
            }}
            sx={{ 
              fontWeight: "bold", 
              border: "2px solid black",
              mt: isMobile ? 0.5 : 1
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </TextField>

          {/* 🔹 Formulario del Pasajero */}
          <Box sx={{ 
            mt: isMobile ? 2 : 3, 
            p: isMobile ? 1.5 : 2, 
            border: "2px solid black", 
            borderRadius: 3 
          }}>
            <Typography variant="h6" fontWeight="bold" sx={{ 
              textAlign: "center", 
              fontSize: isMobile ? "1rem" : "1.2rem" 
            }}>
              Pasajero {indicePasajero + 1} de {cantidadPasajeros}
            </Typography>
            <Grid container spacing={isMobile ? 1 : 2} sx={{ mt: 1 }}>
              {["nombre", "apellido", "email", "telefono", "pasaporte", "fechaNacimiento"].map((campo, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Typography variant="body1" fontWeight="bold" sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    {campo.charAt(0).toUpperCase() + campo.slice(1)}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    type={campo === "fechaNacimiento" ? "date" : "text"}
                    value={pasajeros[indicePasajero]?.[campo as keyof typeof pasajeros[0]] || ""}
                    onChange={(e) => handleChange(campo, e.target.value)}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: isMobile ? '0.875rem' : '1rem'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 🔹 Botones de Navegación */}
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            mt: isMobile ? 1.5 : 2,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 1 : 0
          }}>
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: colorPrimario, 
                color: "white", 
                fontWeight: "bold", 
                fontFamily: tipografia, 
                minWidth: isMobile ? '100%' : 160, 
                py: isMobile ? 1 : 1.2, 
                borderRadius: "8px", 
                "&:hover": { backgroundColor: "#0056b3" }, 
                fontSize: isMobile ? "0.9rem" : "1rem" 
              }}
              disabled={indicePasajero === 0}
              onClick={() => setIndicePasajero((prev) => prev - 1)}
            >
              <ArrowBackIosIcon sx={{ mr: 1, fontSize: isMobile ? "0.9rem" : "1rem" }} />
              Anterior
            </Button>

            <Button
              variant="contained"
              sx={{ 
                backgroundColor: colorPrimario, 
                color: "white", 
                fontWeight: "bold", 
                fontFamily: tipografia, 
                minWidth: isMobile ? '100%' : 160, 
                py: isMobile ? 1 : 1.2, 
                borderRadius: "8px", 
                "&:hover": { backgroundColor: "#0056b3" }, 
                fontSize: isMobile ? "0.9rem" : "1rem" 
              }}
              disabled={indicePasajero === cantidadPasajeros - 1}
              onClick={() => setIndicePasajero((prev) => prev + 1)}
            >
              Siguiente
              <ArrowForwardIosIcon sx={{ ml: 1, fontSize: isMobile ? "0.9rem" : "1rem" }} />
            </Button>
          </Box>

          {/* 🔹 Botón "Confirmar Reserva" */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: isMobile ? 2 : 3 }}>
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: colorPrimario, 
                color: "white", 
                fontWeight: "bold", 
                fontFamily: tipografia, 
                minWidth: isMobile ? '100%' : 220, 
                py: isMobile ? 1 : 1.2, 
                borderRadius: "8px", 
                fontSize: isMobile ? "1rem" : "1.2rem", 
                "&:hover": { backgroundColor: "#0056b3" } 
              }}
              onClick={() => {
                console.log("Pasajeros:", pasajeros);
                onClose();
              }}
            >
              Confirmar Reserva <CheckCircleIcon sx={{ ml: 1, fontSize: isMobile ? "1rem" : "1.2rem" }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalReservar;