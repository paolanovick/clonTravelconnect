// Simulaciones de diferentes agencias de turismo
const SIMULACIONES = {
    agencia1: {
      idAgencia: "12345",
      nombreAgencia: "Viajes Express",
      logoAgencia: "/assets/logos/viajes_express.png",
      tipografiaAgencia: "Arial",
      colorTipografiaAgencia: "#222222",
      colorFondoAgencia: "#F5F5F5",
      colorPrincipalAgencia: "#FF5733",
      colorSecundarioAgencia: "#33FF57",
      colorTerciarioAgencia: "#0055AA",
      header: {
        imagenBackground: "/assets/header_bg.jpg",
        imagenBackgroundOpacidad: 0.8
      },
      buscador: {
        tipografia: "Roboto",
        tipografiaColor: "#111111",
        fondoColor: "#FFFFFF",
        inputColor: "#CCCCCC",
        calendarioColorPrimario: "#FF5733",
        calendarioColorSecundario: "#33FF57",
        botonBuscarColor: "#FF5733",
        tabsColor: "#0055AA"
      },
      footer: {
        texto: "Viajes Express © 2025",
        tipografia: "Tahoma",
        tipografiaColor: "#FFFFFF",
        fondoColor: "#000000",
        iconosColor: "#FF5733",
        redes: {
          facebook: "https://facebook.com/viajesexpress",
          twitter: "https://twitter.com/viajesexpress"
        },
        datos: {
          telefono: "+54 9 11 2345 6789",
          email: "contacto@viajesexpress.com",
          ubicacion: "Buenos Aires, Argentina",
          direccion: "Av. Siempre Viva 123"
        }
      }
    },
  
    agencia2: {
      idAgencia: "67890",
      nombreAgencia: "Turismo Aventura",
      logoAgencia: "/assets/logos/turismo_aventura.png",
      tipografiaAgencia: "Georgia",
      colorTipografiaAgencia: "#FFFFFF",
      colorFondoAgencia: "#333333",
      colorPrincipalAgencia: "#FFA500",
      colorSecundarioAgencia: "#FF0000",
      colorTerciarioAgencia: "#008000",
      header: {
        imagenBackground: "/assets/header_bg2.jpg",
        imagenBackgroundOpacidad: 0.9
      },
      buscador: {
        tipografia: "Courier New",
        tipografiaColor: "#FFFFFF",
        fondoColor: "#444444",
        inputColor: "#BBBBBB",
        calendarioColorPrimario: "#FFA500",
        calendarioColorSecundario: "#FF0000",
        botonBuscarColor: "#FFA500",
        tabsColor: "#008000"
      },
      footer: {
        texto: "Turismo Aventura © 2025",
        tipografia: "Verdana",
        tipografiaColor: "#FFFFFF",
        fondoColor: "#222222",
        iconosColor: "#FFA500",
        redes: {
          facebook: "https://facebook.com/turismoaventura",
          instagram: "https://instagram.com/turismoaventura"
        },
        datos: {
          telefono: "+54 9 11 5678 9101",
          email: "info@turismoaventura.com",
          ubicacion: "Mendoza, Argentina",
          direccion: "Calle de la Montaña 456"
        }
      }
    },
  
    agencia3: {
      idAgencia: "54321",
      nombreAgencia: "Relax & Travel",
      logoAgencia: "/assets/logos/relax_travel.png",
      tipografiaAgencia: "Times New Roman",
      colorTipografiaAgencia: "#000000",
      colorFondoAgencia: "#E0FFFF",
      colorPrincipalAgencia: "#87CEEB",
      colorSecundarioAgencia: "#4682B4",
      colorTerciarioAgencia: "#B0C4DE",
      header: {
        imagenBackground: "/assets/header_bg3.jpg",
        imagenBackgroundOpacidad: 0.7
      },
      buscador: {
        tipografia: "Comic Sans MS",
        tipografiaColor: "#000000",
        fondoColor: "#F0FFFF",
        inputColor: "#ADD8E6",
        calendarioColorPrimario: "#87CEEB",
        calendarioColorSecundario: "#4682B4",
        botonBuscarColor: "#87CEEB",
        tabsColor: "#B0C4DE"
      },
      footer: {
        texto: "Relax & Travel © 2025",
        tipografia: "Arial",
        tipografiaColor: "#000000",
        fondoColor: "#E0FFFF",
        iconosColor: "#4682B4",
        redes: {
          whatsapp: "https://wa.me/549113456789"
        },
        datos: {
          telefono: "+54 9 11 3456 7890",
          email: "contact@relaxtravel.com",
          ubicacion: "Bariloche, Argentina",
          direccion: "Av. del Lago 789"
        }
      }
    }
  };
  
  // Función para cambiar la simulación
  window.cambiarSimulacion = function (agencia) {
    if (SIMULACIONES[agencia]) {
      window.__DATOS_AGENCIA__ = SIMULACIONES[agencia];
  
      // Actualiza el meta tag
      let metaTag = document.querySelector("meta[name='datos-agencia']");
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = "datos-agencia";
        document.head.appendChild(metaTag);
      }
      metaTag.content = JSON.stringify(window.__DATOS_AGENCIA__);
  
      // Recargar la página para aplicar los cambios
      location.reload();
    }
  };
  
  // Inicializar con la primera simulación por defecto
  window.__DATOS_AGENCIA__ = SIMULACIONES.agencia1;
  