import React, { createContext, useContext, useState } from "react";
import { PaqueteDestacado } from "../interfaces/PaqueteDestacado";

interface PaquetesContextProps {
  paquetes: PaqueteDestacado[];
  cargarPaquetes: (nuevosPaquetes: PaqueteDestacado[]) => void;
}

const PaquetesContext = createContext<PaquetesContextProps | undefined>(undefined);

export const PaquetesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paquetes, setPaquetes] = useState<PaqueteDestacado[]>([]); // 🔥 Ahora inicia vacío

  const cargarPaquetes = (nuevosPaquetes: PaqueteDestacado[]) => {
    console.log("Actualizando paquetes:", nuevosPaquetes);
    setPaquetes(nuevosPaquetes);
  };

  return (
    <PaquetesContext.Provider value={{ paquetes, cargarPaquetes }}>
      {children}
    </PaquetesContext.Provider>
  );
};

export const usePaquetes = (): PaquetesContextProps => {
  const context = useContext(PaquetesContext);
  if (!context) {
    throw new Error("usePaquetes debe ser usado dentro de un PaquetesProvider");
  }
  return context;
};
