import { useState } from "react";
import { Button, IconButton, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PopperOpciones from "./PopperOpciones";
import ModalConsultar from "./ModalConsultar";
import ModalReservar from "./ModalReservar";

interface BotonConsultarProps {
  colorPrimario: string;
  tipografia?: string;
}

const BotonConsultar = ({ colorPrimario, tipografia = "Arial" }: BotonConsultarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string>("Consultar"); 
  const [openModalConsultar, setOpenModalConsultar] = useState(false);
  const [openModalReservar, setOpenModalReservar] = useState(false);

  const openPopper = Boolean(anchorEl);

  const handleSelect = (opcion: string) => {
    setOpcionSeleccionada(opcion);
    setAnchorEl(null);
  };

  const handleClickBoton = () => {
    if (opcionSeleccionada.toLowerCase() === "whatsapp") {
      window.open("https://wa.me/123456789", "_blank");
    } else if (opcionSeleccionada.toLowerCase() === "consultar") {
      setOpenModalConsultar(true);
    } else if (opcionSeleccionada.toLowerCase() === "reservar") {
      setOpenModalReservar(true);
    }
  };

  const esWhatsApp = opcionSeleccionada.toLowerCase() === "whatsapp";
  const botonColor = esWhatsApp ? "#25D366" : "#fff"; 
  const textoColor = esWhatsApp ? "#fff" : colorPrimario;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Button
        variant="contained"
        onClick={handleClickBoton}
        sx={{
          backgroundColor: botonColor,
          color: textoColor,
          fontWeight: "bold",
          borderRadius: 3,
          width: "100%",
          py: 1.2,
          fontSize: "1rem",
          position: "relative",
          boxShadow: esWhatsApp ? "inset 0 0 0 3px white" : "none",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: esWhatsApp ? "#fff" : "#FBC02D",
            color: esWhatsApp ? "#25D366" : "#fff",
            boxShadow: esWhatsApp ? "inset 0 0 0 3px #25D366" : "none",
          },
        }}
      >
        {opcionSeleccionada}
      </Button>

      <IconButton
        onClick={(e) => setAnchorEl(openPopper ? null : e.currentTarget)}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: colorPrimario,
          color: "#fff",
          width: 32,
          height: 32,
          "&:hover": { backgroundColor: "#FBC02D" },
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>

      <PopperOpciones
        open={openPopper}
        anchorEl={anchorEl}
        handleSelect={handleSelect}
        colorPrimario={colorPrimario}
        tipografia={tipografia}
      />

      {/* 🔹 Modal de Consultar */}
      <ModalConsultar open={openModalConsultar} onClose={() => setOpenModalConsultar(false)} colorPrimario={colorPrimario} tipografia={tipografia} />

      {/* 🔹 Modal de Reservar */}
      <ModalReservar open={openModalReservar} onClose={() => setOpenModalReservar(false)} colorPrimario={colorPrimario} tipografia={tipografia} />
    </Box>
  );
};

export default BotonConsultar;
