import React from "react";
import Slider from "react-slick";
import { Box, Typography, useMediaQuery } from "@mui/material";
import {
  usePublicidadCliente,
  useDatosGenerales,
  useTarjetas,
  useFooter,
} from "../../contextos/agencia/DatosAgenciaContext";

// Estilos del carrusel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PublicidadCliente: React.FC = () => {
  const publicidadCliente = usePublicidadCliente();
  const datosGenerales = useDatosGenerales();
  const tarjetas = useTarjetas();
  const footer = useFooter();
  const isMobile = useMediaQuery("(max-width:600px)");

  if (!publicidadCliente || !datosGenerales || !publicidadCliente.existe) {
    return null;
  }

  const titulo = publicidadCliente.titulo || "Promociones Especiales";

  // Tipografía y color del título desde tarjeta > agencia > fallback
  const tipografia =
    tarjetas?.tipografia ||
    datosGenerales?.tipografiaAgencia ||
    "Poppins, sans-serif";

  const colorTexto =
    tarjetas?.tipografiaColorTitulo ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  const colorFlechas =
    publicidadCliente.color?.primario ||
    datosGenerales?.color?.primario ||
    "#007BFF";

  // ✅ Tomar solo imágenes válidas (string no vacío). No completamos con placeholders.
  const imagenes: string[] = (publicidadCliente.imagenes ?? [])
    .filter((src): src is string => typeof src === "string")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Si no hay imágenes válidas, no renderizar el bloque
  if (imagenes.length === 0) return null;

  // Ajustes del slider según la cantidad real de imágenes
  const multiples = imagenes.length > 1;
  const settings = {
    dots: multiples,
    infinite: multiples,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: multiples,
    autoplaySpeed: 3000,
    arrows: !isMobile && multiples,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const handleClickImagen = () => {
    const numeroWhatsapp = footer?.redes?.whatsapp?.replace(/[^0-9]/g, "");
    const mensaje = "Quiero más información sobre la imagen publicitada";
    const encodedMessage = encodeURIComponent(mensaje);

    if (numeroWhatsapp) {
      window.open(
        `https://wa.me/${numeroWhatsapp}?text=${encodedMessage}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      console.warn("Número de WhatsApp no disponible en footer.redes.whatsapp");
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100vw", md: "80vw" },
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "transparent",
        py: 0,
        mt: 0,
        mb: 0,
        borderRadius: "20px",
        position: "relative",
      }}
    >
      {/* Título */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: tipografia,
          fontSize: isMobile ? "2.5rem" : "5rem",
          fontWeight: "bold",
          color: colorTexto,
          mb: "20px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        {titulo}
      </Typography>

      {/* Carrusel */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Slider {...settings} aria-label="Carrusel de imágenes publicitarias">
          {imagenes.map((src, index) => (
            <Box
              key={`${src}-${index}`}
              sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
              onClick={handleClickImagen}
            >
              <img
                src={src}
                alt={`Publicidad ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "15px",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Estilos slick personalizados */}
      <style>
        {`
          .slick-prev, .slick-next {
            z-index: 10;
            width: ${isMobile ? "40px" : "60px"};
            height: ${isMobile ? "40px" : "60px"};
            opacity: 0.7;
            transition: opacity 0.3s ease-in-out;
          }
          .slick-prev:hover, .slick-next:hover {
            opacity: 1;
          }
          .slick-prev::before, .slick-next::before {
            font-size: ${isMobile ? "30px" : "40px"};
            color: ${colorFlechas};
          }
          .slick-prev {
            left: ${isMobile ? "5px" : "25px"};
          }
          .slick-next {
            right: ${isMobile ? "5px" : "25px"};
          }
          .slick-dots {
            bottom: ${isMobile ? "-25px" : "-30px"};
          }
          .slick-dots li button:before {
            font-size: 12px;
            color: ${colorFlechas};
            opacity: 0.7;
          }
          .slick-dots li.slick-active button:before {
            color: ${colorFlechas};
            opacity: 1;
          }
        `}
      </style>
    </Box>
  );
};

export default PublicidadCliente;
