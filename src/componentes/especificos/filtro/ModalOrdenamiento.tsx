import {
    Box,
    Modal,
    Typography,
    Button,
    Grid,
    useMediaQuery,
    useTheme,
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from "@mui/material";
  import SortIcon from "@mui/icons-material/Sort";
  import { useState } from "react";
  
  interface ModalOrdenamientoProps {
    open: boolean;
    onClose: () => void;
    colorPrimario: string;
    tipografia: string;
    onAplicar: (criterio: string, orden: "asc" | "desc") => void;
  }
  
  const ModalOrdenamiento = ({
    open,
    onClose,
    colorPrimario,
    tipografia,
    onAplicar
  }: ModalOrdenamientoProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
    const [criterio, setCriterio] = useState("precio");
    const [orden, setOrden] = useState<"asc" | "desc">("asc");
  
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
            Ordenar paquetes
          </Box>
  
          {/* 🔹 Contenido */}
          <Box sx={{ padding: isMobile ? "15px" : "20px" }}>
            <Grid container spacing={isMobile ? 1 : 2}>
              {/* Criterio de orden */}
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  fontSize={isMobile ? "0.9rem" : "1rem"}
                  sx={{ fontFamily: tipografia }}
                >
                  Criterio
                </Typography>
                <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                  <InputLabel>Criterio</InputLabel>
                  <Select
                    value={criterio}
                    onChange={(e) => setCriterio(e.target.value)}
                    label="Criterio"
                  >
                    <MenuItem value="precio">Precio</MenuItem>
                    <MenuItem value="salida">Fecha de salida</MenuItem>
                    <MenuItem value="nombre">Nombre</MenuItem>
                    <MenuItem value="duracion">Duración</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              {/* Orden asc/desc */}
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  fontSize={isMobile ? "0.9rem" : "1rem"}
                  sx={{ fontFamily: tipografia }}
                >
                  Orden
                </Typography>
                <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                  <InputLabel>Orden</InputLabel>
                  <Select
                    value={orden}
                    onChange={(e) => setOrden(e.target.value as "asc" | "desc")}
                    label="Orden"
                  >
                    <MenuItem value="asc">Ascendente</MenuItem>
                    <MenuItem value="desc">Descendente</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
  
            {/* 🔹 Botón aplicar */}
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
                onClick={() => {
                  onAplicar(criterio, orden);
                  onClose();
                }}
              >
                APLICAR <SortIcon sx={{ ml: 1, fontSize: isMobile ? "1rem" : "1.2rem" }} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default ModalOrdenamiento;
  