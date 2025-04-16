import { useState } from "react";
import { Button, IconButton, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PopperOpciones from "./PopperOpciones";
import ModalConsultar from "./ModalConsultar";
import ModalReservar from "./ModalReservar";
import { useTarjetas, useFooter} from "../../../contextos/DatosAgenciaContext"; // Ajustá el path si es necesario
import { PaqueteData } from "../../../interfaces/tarjetasInterfaces";

interface BotonConsultarProps {
  tipografia?: string;
  paquete?: PaqueteData;
}

const BotonConsultar = ({ tipografia = "Arial" ,paquete}: BotonConsultarProps) => {
  const tarjeta = useTarjetas();
  const footer = useFooter();
  

  const colorPrimario = tarjeta?.color?.primario || "#1976d2";
  const colorSecundario = tarjeta?.color?.secundario || "#FBC02D"; // ✅ agregado color secundario
  const colorFlechaHover = colorSecundario;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string>("WhatsApp");
  const [openModalConsultar, setOpenModalConsultar] = useState(false);
  const [openModalReservar, setOpenModalReservar] = useState(false);

  const openPopper = Boolean(anchorEl);

  const handleSelect = (opcion: string) => {
    setOpcionSeleccionada(opcion);
    setAnchorEl(null);
  };
  
const handleClickBoton = () => {
  const opcion = opcionSeleccionada.toLowerCase();

  if (opcion === "whatsapp") {
    const nombrePaquete = paquete?.titulo;  // Reemplaza con el nombre real del paquete
    const idPaquete = paquete?.id;          // Reemplaza con el ID real del paquete
    const operador = paquete?.usuario;      // Reemplaza con el operador real

    const mensaje = `Me gustaría conocer más acerca del paquete “${nombrePaquete}” (ID: ${idPaquete}) ofrecido a través de ${operador}.`;
    const encodedMessage = encodeURIComponent(mensaje);

    const numeroWhatsapp = footer?.redes?.whatsapp?.replace(/[^0-9]/g, '');

    if (numeroWhatsapp) {
      window.open(`https://wa.me/${numeroWhatsapp}?text=${encodedMessage}`, "_blank");
    } else {
      console.warn("Número de WhatsApp no disponible en footer.redes.whatsapp");
    }
  } else if (opcion === "consultar") {
    setOpenModalConsultar(true);
  } else if (opcion === "reservar") {
    setOpenModalReservar(true);
  }
};
  

  const tipo = opcionSeleccionada.toLowerCase();
  const esWhatsApp = tipo === "whatsapp";
  const esConsultarOReservar = tipo === "consultar" || tipo === "reservar";

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
            backgroundColor: esWhatsApp
              ? "#fff"
              : esConsultarOReservar
              ? colorSecundario
              : "#FBC02D", // fallback
            color: esWhatsApp
              ? "#25D366"
              : esConsultarOReservar
              ? "#fff"
              : "#fff",
            boxShadow: esWhatsApp ? "inset 0 0 0 3px #25D366" : "none",
          },
        }}
      >
        {esWhatsApp ? (
          <Box
            component={WhatsAppIcon}
            sx={{
              color: "#fff",
              transition: "color 0.3s ease-in-out",
              [`button:hover &`]: {
                color: "#25D366",
              },
            }}
          />
        ) : (
          opcionSeleccionada
        )}
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
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: colorFlechaHover,
            opacity: 1,
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
          },
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

      <ModalConsultar
        open={openModalConsultar}
        onClose={() => setOpenModalConsultar(false)}
        colorPrimario={colorPrimario}
        tipografia={tipografia}
      />

      <ModalReservar
        open={openModalReservar}
        onClose={() => setOpenModalReservar(false)}
        colorPrimario={colorPrimario}
        tipografia={tipografia}
      />
    </Box>
  );
};

export default BotonConsultar;
