import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import { usePublicidadCliente, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";

// Importación de estilos para el carrusel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PublicidadCliente: React.FC = () => {
  const publicidadCliente = usePublicidadCliente();
  const datosGenerales = useDatosGenerales();

  if (!publicidadCliente || !datosGenerales || !publicidadCliente.existe) {
    return null; // ✅ No renderizar si `publicidadCliente` no existe
  }

  /** 🔥 Aplicamos fallbacks desde `Datos Generales` */
  const titulo = publicidadCliente.titulo || "Promociones Especiales";
  const tipografia = "Arial Rounded MT Bold "; // ✅ Se fuerza Poppins como tipografía
  const tamanio = "5rem";
  const colorTexto =
    publicidadCliente.tipografiaColor ||
    datosGenerales.colorTipografiaAgencia ||
    "#000000";
  const colorFlechas =
    publicidadCliente.color.primario ||
    datosGenerales.color.primario ||
    "#007BFF";

  /** 🔥 Imágenes del carrusel, asegurando que no haya `null` */
  const imagenes = publicidadCliente.imagenes.map(
    (img) => img || "/public/default-placeholder.jpg"
  );

  // Configuración del carrusel con react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false, // ✅ Opcional: Oculta las flechas en mobile si molestan
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: { xs: "100vw", md: "80vw" },
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "transparent",
        padding: "20px 0",
        borderRadius: "20px",
      }}
    >
      {/* 🔥 TÍTULO CONFIGURABLE */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: tipografia,
          fontSize: tamanio,
          fontWeight: "bold",
          color: colorTexto,
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        {titulo}
      </Typography>

      {/* 🔥 CARRUSEL DE IMÁGENES */}
      <Slider {...settings} aria-label="Carrusel de imágenes publicitarias">
        {imagenes.map((imagen, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={imagen}
              alt={`Publicidad ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
          </Box>
        ))}
      </Slider>

      {/* 🔥 ESTILOS MEJORADOS PARA LOS PUNTOS Y FLECHAS */}
      <style>
        {`
          /* 🔥 FLECHAS MEJORADAS */
          .slick-prev, .slick-next {
            z-index: 10;
            width: 60px;
            height: 60px;
            opacity: 0.7;
            transition: opacity 0.3s ease-in-out;
          }
          .slick-prev:hover, .slick-next:hover {
            opacity: 1;
          }
          .slick-prev::before, .slick-next::before {
            font-size: 40px;
            color: ${colorFlechas}; /* ✅ Usa el color primario de la agencia */
          }

          /* 🔥 PUNTOS DEBAJO */
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
