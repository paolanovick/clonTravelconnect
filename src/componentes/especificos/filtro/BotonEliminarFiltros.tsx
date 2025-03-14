import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const BotonEliminarFiltros = () => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="error"
      sx={{
        bgcolor: "success.light",
        color: "black",
        mt: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <ClearIcon />
      Eliminar todos los filtros
    </Button>
  );
};

export default BotonEliminarFiltros;
