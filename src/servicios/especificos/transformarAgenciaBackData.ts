import { DatosAgencia } from "../../interfaces/datosAgencia"; // Ajustá esta ruta según tu estructura

export interface AgenciaBackData {
  idAgencia: number | string;
  nombre: string;
  logo: string | null;
  tipografia_agencia: string | null;
  color_tipografia_agencia: string;
  color_fondo_app: string;

  color: {
    primario: string | null;
    secundario: string | null;
    terciario: string | null;
  };

  header_imagen_background: string | null;
  header_imagen_background_opacidad: number | string;
  header_video_background: string | null;
  header_video_background_opacidad: number | string;

  buscador: {
    tipografia: string | null;
    tipografiaColor: string;
    tipografiaColorLabel: string;
    inputColor: string | null;
    inputFondoColor: string | null;
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
  };

  publicidadCliente: {
    existe: boolean;
    titulo: string | null;
    tipografiaColor: string;
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
  };

  imagenes: (string | null)[];

  tarjetas: {
    titulo: string | null;
    tipografia: string | null;
    tipografiaColor: string;
    tipografiaColorTitulo: string;
    tipografiaColorContenido: string;
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
  };

  bannerRegistro: {
    titulo: string | null;
    tipografiaColor: string;
    color: {
      primario: string;
      secundario: string;
      terciario: string;
    };
  };

  quienes_somos_es: string | null;
  quienes_somos_en: string | null;
  quienes_somos_pt: string | null;

  footer: {
    texto: string | null;
    tipografia: string | null;
    tipografiaColor: string;
    color: {
      primario: string | null;
      secundario: string | null;
      terciario: string | null;
    };
  };

  contacto: {
    telefono: string | null;
    email: string | null;
  };

  redes: {
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    whatsapp: string | null;
  };

  ubicacion: {
    direccion: string | null;
    ciudad: string | null;
    pais: string | null;
  };
}




export function transformarAgenciaBackData(data: AgenciaBackData): DatosAgencia {
  return {
    idAgencia: Number(data.idAgencia),
    nombreAgencia: data.nombre,
    logoAgencia: data.logo,
    tipografiaAgencia: data.tipografia_agencia,
    colorTipografiaAgencia: data.color_tipografia_agencia,
    colorFondoApp: data.color_fondo_app,

    color: {
      primario: data.color?.primario || null,
      secundario: data.color?.secundario || null,
      terciario: data.color?.terciario || null,
    },

    header: {
      imagenBackground: data.header_imagen_background,
      imagenBackgroundOpacidad: Number(data.header_imagen_background_opacidad) || null,
      videoBackground: data.header_video_background,
      videoBackgroundOpacidad: Number(data.header_video_background_opacidad) || null,
    },

    buscador: {
      tipografia: data.buscador?.tipografia || null,
      tipografiaColor: data.buscador?.tipografiaColor || null,
      tipografiaColorLabel: data.buscador?.tipografiaColorLabel || null,
      inputColor: data.buscador?.inputColor || null,
      inputFondoColor: data.buscador?.inputFondoColor || null,
      color: {
        primario: data.buscador?.color?.primario || null,
        secundario: data.buscador?.color?.secundario || null,
        terciario: data.buscador?.color?.terciario || null,
      },
    },

    publicidadCliente: {
      existe: !!data.publicidadCliente?.existe,
      titulo: data.publicidadCliente?.titulo || null,
      tipografiaColor: data.publicidadCliente?.tipografiaColor || null,
      color: {
        primario: data.publicidadCliente?.color?.primario || null,
        secundario: data.publicidadCliente?.color?.secundario || null,
        terciario: data.publicidadCliente?.color?.terciario || null,
      },
      imagenes: (Array.isArray(data.imagenes) ? data.imagenes.slice(0, 3) : [null, null, null]) as [string | null, string | null, string | null],
    },

    tarjetas: {
      titulo: data.tarjetas?.titulo || null,
      tipografia: data.tarjetas?.tipografia || null,
      tipografiaColor: data.tarjetas?.tipografiaColor || null,
      tipografiaColorTitulo: data.tarjetas?.tipografiaColorTitulo || null,
      tipografiaColorContenido: data.tarjetas?.tipografiaColorContenido || null,
      color: {
        primario: data.tarjetas?.color?.primario || null,
        secundario: data.tarjetas?.color?.secundario || null,
        terciario: data.tarjetas?.color?.terciario || null,
      },
    },

    bannerRegistro: {
      titulo: data.bannerRegistro?.titulo || null,
      tipografiaColor: data.bannerRegistro?.tipografiaColor || null,
      color: {
        primario: data.bannerRegistro?.color?.primario || null,
        secundario: data.bannerRegistro?.color?.secundario || null,
        terciario: data.bannerRegistro?.color?.terciario || null,
      },
    },

    quienesSomos: {
      quienes_somos_es: data.quienes_somos_es || null,
      quienes_somos_en: data.quienes_somos_en || null,
      quienes_somos_pt: data.quienes_somos_pt || null,
    },

    footer: {
      texto: data.footer?.texto || null,
      tipografia: data.footer?.tipografia || null,
      tipografiaColor: data.footer?.tipografiaColor || null,
      color: {
        primario: data.footer?.color?.primario || null,
        secundario: data.footer?.color?.secundario || null,
        terciario: data.footer?.color?.terciario || null,
      },
      redes: {
        facebook: data.redes?.facebook || null,
        twitter: data.redes?.twitter || null,
        instagram: data.redes?.instagram || null,
        whatsapp: data.redes?.whatsapp || null,
      },
      contacto: {
        telefono: data.contacto?.telefono || null,
        email: data.contacto?.email || null,
      },
      ubicacion: {
        direccion: data.ubicacion?.direccion || null,
        ciudad: data.ubicacion?.ciudad || null,
        pais: data.ubicacion?.pais || null,
      },
    },
  };
}
