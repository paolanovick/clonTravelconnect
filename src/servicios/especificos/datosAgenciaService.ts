import { DatosAgencia } from "../../interfaces/datosAgencia";

/** ✅ Cambiá esto a false para usar datos simulados */
const buscar = false;

/** 🧪 Preset local si no se busca en el backend */
const datosAgenciaPreset: DatosAgencia = {
  idAgencia: "003",
  nombreAgencia: "VaGú Viajes",
  logoAgencia: "/logo2.png",
  tipografiaAgencia: "Verdana",
  colorTipografiaAgencia: "#212121",
  colorFondoApp: "#F3F3F3",
  color: {
    primario: "#6A0DAD",
    secundario: "#CBAEF0",
    terciario: "#3E0073",
  },
  header: {
    imagenBackground: "/fondo-playa.jpg",
    imagenBackgroundOpacidad: 0.2,
    videoBackground: "/video1.mp4",
    videoBackgroundOpacidad: 0.3,
  },
  buscador: {
    tipografia: "Verdana",
    tipografiaColor: "#FFFFFF",
    tipografiaColorLabel: "#6A0DAD",
    inputColor: "#212121",
    inputFondoColor: "#FFFFFF",
    color: {
      primario: "#6A0DAD",
      secundario: "#CBAEF0",
      terciario: "white",
    },
  },
  publicidadCliente: {
    existe: true,
    titulo: "Ofertas imperdibles",
    tipografiaColor: "#6A0DAD",
    color: {
      primario: "#6A0DAD",
      secundario: "#CBAEF0",
      terciario: "#3E0073",
    },
    imagenes: ["paginaWeb/arboleda.jpg", "paginaWeb/colombia.jpg", "paginaWeb/rocas.jpg"],
  },
  tarjetas: {
    titulo: "Destinos recomendados",
    tipografia: "Verdana",
    tipografiaColor: "white",
    tipografiaColorTitulo: "#6A0DAD",
    tipografiaColorContenido: "#555555",
    color: {
      primario: "#6A0DAD",
      secundario: "#D6B7ED",
      terciario: "#3E0073",
    },
  },
  bannerRegistro: {
    titulo: "Registrate y viajá con nosotros",
    tipografiaColor: "#FFFFFF",
    color: {
      primario: "#6A0DAD",
      secundario: "#CBAEF0",
      terciario: "#3E0073",
    },
  },
  footer: {
    texto: "© 2025 VaGú Viajes - Todos los derechos reservados",
    tipografia: "Verdana",
    tipografiaColor: "white",
    color: {
      primario: "#6A0DAD",
      secundario: "#CBAEF0",
      terciario: "#2E005A",
    },
    redes: {
      facebook: "https://facebook.com/vaguviajes",
      twitter: "https://twitter.com/vaguviajes",
      instagram: "https://instagram.com/vaguviajes",
      whatsapp: "https://wa.me/5491123456789",
    },
    contacto: {
      telefono: "+54 9 11 2345-6789",
      email: "info@vaguviajes.com",
    },
    ubicacion: {
      direccion: "Dr. José Ramón Aguirre 3236",      
      ciudad: "Córdoba, Residencial Vélez Sarsfield",
      pais: "Argentina",
    },
  }
};

/** 📡 Servicio que obtiene la agencia automáticamente */
export const fetchDatosAgencia = async (): Promise<DatosAgencia> => {
  if (!buscar) {
    console.warn("🔌 MODO MOCK: usando datos locales simulados");
    return datosAgenciaPreset;
  }

  const response = await fetch("https://triptest.com.ar/agencia", {
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
