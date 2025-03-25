import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DatosAgenciaProvider } from "./contextos/DatosAgenciaContext"; // ✅ Contexto principal
import { PaquetesProvider } from "./contextos/PaquetesContext"; // ✅ Contexto de paquetes
import { FormularioProvider } from "./contextos/FormularioContext"; // ✅ Nuevo contexto de formulario
import { FiltrosYOrdenamientoProvider } from "./contextos/FiltrosYOrdenamientoContext";
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
    <DatosAgenciaProvider> {/* ✅ Contexto de datos de la agencia */}
      <PaquetesProvider> {/* ✅ Contexto de paquetes */}
        <FormularioProvider> {/* ✅ Nuevo contexto de formulario */}
        <FiltrosYOrdenamientoProvider>
          <App />
        </FiltrosYOrdenamientoProvider>
        </FormularioProvider>
      </PaquetesProvider>
    </DatosAgenciaProvider>
  </React.StrictMode>
);