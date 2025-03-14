export interface DatosAgencia {
  /** 🔥 Datos Generales */
  idAgencia: string;
  nombreAgencia: string;
  logoAgencia: string | null;
  tipografiaAgencia: string | null;
  colorTipografiaAgencia: string | null;
  colorFondoAgencia: string | null;
  colorPrincipalAgencia: string | null;
  colorSecundarioAgencia: string | null;
  colorTerciarioAgencia: string | null;

  /** 🔥 Header */
  header: {
    imagenBackground: string | null;
    imagenBackgroundOpacidad: number | null; // Opacidad entre 0 y 1
  };

  /** 🔥 Buscador */
  buscador: {
    tipografia: string | null;
    tipografiaColor: string | null;
    fondoColor: string | null;
    inputColor: string | null;
    calendarioColorPrimario: string | null;
    calendarioColorSecundario: string | null;
    botonBuscarColor: string | null;
    tabsColor: string | null;
  };

  /** 🔥 Publicidad Cliente */
  publicidadCliente: {
    existe: boolean;
    titulo: string | null;
    tituloTipografia: string | null;
    tituloTipografiaTamanio: string | null;
    tituloTipografiaColor: string | null;
    flechasColor: string | null;
    imagenes: [string | null, string | null, string | null]; // Hasta 3 imágenes
  };

  /** 🔥 Destacados del Mes */
  destacadosMes: {
    titulo: string | null;
    tituloTipografia: string | null;
    tituloTipografiaTamanio: string | null;
    tituloTipografiaColor: string | null;
    tarjetaTipografia: string | null;
    tarjetaTipografiaColor: string | null;
    tarjetaColorPrimario: string | null;
    tarjetaColorSecundario: string | null;
    tarjetaColorTerciario: string | null;
  };

  /** 🔥 Banner de Registro */
  bannerRegistro: {
    titulo: string | null;
    tituloTipografia: string | null;
    tituloTipografiaTamanio: string | null;
    tituloTipografiaColor: string | null;
    bannerColor: string | null;
  };

  /** 🔥 Footer */
  footer: {
    texto: string | null;
    tipografia: string | null;
    tipografiaColor: string | null;
    fondoColor: string | null;
    iconosColor: string | null;
    redes: {
      facebook: string | null;
      twitter: string | null;
      instagram: string | null;
      whatsapp: string | null;
    };
    contacto: {
      telefono: string | null;
      email: string | null;
    };
    ubicacion: {
      direccion: string | null;
      ciudad: string | null;
      pais: string | null;
    };
  };
}
