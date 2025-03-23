import { CardMedia, Skeleton } from "@mui/material";

interface ImagenPaqueteProps {
  imagen: string;
  cargando?: boolean;
}

const ImagenPaquete = ({ imagen, cargando = false }: ImagenPaqueteProps) => {
  return cargando ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : (
    <CardMedia
      component="img"
      sx={{
        width: "100%", // 🔥 Ocupa todo el ancho disponible
        height: "100%", // 🔥 Ocupa todo el alto disponible
        objectFit: "cover", // 🔥 Ajuste para que la imagen se vea bien
      }}
      image={imagen}
      alt="Imagen del paquete"
    />
  );
};

export default ImagenPaquete;
