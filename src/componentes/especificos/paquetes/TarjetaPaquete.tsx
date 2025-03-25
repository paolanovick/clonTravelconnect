import { Card, Box } from "@mui/material";
import ImagenPaquete from "./ImagenPaquete";
import InfoPaquete from "./InfoPaquete";
import TarifaPaquete from "./TarifaPaquete";
import TabsPaquete from "./TabsPaquete";
import { useTarjetas } from "../../../contextos/DatosAgenciaContext";
import { useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

interface TarjetaPaqueteProps {
  paquete: {
    id: string;
    titulo: string;
    imagen: string;
    fechaSalida: string;
    duracion: string;
    regimen: string;
    destinos: string;
    tarifa: number | null | undefined;
    impuestos: number | null | undefined;
    total: number | null | undefined;
  };
  cargando?: boolean;
}

const TarjetaPaquete = ({ paquete, cargando = false }: TarjetaPaqueteProps) => {
  console.log("🔍 Datos del paquete recibido en TarjetaPaquete:", paquete);

  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const colorFondo = tarjetas?.color?.secundario || datosGenerales?.color?.secundario || "#f5f5f5";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 4,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.01)", boxShadow: 6 },
        bgcolor: colorFondo,
        width: "100%",
        flexGrow: 1,
        height: "100%",
        position: "relative",
      }}
    >
      {/* 🔝 Tabs en la parte superior */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <TabsPaquete />
      </Box>

      {/* 🔹 Contenido principal de la tarjeta */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexGrow: 1,
          height: "auto",
        }}
      >
        {/* Imagen del paquete */}
        <Box
          sx={{
            flex: 1.5,
            display: "flex",
            height: "100%",
          }}
        >
          <ImagenPaquete imagen={paquete.imagen || "/imagenes/default-image.jpg"} cargando={cargando} />
        </Box>

        {/* Información del paquete */}
        <Box
          sx={{
            flex: 1.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            px: 2,
          }}
        >
          <InfoPaquete
            titulo={paquete.titulo || "Título no disponible"}
            fechaSalida={paquete.fechaSalida || "Fecha no disponible"}
            duracion={paquete.duracion || "Duración no disponible"}
            regimen={paquete.regimen || "Según Itinerario"}
            destinos={paquete.destinos || "Destino no disponible"}
            cargando={cargando}
          />
        </Box>

        {/* Tarifa y precio */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            px: 2,
            minWidth: "250px",
            flexShrink: 1,
          }}
        >
          <TarifaPaquete
            tarifa={paquete.tarifa !== undefined ? paquete.tarifa : null}
            impuestos={paquete.impuestos !== undefined ? paquete.impuestos : null}
            total={paquete.total !== undefined ? paquete.total : null}
            cargando={cargando}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default TarjetaPaquete;
