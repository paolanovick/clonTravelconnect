import { Grid, Box, Skeleton } from "@mui/material";

const ListadoPaquetes = () => {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}> {/* 🔹 Se asegura que crezca correctamente */}
      {[...Array(10)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              bgcolor: "background.paper",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.02)", boxShadow: 5 },
              display: "flex",
              flexDirection: "column",
              minHeight: 250, // 🔹 Asegura que las tarjetas tengan un tamaño uniforme
              width: "100%", // 🔹 Evita que las tarjetas se estiren de manera inconsistente
              maxWidth: 300, // 🔹 Mantiene un ancho consistente en pantallas grandes
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={150} />
            <Box p={2} sx={{ flexGrow: 1 }}> {/* 🔹 Se asegura de que el contenido crezca correctamente */}
              <Skeleton width="80%" />
              <Skeleton width="60%" />
              <Skeleton width="100%" height={40} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListadoPaquetes;
