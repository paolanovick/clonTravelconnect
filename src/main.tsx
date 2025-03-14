import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DatosAgenciaProvider } from "./contextos/DatosAgenciaContext"; // ✅ Nuevo contexto principal
import { PaquetesProvider } from "./contextos/PaquetesContext"; // ✅ Se mantiene el contexto de paquetes

// Obtener el elemento root
const rootElement = document.getElementById("root");

// Verificar si el elemento root existe
if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root'. Asegúrate de que index.html contiene <div id='root'></div>.");
}

// Crear el root de React
const root = ReactDOM.createRoot(rootElement);

// Renderizar la aplicación
root.render(
  <React.StrictMode>
    <DatosAgenciaProvider> {/* ✅ Ahora maneja la inyección de datos de la agencia */}
      <PaquetesProvider>
        <App />
      </PaquetesProvider>
    </DatosAgenciaProvider>
  </React.StrictMode>
);
