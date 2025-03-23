import { FunctionComponent } from "react";
import { Stack, IconButton, Typography, Box } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useFooter, useDatosGenerales } from "../../contextos/DatosAgenciaContext";

const redes = [
  { icon: <FacebookOutlinedIcon />, link: "#" },
  { icon: <TwitterIcon />, link: "#" },
  { icon: <InstagramIcon />, link: "#" },
  { icon: <LinkedInIcon />, link: "#" },
];

interface IzquierdaAbajoProps {
  year: number;
}

const IzquierdaAbajo: FunctionComponent<IzquierdaAbajoProps> = ({ year }) => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  if (!footer || !datosGenerales) return null;

  /** 🔥 Definir tipografía y colores con fallback */
  const tipografia = footer.tipografia || datosGenerales.tipografiaAgencia || "inherit";
  const textoColor = footer.tipografiaColor || datosGenerales.colorTipografiaAgencia || "#FFFFFF";

  return (
    <Box sx={{ backgroundColor: "transparent", padding: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
        <Stack direction="row" spacing={1}>
          {redes.map(({ icon, link }, index) => (
            <IconButton
              key={index}
              href={link}
              sx={{
                color: textoColor,
                backgroundColor: "transparent",
                border: `1px solid ${textoColor}`,
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                width: 40,
                height: 40,
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Stack>
        <Typography variant="caption" sx={{ color: textoColor, fontFamily: tipografia }}>
          © {year} — Todos los derechos reservados.
        </Typography>
      </Stack>
    </Box>
  );
};

export default IzquierdaAbajo;
