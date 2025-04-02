import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import ContenedorBusqueda from '../generales/buscador/ContenedorBusqueda';

const TopHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const contenedorHeight = 120;

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Header */}
      <Box
        ref={headerRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        <Header />
      </Box>

      {/* Contenedor de búsqueda superpuesto */}
      <Box
        sx={{
          position: 'absolute',
          top: `calc(${headerHeight}px - ${contenedorHeight / 2}px)`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '1200px',
          height: `${contenedorHeight}px`,
          zIndex: 2,
          backgroundColor: 'transparent',
        }}
      >
        <ContenedorBusqueda />
      </Box>

      {/* Espaciador reducido: ajustá este valor a gusto */}
      <Box sx={{ height: '30px' }} />
    </Box>
  );
};

export default TopHeader;
