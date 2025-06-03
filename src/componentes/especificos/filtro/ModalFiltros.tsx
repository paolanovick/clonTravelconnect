import {
  Box,
  Modal,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import FiltroRango from "./FiltroRango";
import FiltroMultiple from "./FiltroMultiple";
import FiltroBooleano from "./FiltroBooleano";
import { useFiltrosYOrdenamiento } from "../../../contextos/FiltrosYOrdenamientoContext";
import { filtrosIniciales } from "../../../contextos/FiltrosYOrdenamientoContext"; // asegúrate que sea exportado
import { Filtros } from "../../../contextos/FiltrosYOrdenamientoContext";
import { useState, useEffect } from "react";

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

  const { filtros: filtrosGlobal, setFiltros } = useFiltrosYOrdenamiento();
  const [filtrosLocales, setFiltrosLocales] = useState<Filtros>(filtrosIniciales);

  // Al abrir el modal, sincronizar estado local con el contexto
  useEffect(() => {
    if (open) setFiltrosLocales(filtrosGlobal);
  }, [open]);

  const handleAplicarFiltros = () => {
    setFiltros(filtrosLocales);
    onClose();
  };

  const handleReiniciar = () => {
    setFiltrosLocales(filtrosIniciales);
  };

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

        {/* Filtros */}
        <FiltroRango label="Precio (USD)" campo="precio" min={0} max={10000} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroRango label="Duración (noches)" campo="duracion" min={1} max={30} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroRango label="Estrellas del hotel" campo="estrellas" min={1} max={5} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />

        <FiltroMultiple label="Ciudades" campo="ciudades" opciones={[]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroMultiple label="Hoteles" campo="hoteles" opciones={[]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroMultiple label="Régimen" campo="regimenes" opciones={[]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroMultiple label="Habitaciones" campo="habitaciones" opciones={["single", "doble", "triple", "cuadruple", "familia_1", "familia_2"]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroMultiple label="Servicios incluidos" campo="serviciosIncluidos" opciones={[]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroMultiple label="Aerolíneas" campo="aerolineas" opciones={[]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroMultiple label="Ciudad Origen Vuelo" campo="ciudadesOrigenVuelo" opciones={[]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroMultiple label="Ciudad Destino Vuelo" campo="ciudadesDestinoVuelo" opciones={[]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />
        <FiltroMultiple label="Tipo de moneda" campo="tipoMoneda" opciones={["Dolar", "Pesos", "Euro"]} filtros={filtrosLocales} setFiltros={setFiltrosLocales} />

        <FiltroBooleano label="Disponible para venta online" campo="ventaOnline" filtros={filtrosLocales} setFiltros={setFiltrosLocales} />

        {/* Botones */}
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button variant="outlined" onClick={handleReiniciar}>
            Reiniciar filtros
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: colorPrimario }}
            onClick={handleAplicarFiltros}
          >
            Filtrar paquetes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalFiltros;
