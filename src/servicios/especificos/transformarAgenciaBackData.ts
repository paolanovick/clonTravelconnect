import { DatosAgencia } from "../../interfaces/datosAgencia"; // Ajustá esta ruta según tu estructura

export interface AgenciaBackData {
  idAgencia: number;
  nombre: string;
  logo: string | null;
  tipografia_agencia: string | null;
  color_tipografia_agencia: string;
  color_fondo_app: string;
  color_principal: string;
  color_secundario: string;
  color_terciario: string;

  header_imagen_background: string | null;
  header_imagen_background_opacidad: number;
  header_video_background: string | null;
  header_video_background_opacidad: number;

  buscador_tipografia: string | null;
  buscador_tipografia_color: string;
  buscador_tipografia_color_label: string;
  buscador_inputColor: string;
  buscador_inputFondoColor: string;
  buscador_color_primario: string;
  buscador_color_secundario: string;
  buscador_color_terciario: string;

  publicidad_existe: boolean;
  publicidad_titulo: string | null;
  publicidad_tipografia_color: string;
  publicidad_color_primario: string;
  publicidad_color_secundario: string;
  publicidad_color_terciario: string;
  publicidad_imagen_1: string | null;
  publicidad_imagen_2: string | null;
  publicidad_imagen_3: string | null;

  tarjetas_titulo: string | null;
  tarjetas_tipografia: string | null;
  tarjetas_tipografia_color: string;
  tarjetas_tipografia_color_titulo: string;
  tarjetas_tipografia_color_contenido: string;
  tarjetas_color_primario: string;
  tarjetas_color_secundario: string;
  tarjetas_color_terciario: string;

  banner_registro_titulo: string | null;
  banner_registro_tipografia_color: string;
  banner_registro_color_primario: string;
  banner_registro_color_secundario: string;
  banner_registro_color_terciario: string;

  quienes_somos_es: string | null;
  quienes_somos_en: string | null;
  quienes_somos_pt: string | null;

  footer_texto: string | null;
  footer_tipografia: string | null;
  footer_tipografia_color: string;
  footer_facebook: string | null;
  footer_twitter: string | null;
  footer_instagram: string | null;
  footer_whatsapp: string | null;
  footer_telefono: string | null;
  footer_email: string | null;
  footer_direccion: string | null;
  footer_ciudad: string | null;
  footer_pais: string | null;
  footer_color_primario: string | null;
  footer_color_secundario: string | null;
  footer_color_terciario: string | null;
}


export function transformarAgenciaBackData(data: AgenciaBackData): DatosAgencia {
  return {
    idAgencia: data.idAgencia,
    nombreAgencia: data.nombre,
    logoAgencia: data.logo,
    tipografiaAgencia: data.tipografia_agencia,
    colorTipografiaAgencia: data.color_tipografia_agencia,
    colorFondoApp: data.color_fondo_app,
    color: {
      primario: data.color_principal,
      secundario: data.color_secundario,
      terciario: data.color_terciario,
    },

    header: {
      imagenBackground: data.header_imagen_background,
      imagenBackgroundOpacidad: data.header_imagen_background_opacidad,
      videoBackground: data.header_video_background,
      videoBackgroundOpacidad: data.header_video_background_opacidad,
    },

    buscador: {
      tipografia: data.buscador_tipografia,
      tipografiaColor: data.buscador_tipografia_color,
      tipografiaColorLabel: data.buscador_tipografia_color_label,
      inputColor: data.buscador_inputColor,
      inputFondoColor: data.buscador_inputFondoColor,
      color: {
        primario: data.buscador_color_primario,
        secundario: data.buscador_color_secundario,
        terciario: data.buscador_color_terciario,
      },
    },

    publicidadCliente: {
      existe: data.publicidad_existe,
      titulo: data.publicidad_titulo,
      tipografiaColor: data.publicidad_tipografia_color,
      color: {
        primario: data.publicidad_color_primario,
        secundario: data.publicidad_color_secundario,
        terciario: data.publicidad_color_terciario,
      },
      imagenes: [
        data.publicidad_imagen_1,
        data.publicidad_imagen_2,
        data.publicidad_imagen_3,
      ],
    },

    tarjetas: {
      titulo: data.tarjetas_titulo,
      tipografia: data.tarjetas_tipografia,
      tipografiaColor: data.tarjetas_tipografia_color,
      tipografiaColorTitulo: data.tarjetas_tipografia_color_titulo,
      tipografiaColorContenido: data.tarjetas_tipografia_color_contenido,
      color: {
        primario: data.tarjetas_color_primario,
        secundario: data.tarjetas_color_secundario,
        terciario: data.tarjetas_color_terciario,
      },
    },

    bannerRegistro: {
      titulo: data.banner_registro_titulo,
      tipografiaColor: data.banner_registro_tipografia_color,
      color: {
        primario: data.banner_registro_color_primario,
        secundario: data.banner_registro_color_secundario,
        terciario: data.banner_registro_color_terciario,
      },
    },

    quienesSomos: {
      quienes_somos_es: data.quienes_somos_es,
      quienes_somos_en: data.quienes_somos_en,
      quienes_somos_pt: data.quienes_somos_pt,
    },

    footer: {
      texto: data.footer_texto,
      tipografia: data.footer_tipografia,
      tipografiaColor: data.footer_tipografia_color,
      color: {
        primario: data.footer_color_primario,
        secundario: data.footer_color_secundario,
        terciario: data.footer_color_terciario,
      },
      redes: {
        facebook: data.footer_facebook,
        twitter: data.footer_twitter,
        instagram: data.footer_instagram,
        whatsapp: data.footer_whatsapp,
      },
      contacto: {
        telefono: data.footer_telefono,
        email: data.footer_email,
      },
      ubicacion: {
        direccion: data.footer_direccion,
        ciudad: data.footer_ciudad,
        pais: data.footer_pais,
      },
    },
  };
}
