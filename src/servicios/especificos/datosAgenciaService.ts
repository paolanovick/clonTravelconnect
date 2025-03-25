import { DatosAgencia } from "../../interfaces/datosAgencia";

/** ✅ Cambiá esto a false para usar datos simulados */
const buscar = false;

/** 🧪 Preset local si no se busca en el backend */
const datosAgenciaPreset: DatosAgencia = {
  idAgencia: "002",
  nombreAgencia: "Citrus Energía",
  logoAgencia: "/logo2.png",
  tipografiaAgencia: "Verdana",
  colorTipografiaAgencia: "#212121",
  colorFondoApp: "#F3F3F3",
  color: {
    primario: "#FF9800",
    secundario: "#FFCC80",
    terciario: "#E65100",
  },
  header: {
    imagenBackground: "/desierto.jpg",
    imagenBackgroundOpacidad: 0.2,
    videoBackground: "/video2.mp4",
    videoBackgroundOpacidad: 0.3,
  },
  buscador: {
    tipografia: "Verdana",
    tipografiaColor: "#FFFFFF",
    tipografiaColorLabel: "#FF9800",
    inputColor: "#212121",
    inputFondoColor: "#FFFFFF",
    color: {
      primario: "#FF9800",
      secundario: "#FFCC80",
      terciario: "white",
    },
  },
  publicidadCliente: {
    existe: true,
    titulo: "Hola pao",
    tipografiaColor: "#FF9800",
    color: {
      primario: "#FF9800",
      secundario: "#FFCC80",
      terciario: "#E65100",
    },
    imagenes: ["/publicidad1.jpg", "/publicidad2.jpg", "/publicidad3.jpg"],
  },
  tarjetas: {
    titulo: "Nuestros Destacados",
    tipografia: "Verdana",
    tipografiaColor: "white",
    tipografiaColorTitulo: "#FF9800",
    tipografiaColorContenido: "#555555",
    color: {
      primario: "#FF9800",
      secundario: "#FFCC80",
      terciario: "#E65100",
    },
  },
  bannerRegistro: {
    titulo: "Registrate y descubrí más",
    tipografiaColor: "#FFFFFF",
    color: {
      primario: "#FF9800",
      secundario: "#FFCC80",
      terciario: "#E65100",
    },
  },
  footer: {
    texto: "© 2025 Citrus Energía - Todos los derechos reservados",
    tipografia: "Verdana",
    tipografiaColor: "#212121",
    color: {
      primario: "#FF9800",
      secundario: "#FFCC80",
      terciario: "#E65100",
    },
    redes: {
      facebook: "https://facebook.com/citrusenergia",
      twitter: "https://twitter.com/citrusenergia",
      instagram: "https://instagram.com/citrusenergia",
      whatsapp: "https://wa.me/5491123456789",
    },
    contacto: {
      telefono: "+54 9 11 2345-6789",
      email: "info@citrusenergia.com",
    },
    ubicacion: {
      direccion: "Calle Falsa 123",
      ciudad: "Bahía Blanca",
      pais: "Argentina",
    },
  },
};

/** 📡 Servicio que obtiene la agencia automáticamente */
export const fetchDatosAgencia = async (): Promise<DatosAgencia> => {
  if (!buscar) {
    console.warn("🔌 MODO MOCK: usando datos locales simulados");
    return datosAgenciaPreset;
  }

  const response = await fetch("http://triptest.com.ar/agencia", {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la agencia");
  }

  const datos = await response.json();
  return datos as DatosAgencia;
};
