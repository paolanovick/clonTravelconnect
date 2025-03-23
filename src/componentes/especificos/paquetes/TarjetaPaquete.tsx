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
  console.log("🔍 Datos del paquete recibido en TarjetaPaquete:", paquete); // ✅ Depuración

  // 🔥 Colores dinámicos desde el contexto
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const colorFondo = tarjetas?.color.secundario || datosGenerales?.color.secundario || "#f5f5f5";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column", // 🔥 Mantiene la estructura en columna
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
      {/* 🔹 Contenedor principal: 3 subcomponentes en fila */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexGrow: 1,
          height: "auto", // 🔥 Permite que la tarjeta crezca según su contenido
        }}
      >
        {/* 🔹 Imagen (Ahora más ancha) */}
        <Box
          sx={{
            flex: 1.5, // 🔥 Más espacio para la imagen
            display: "flex",
            height: "100%",
          }}
        >
          <ImagenPaquete imagen={paquete.imagen || "/imagenes/default-image.jpg"} cargando={cargando} />
        </Box>

        {/* 🔹 InfoPaquete (Reducido) */}
        <Box
          sx={{
            flex: 1.5, // 🔥 Se reduce el espacio de InfoPaquete
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            px: 2, // 🔹 Espaciado interno
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

        {/* 🔹 TarifaPaquete (Mismo ancho, sin desbordar) */}
        <Box
          sx={{
            flex: 1, // 🔥 Mantiene su tamaño sin desbordar
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // 🔥 Centrado total
            justifyContent: "center",
            height: "100%",
            px: 2, // 🔹 Espaciado interno
            minWidth: "250px", // 🔹 Evita que se haga demasiado angosto
            flexShrink: 1, // 🔹 Permite que se reduzca sin desbordar
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

      {/* 🔹 Tabs (Siempre abajo, sin desbordes) */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "auto", // 🔥 Se asegura de que las tabs estén siempre al fondo
        }}
      >
        <TabsPaquete />
      </Box>
    </Card>
  );
};

export default TarjetaPaquete;
