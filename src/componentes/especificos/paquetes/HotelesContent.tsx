// HotelesContent.tsx
import React from "react";
import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import Hotel from "./Hotel";

interface HotelData {
  nombre: string;
  id_hotel: string;
  categoria_hotel: string;
}

interface HotelesContentProps {
  hoteles?: {
    hotel: HotelData;
  }[];
}

const HotelesContent: React.FC<HotelesContentProps> = ({ hoteles }) => {
  const hotelesAmostrar: HotelData[] =
    hoteles && hoteles.length > 0
      ? hoteles.map((h) => h.hotel)
      : [
          {
            nombre: "No hay hoteles disponibles",
            id_hotel: "0",
            categoria_hotel: "1",
          },
       
        ];

  return (
    <Box sx={{ mt: 2, px: 2 }}>
      <Stack spacing={3}>
        {hotelesAmostrar.map((hotel, index) => (
          <motion.div
            key={hotel.id_hotel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            style={{ borderRadius: 16 }}
          >
            <Hotel hotel={hotel} />
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};

export default HotelesContent;
