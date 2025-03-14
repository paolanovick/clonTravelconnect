import { Card } from "@mui/material";
import ImagenPaquete from "./ImagenPaquete";
import InfoPaquete from "./InfoPaquete";
import TarifaPaquete from "./TarifaPaquete";
import TabsPaquete from "./TabsPaquete";

interface TarjetaPaqueteProps {
  paquete: {
    id: string;
    titulo: string;
    imagen: string;
    fechaSalida: string;
    duracion: string;
    destinos: string;
    tarifa: number;
    impuestos: number;
    total: number;
  };
  cargando?: boolean;
}

const TarjetaPaquete = ({ paquete, cargando = false }: TarjetaPaqueteProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        borderRadius: 3,
        overflow: "visible", // 🔹 Evita que los contenidos internos se corten
        boxShadow: 4,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.01)", boxShadow: 6 }, // 🔹 Reduje el efecto de hover
        bgcolor: "background.paper",
        minWidth: 280, // 🔹 Asegura que las tarjetas tengan un tamaño mínimo
        maxWidth: 400, // 🔹 Controla el tamaño máximo de las tarjetas
        flexShrink: 0, // 🔹 Evita que se encojan inesperadamente
      }}
    >
      <ImagenPaquete imagen={paquete.imagen} cargando={cargando} />
      <InfoPaquete
        titulo={paquete.titulo}
        fechaSalida={paquete.fechaSalida}
        duracion={paquete.duracion}
        destinos={paquete.destinos}
        cargando={cargando}
      />
      <TarifaPaquete tarifa={paquete.tarifa} impuestos={paquete.impuestos} total={paquete.total} cargando={cargando} />
      <TabsPaquete />
    </Card>
  );
};

export default TarjetaPaquete;
