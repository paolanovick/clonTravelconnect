import React, { useState } from "react";
import { Card, Box } from "@mui/material";
import ImagenPaquete from "./ImagenPaquete";
import InfoPaquete from "./InfoPaquete";
import TarifaPaquete from "./TarifaPaquete";
import TabsPaquete from "./TabsPaquete";
import ExpansionContainer from "./ExpansionContainer";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

// Importamos los componentes de contenido para cada pestaña
import HotelesContent from "./HotelesContent";
import DescripcionContent from "./DescripcionContent";
import SalidasContent from "./SalidasContent";
import TransporteContent from "./TransporteContent";

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

    hoteles?: {
      hotel: {
        nombre: string;
        id_hotel: string;
        categoria_hotel: string;
      };
    };
    descripcion?: string | null;
    salidas?: Array<{
      id: number;
      paquete_id: number;
      fecha_desde: string | null;
      fecha_hasta: string | null;
      fecha_viaje?: string;
      single_precio?: number;
      single_impuesto?: number;
      single_otro?: number;
      single_otro2?: number;
      doble_precio?: number;
      doble_impuesto?: number;
      doble_otro?: number;
      doble_otro2?: number;
      triple_precio?: number;
      triple_impuesto?: number;
      triple_otro?: number;
      triple_otro2?: number;
      cuadruple_precio?: number;
      cuadruple_impuesto?: number;
      cuadruple_otro?: number;
      cuadruple_otro2?: number;
    }>;
    transporte?: string;
  };
  cargando?: boolean;
}

const TarjetaPaquete: React.FC<TarjetaPaqueteProps> = ({ paquete, cargando = false }) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const colorFondo = tarjetas?.color?.secundario || datosGenerales?.color?.secundario || "#f5f5f5";

  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [expansionOpen, setExpansionOpen] = useState<boolean>(false);

  const handleTabChange = (tabIndex: number, open: boolean) => {
    setSelectedTab(tabIndex);
    setExpansionOpen(open);
  };

  const renderExpansionContent = () => {
    switch (selectedTab) {
      case 0:
        return <HotelesContent hoteles={paquete.hoteles} />;
      case 1:
        return <DescripcionContent descripcion={paquete.descripcion} />;
      case 2:
        return (
          <SalidasContent
            salidas={paquete.salidas}
            fechaSalida={paquete.salidas?.[0]?.fecha_viaje || "Fecha no disponible"}
          />
        );
      case 3:
        return <TransporteContent transporte={paquete.transporte} />;
      default:
        return null;
    }
  };

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
      {/* Tabs en la parte superior */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <TabsPaquete onTabChange={handleTabChange} />
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexGrow: 1,
          height: "auto",
        }}
      >
        {/* Imagen */}
        <Box sx={{ flex: 1.5, display: "flex", height: "100%" }}>
          <ImagenPaquete
            imagen={paquete.imagen || "/imagenes/default-image.jpg"}
            cargando={cargando}
          />
        </Box>

        {/* Info general */}
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

        {/* Precio */}
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
            tarifa={paquete.tarifa ?? null}
            impuestos={paquete.impuestos ?? null}
            total={paquete.total ?? null}
            cargando={cargando}
          />
        </Box>
      </Box>

      {/* Expansión al hacer clic en tab */}
      <ExpansionContainer open={expansionOpen}>
        {renderExpansionContent()}
      </ExpansionContainer>
    </Card>
  );
};

export default TarjetaPaquete;
