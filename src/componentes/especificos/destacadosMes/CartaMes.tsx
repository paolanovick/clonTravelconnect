import React from "react";
import { Card, Backdrop, CircularProgress } from "@mui/material";
import { PaqueteDestacado } from "../../../interfaces/PaqueteDestacado";
import { useTarjetas, useDatosGenerales } from "../../../contextos/DatosAgenciaContext";
import CartaMesImagen from "./CartaMesImagen";
import CartaMesContenido from "./CartaMesContenido";
import CartaMesPrecio from "./CartaMesPrecio";
import { useBusquedaPorCarta } from "./useBusquedaPorCarta";

interface CartaMesProps {
  paquete: PaqueteDestacado;
  estilos: {
    tarjetaTipografia: string | null;
    tarjetaTipografiaColor: string | null;
    tarjetaColorPrimario: string | null;
    tarjetaColorSecundario: string | null;
    tarjetaColorTerciario: string | null;
  };
}

const CartaMes: React.FC<CartaMesProps> = ({ paquete, estilos }) => {
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();
  const [cargando, setCargando] = React.useState(false); // <- inicia en false
  const { buscarPorId } = useBusquedaPorCarta();

  const tipografia =
    estilos.tarjetaTipografia || tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Arial";

  const colorFondo =
    estilos.tarjetaColorSecundario || tarjetas?.color?.secundario || datosGenerales?.color?.secundario || "#f5f5f5";

  const handleClick = async () => {
    setCargando(true);
    try {
      await buscarPorId(paquete.id); // si no es async, quitar await
      window.scrollTo(0, 0); // <- fuerza scroll al top
    } catch (error) {
      console.error("Error al buscar por ID:", error);
    }
    setCargando(false); // opcional: puede omitirse si redirige a otra vista
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: "100%",
        minHeight: "100%",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
        },
        backgroundColor: colorFondo,
        color: estilos.tarjetaTipografiaColor,
        fontFamily: tipografia,
        display: "flex",
        flexDirection: "column",
        border: "none",
        outline: "none",
        position: "relative", // necesario para el Backdrop
      }}
    >
      <CartaMesImagen
        imagen={paquete.imagen || "/imagenes/default-image.jpg"}
        alt={paquete.nombre}
        cargando={false} // ahora el loading real está en la tarjeta
        colorSecundario={colorFondo}
      />

      <CartaMesContenido
        nombre={paquete.nombre}
        descripcion={paquete.descripcion}
        estilos={{
          tarjetaTipografiaColor: estilos.tarjetaTipografiaColor,
        }}
        cargando={false}
      />

      <CartaMesPrecio
        precio={paquete.precio}
        moneda={paquete.moneda}
        estilos={{
          tarjetaTipografia: estilos.tarjetaTipografia,
          tarjetaTipografiaColor: estilos.tarjetaTipografiaColor,
          tarjetaColorPrimario: estilos.tarjetaColorPrimario,
        }}
      />

      <Backdrop
        open={cargando}
        sx={{
          position: "absolute",
          zIndex: 10,
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "16px",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
};

export default CartaMes;
