import { FunctionComponent } from "react";
import { Stack, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

const DerechaAbajo: FunctionComponent = () => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  if (!footer || !datosGenerales) return null;

  /** 🔥 Definir tipografía y colores con fallback */
  const tipografia = footer.tipografia || datosGenerales.tipografiaAgencia || "inherit";
  const textoColor = footer.tipografiaColor || datosGenerales.colorTipografiaAgencia || "#FFFFFF";

  return (
    <Box sx={{ backgroundColor: "transparent", padding: 2 }}>
      <Stack spacing={1} alignItems="flex-end" textAlign="right">
        <Typography variant="h6" sx={{ color: textoColor, fontFamily: tipografia }}>
          Contacto
        </Typography>

        {footer.contacto.telefono && (
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneIcon sx={{ color: textoColor }} />
            <Typography variant="body2" sx={{ color: textoColor, fontFamily: tipografia }}>
              {footer.contacto.telefono}
            </Typography>
          </Stack>
        )}

        {footer.contacto.email && (
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon sx={{ color: textoColor }} />
            <Typography variant="body2" sx={{ color: textoColor, fontFamily: tipografia }}>
              {footer.contacto.email}
            </Typography>
          </Stack>
        )}

        {footer.ubicacion.direccion && (
          <>
            <Typography variant="h6" sx={{ color: textoColor, fontFamily: tipografia, mt: 2 }}>
              Ubicación
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon sx={{ color: textoColor }} />
              <Typography variant="body2" sx={{ color: textoColor, fontFamily: tipografia }}>
                {footer.ubicacion.direccion}
                {footer.ubicacion.ciudad ? `, ${footer.ubicacion.ciudad}` : ""}
                {footer.ubicacion.pais ? `, ${footer.ubicacion.pais}` : ""}
              </Typography>
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default DerechaAbajo;
