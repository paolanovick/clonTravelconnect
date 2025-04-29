import React, { createContext, useContext, useState } from "react";

// 🔹 Tipo personalizado para viajeros
interface Viajeros {
  adultos: number;
  menores: number;
}

interface FormularioContextProps {
  ciudadOrigen: string;
  destino: string;
  fechaSalida: Date | null;
  viajeros: Viajeros;
  setCiudadOrigen: (ciudad: string) => void;
  setDestino: (destino: string) => void;
  setFechaSalida: (fecha: Date | null) => void;
  setViajeros: (viajeros: Viajeros) => void;
  enviarFormulario: () => void;
  resetFormulario: () => void;
}

const FormularioContext = createContext<FormularioContextProps | undefined>(undefined);

export const FormularioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ciudadOrigen, setCiudadOrigen] = useState<string>("");
  const [destino, setDestino] = useState<string>("");
  const [fechaSalida, setFechaSalida] = useState<Date | null>(null);
  const [viajeros, setViajeros] = useState<Viajeros>({ adultos: 1, menores: 0 });

  const enviarFormulario = () => {
    console.log("Formulario enviado:", { ciudadOrigen, destino, fechaSalida, viajeros });
  };

  const resetFormulario = () => {
    setCiudadOrigen("");
    setDestino("");
    setFechaSalida(null);
    setViajeros({ adultos: 1, menores: 0 });
  };

  return (
    <FormularioContext.Provider
      value={{
        ciudadOrigen,
        destino,
        fechaSalida,
        viajeros,
        setCiudadOrigen,
        setDestino,
        setFechaSalida,
        setViajeros,
        enviarFormulario,
        resetFormulario,
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
};

export const useFormulario = () => {
  const context = useContext(FormularioContext);
  if (!context) {
    throw new Error("useFormulario debe ser usado dentro de un FormularioProvider");
  }
  return context;
};
