import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const Divisor = () => {
  const [marginTop, setMarginTop] = useState(-20);

  useEffect(() => {
    const calcularMargen = () => {
      const visualWidth = window.visualViewport?.width || window.innerWidth;
      const zoom = window.devicePixelRatio || 1;
      const anchoAjustado = visualWidth / zoom;

      let factor = 0.35;
      let maximo = 240;

      if (anchoAjustado < 400) {
        // iPhone SE u otros ultra chicos
        factor = 0.45;
        maximo = 280;
      } else if (anchoAjustado >= 700 && anchoAjustado <= 1024) {
        // iPad
        factor = 0.08;
        maximo = 60;
      } else if (anchoAjustado > 1024) {
        // Desktop
        factor = 0.08;
        maximo = 80;
      }

      let nuevoMargin = -20 + Math.max(0, (1600 - anchoAjustado) * factor);
      if (nuevoMargin > maximo) nuevoMargin = maximo;

      setMarginTop(nuevoMargin);
    };

    calcularMargen();

    window.addEventListener('resize', calcularMargen);
    window.addEventListener('orientationchange', calcularMargen);
    window.visualViewport?.addEventListener('resize', calcularMargen);

    const intervalId = setInterval(() => calcularMargen(), 1000);

    return () => {
      window.removeEventListener('resize', calcularMargen);
      window.removeEventListener('orientationchange', calcularMargen);
      window.visualViewport?.removeEventListener('resize', calcularMargen);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 40,
        height: 'auto',
        mt: `${marginTop}px`,
        mb: 2,
        backgroundColor: 'transparent',
        transition: 'margin 0.3s ease-in-out',
      }}
    />
  );
};

export default Divisor;
