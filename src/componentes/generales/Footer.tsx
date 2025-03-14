import { FunctionComponent } from "react";
import {
  Box,
  Typography,
 
  IconButton,
  Container,
  Grid,
  Divider,
} from "@mui/material";

// ✅ Importación correcta de los iconos
import FacebookOutlined from "@mui/icons-material/FacebookOutlined";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import LocationOn from "@mui/icons-material/LocationOn";

import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

/** 🔥 Subcomponente: Izquierda Arriba (Logo + Texto) */
const IzquierdaArriba: FunctionComponent<{ logo: string | null; textoColor: string }> = ({
  logo,
  textoColor,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {logo && <img src={logo} alt="Logo" width={120} />}
    <Typography variant="body2" sx={{ maxWidth: 350, color: textoColor }}>
      Somos una agencia especializada en brindar soluciones digitales y estrategias innovadoras para potenciar tu negocio.
    </Typography>
  </Box>
);

/** 🔥 Subcomponente: Izquierda Abajo (Redes sociales + Copyright) */
const IzquierdaAbajo: FunctionComponent<{ iconosColor: string; year: number }> = ({
  iconosColor,
  year,
}) => {
  const redes = [
    { icon: FacebookOutlined, link: "#" },
    { icon: Twitter, link: "#" },
    { icon: Instagram, link: "#" },
    { icon: LinkedIn, link: "#" },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        {redes.map(({ icon: Icon, link }, index) => (
          <IconButton
            key={index}
            href={link}
            sx={{
              color: iconosColor,
              backgroundColor: "transparent",
              border: `1px solid ${iconosColor}`,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              width: 40,
              height: 40,
            }}
          >
            <Icon />
          </IconButton>
        ))}
      </Box>
      <Typography variant="caption">© {year} — Todos los derechos reservados.</Typography>
    </Box>
  );
};

/** 🔥 Subcomponente: Derecha Abajo (Contacto y Ubicación) */
const DerechaAbajo: FunctionComponent<{ contacto: any; ubicacion: any; textoColor: string }> = ({
  contacto,
  ubicacion,
  textoColor,
}) => (
  <Box sx={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-end" }}>
    <Typography variant="h6" sx={{ color: textoColor }}>Contacto</Typography>
    {contacto.telefono && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Phone sx={{ color: textoColor, fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: textoColor }}>{contacto.telefono}</Typography>
      </Box>
    )}
    {contacto.email && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Email sx={{ color: textoColor, fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: textoColor }}>{contacto.email}</Typography>
      </Box>
    )}
    <Typography variant="h6" sx={{ color: textoColor, mt: 2 }}>Ubicación</Typography>
    {ubicacion.direccion && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LocationOn sx={{ color: textoColor, fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: textoColor }}>
          {ubicacion.direccion}, {ubicacion.ciudad}, {ubicacion.pais}
        </Typography>
      </Box>
    )}
  </Box>
);

/** 🔥 Componente Principal `Footer` */
const Footer: FunctionComponent = () => {
  const footer = useFooter(); // ✅ Ahora obtenemos `footer` directamente
  const datosGenerales = useDatosGenerales();

  if (!footer || !datosGenerales) return null;

  /** 🔥 Aplicamos fallbacks desde `Datos Generales` */
  const fondoColor = footer.fondoColor || datosGenerales.colorTerciarioAgencia || "#222222";
  const textoColor = footer.tipografiaColor || datosGenerales.colorTipografiaAgencia || "#FFFFFF";
  const iconosColor = footer.iconosColor || datosGenerales.colorPrincipalAgencia || "#FF5733";
  const logo = datosGenerales.logoAgencia;
  const contacto = footer.contacto || { telefono: "No disponible", email: "No disponible" };
  const ubicacion = footer.ubicacion || { direccion: "No disponible", ciudad: "No disponible", pais: "No disponible" };

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: fondoColor,
        color: textoColor,
        width: "100%",
        py: 5,
        px: { xs: 3, md: 5 },
        borderTop: `2px solid ${iconosColor}`,
      }}
    >
      <Container maxWidth="xl">
        {/* 🔹 Sección superior */}
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
            <IzquierdaArriba logo={logo} textoColor={textoColor} />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <DerechaAbajo contacto={contacto} ubicacion={ubicacion} textoColor={textoColor} />
          </Grid>
        </Grid>

        {/* 🔹 Línea divisoria */}
        <Divider sx={{ my: 3, backgroundColor: iconosColor, opacity: 0.5 }} />

        {/* 🔹 Sección inferior */}
        <Grid container spacing={3} alignItems="flex-end" justifyContent="space-between">
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end" }}>
            <IzquierdaAbajo iconosColor={iconosColor} year={currentYear} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
