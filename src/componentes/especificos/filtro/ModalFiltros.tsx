import {
    Box,
    Modal,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
  import FiltroRango from "./FiltroRango";
  import FiltroMultiple from "./FiltroMultiple";
  import FiltroBooleano from "./FiltroBooleano";
  
  interface ModalFiltrosProps {
    open: boolean;
    onClose: () => void;
  }
  
  const ModalFiltros = ({ open, onClose }: ModalFiltrosProps) => {
    const tarjetas = useTarjetas();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    const tipografia = tarjetas?.tipografia || "Verdana, sans-serif";
    const colorPrimario = tarjetas?.color.primario || "#1976d2";
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : "700px",
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "#fff",
            borderRadius: 4,
            boxShadow: 24,
            p: isMobile ? 2 : 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontFamily: tipografia, fontWeight: "bold", color: "#333" }}
            >
              Filtrar Resultados
            </Typography>
            <IconButton onClick={onClose} sx={{ color: colorPrimario }}>
              <CloseIcon />
            </IconButton>
          </Box>
  
          {/* Rango */}
          <FiltroRango label="Precio (USD)" campo="precio" min={0} max={10000} />
          <FiltroRango label="Duración (noches)" campo="duracion" min={1} max={30} />
          <FiltroRango label="Estrellas del hotel" campo="estrellas" min={1} max={5} />
  
          {/* Múltiples */}
          <FiltroMultiple label="Ciudades" campo="ciudades" opciones={[]} />
          <FiltroMultiple label="Hoteles" campo="hoteles" opciones={[]} />
          <FiltroMultiple label="Régimen" campo="regimenes" opciones={[]} />
          <FiltroMultiple label="Habitaciones" campo="habitaciones" opciones={["single", "doble", "triple", "cuadruple", "familia_1", "familia_2"]} />
          <FiltroMultiple label="Servicios incluidos" campo="serviciosIncluidos" opciones={[]} />
          <FiltroMultiple label="Aerolíneas" campo="aerolineas" opciones={[]} />
          <FiltroMultiple label="Ciudad Origen Vuelo" campo="ciudadesOrigenVuelo" opciones={[]} />
          <FiltroMultiple label="Ciudad Destino Vuelo" campo="ciudadesDestinoVuelo" opciones={[]} />
          <FiltroMultiple label="Tipo de moneda" campo="tipoMoneda" opciones={["Dolar", "Pesos", "Euro"]} />
  
          {/* Booleano */}
          <FiltroBooleano label="Disponible para venta online" campo="ventaOnline" />
        </Box>
      </Modal>
    );
  };
  
  export default ModalFiltros;
  