import { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { enviarConsulta } from "./consultaService";

interface ModalConsultarProps {
  open: boolean;
  onClose: () => void;
  colorPrimario: string;
  tipografia: string;
  idAgencia: number;
  idPaquete: number;
}

const ModalConsultar = ({
  open,
  onClose,
  colorPrimario,
  tipografia,
  idAgencia,
  idPaquete,
}: ModalConsultarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [formulario, setFormulario] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    direccion: "",
    pais: "",
    ciudad: "",
    comentarios: "",
  });

  const [errores, setErrores] = useState<Partial<typeof formulario>>({});

  const handleChange = (
    campo: keyof typeof formulario,
    valor: string
  ) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: Partial<typeof formulario> = {};
    if (!formulario.nombreCompleto.trim())
      nuevosErrores.nombreCompleto = "Campo obligatorio";
    if (!formulario.email.trim()) {
      nuevosErrores.email = "Campo obligatorio";
    } else if (
      !formulario.email.includes("@") ||
      !formulario.email.includes(".")
    ) {
      nuevosErrores.email = "Email inválido";
    }
    if (!formulario.telefono.trim())
      nuevosErrores.telefono = "Campo obligatorio";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async () => {
    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      await enviarConsulta({
        idAgencia,
        idPaquete,
        ...formulario,
      });

      console.log("Consulta enviada con éxito");
      onClose();
      setFormulario({
        nombreCompleto: "",
        email: "",
        telefono: "",
        direccion: "",
        pais: "",
        ciudad: "",
        comentarios: "",
      });
      setErrores({});
    } catch (error) {
      console.error("Error al enviar la consulta:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "95%" : isTablet ? "90%" : 600,
          maxWidth: "100%",
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: isMobile ? "20px" : "35px",
          overflow: "hidden",
        }}
      >
        {/* 🔹 Banner Superior */}
        <Box
          sx={{
            backgroundColor: colorPrimario,
            color: "white",
            padding: isMobile ? "12px" : "15px",
            textAlign: "center",
            fontFamily: tipografia,
            fontSize: isMobile ? "1rem" : "1.2rem",
            fontWeight: "bold",
          }}
        >
          Déjenos su información de contacto
        </Box>

        {/* 🔹 Formulario de Contacto */}
        <Box sx={{ padding: isMobile ? "15px" : "20px" }}>
          <Grid container spacing={isMobile ? 1 : 2}>
            {[ 
              { label: "Nombre y Apellido", key: "nombreCompleto" },
              { label: "E-mail", key: "email" },
              { label: "Teléfono", key: "telefono" },
              { label: "Dirección", key: "direccion" },
              { label: "País", key: "pais" },
              { label: "Ciudad", key: "ciudad" },
            ].map(({ label, key }) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  fontSize={isMobile ? "0.9rem" : "1rem"}
                >
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                  value={formulario[key as keyof typeof formulario]}
                  onChange={(e) =>
                    handleChange(
                      key as keyof typeof formulario,
                      e.target.value
                    )
                  }
                  error={!!errores[key as keyof typeof errores]}
                  helperText={errores[key as keyof typeof errores]}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography
                variant="body1"
                fontWeight="bold"
                fontSize={isMobile ? "0.9rem" : "1rem"}
              >
                Comentarios
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                multiline
                rows={isMobile ? 2 : 3}
                value={formulario.comentarios}
                onChange={(e) =>
                  handleChange("comentarios", e.target.value)
                }
              />
            </Grid>
          </Grid>

          {/* 🔹 Botón "Consultar" */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: isMobile ? 2 : 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: colorPrimario,
                color: "white",
                fontWeight: "bold",
                fontFamily: tipografia,
                minWidth: isMobile ? 150 : 200,
                py: 1,
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
              onClick={handleSubmit}
            >
              CONSULTAR{" "}
              <EmailIcon
                sx={{ ml: 1, fontSize: isMobile ? "1rem" : "1.2rem" }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConsultar;
