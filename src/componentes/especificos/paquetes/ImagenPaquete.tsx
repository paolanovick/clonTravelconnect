import { CardMedia, Skeleton } from "@mui/material";

interface ImagenPaqueteProps {
  imagen: string;
  cargando?: boolean;
}

const ImagenPaquete = ({ imagen, cargando = false }: ImagenPaqueteProps) => {
  return cargando ? (
    <Skeleton variant="rectangular" width={250} height="100%" />
  ) : (
    <CardMedia component="img" sx={{ width: { xs: "100%", md: 250 }, height: "auto" }} image={imagen} alt="Imagen del paquete" />
  );
};

export default ImagenPaquete;
