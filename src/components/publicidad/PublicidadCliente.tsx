import React from "react";
import Slider from "react-slick";
import { Box, Typography, useMediaQuery } from "@mui/material";
import {
  usePublicidadCliente,
  useDatosGenerales,
  useTarjetas,
  useFooter,
} from "../../contextos/agencia/DatosAgenciaContext";

// Importación de estilos para el carrusel
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

  /** 🔹 Tipografía y color del título desde tarjeta > agencia > fallback */
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
    datosGenerales.color.primario ||
    "#007BFF";

  const imagenes = publicidadCliente.imagenes.map(
    (img) => img || "/public/default-placeholder.jpg"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: !isMobile,
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
      window.open(`https://wa.me/${numeroWhatsapp}?text=${encodedMessage}`, "_blank");
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
      {/* 🔥 TÍTULO */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: tipografia,
          fontSize: isMobile ? "2.5rem" : "5rem",
          fontWeight: "bold",
          color: colorTexto,
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        {titulo}
      </Typography>

      {/* 🔥 CARRUSEL */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Slider {...settings} aria-label="Carrusel de imágenes publicitarias">
          {imagenes.map((imagen, index) => (
            <Box
              key={index}
              sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
              onClick={handleClickImagen}
            >
              <img
                src={imagen}
                alt={`Publicidad ${index + 1}`}
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

      {/* 🔥 ESTILOS SLICK PERSONALIZADOS */}
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
