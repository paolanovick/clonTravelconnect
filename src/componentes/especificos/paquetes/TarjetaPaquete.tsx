import React, { useState } from "react";
import { Card, Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import ImagenPaquete from "./ImagenPaquete";
import InfoPaquete from "./InfoPaquete";
import TarifaPaquete from "./TarifaPaquete";
import TabsPaquete from "./TabsPaquete";
import ExpansionContainer from "./ExpansionContainer";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import HotelesContent from "./HotelesContent";
import DescripcionContent from "./DescripcionContent";
import SalidasContent from "./SalidasContent";
import TransporteContent from "./TransporteContent";
import { TarjetaPaqueteProps} from "./tarjetasInterfaces";

const TarjetaPaquete: React.FC<TarjetaPaqueteProps> = ({ paquete, cargando = false }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          order: !isDesktop ? 1 : undefined,
        }}
      >
        <TabsPaquete onTabChange={handleTabChange} />
      </Box>

      {isDesktop ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            flexGrow: 1,
            height: "auto",
          }}
        >
          <Box sx={{ flex: 1.5, display: "flex", height: "100%" }}>
            <ImagenPaquete
              imagen={paquete.imagen || "/imagenes/default-image.jpg"}
              cargando={cargando}
            />
          </Box>

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
              wp={paquete ?? null}
              cargando={cargando}
            />
          </Box>
        </Box>
      ) : (
        <>
          <Grid
            container
            sx={{
              order: 2,
              width: "100%",
              flexGrow: 1,
            }}
          >
            <Grid
              item
              xs={12}
              order={2}
              sx={{
                height: "300px",
                display: "flex",
              }}
            >
              <ImagenPaquete
                imagen={paquete.imagen || "/imagenes/default-image.jpg"}
                cargando={cargando}
              />
            </Grid>

            <Grid
              item
              xs={12}
              order={3}
              sx={{
                px: 2,
                py: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
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
            </Grid>

            <Grid
              item
              xs={12}
              order={4}
              sx={{
                px: 2,
                py: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TarifaPaquete
                tarifa={paquete.tarifa ?? null}
                impuestos={paquete.impuestos ?? null}
                total={paquete.total ?? null}
                wp={paquete??null}
                cargando={cargando}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Box sx={{ order: !isDesktop ? 5 : undefined }}>
        <ExpansionContainer open={expansionOpen}>
          {renderExpansionContent()}
        </ExpansionContainer>
      </Box>
    </Card>
  );
};

export default TarjetaPaquete;