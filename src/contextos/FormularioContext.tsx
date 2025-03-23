import React, { createContext, useContext, useState } from "react";

interface FormularioContextProps {
  ciudadOrigen: string;
  destino: string;
  fechaSalida: Date | null;
  viajeros: number;
  setCiudadOrigen: (ciudad: string) => void;
  setDestino: (destino: string) => void;
  setFechaSalida: (fecha: Date | null) => void;
  setViajeros: (viajeros: number) => void;
  enviarFormulario: () => void; // 🔥 Solo guarda los datos
  resetFormulario: () => void;  // 🔥 Nueva función para resetear los campos
}

const FormularioContext = createContext<FormularioContextProps | undefined>(undefined);

export const FormularioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ciudadOrigen, setCiudadOrigen] = useState<string>("");
  const [destino, setDestino] = useState<string>("");
  const [fechaSalida, setFechaSalida] = useState<Date | null>(null);
  const [viajeros, setViajeros] = useState<number>(1);

  const enviarFormulario = () => {
    console.log("Formulario enviado:", { ciudadOrigen, destino, fechaSalida, viajeros });
    // 🚀 Ahora ya no resetea automáticamente
  };

  const resetFormulario = () => {
    setCiudadOrigen("");
    setDestino("");
    setFechaSalida(null);
    setViajeros(1);
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
        enviarFormulario, // 🔥 Ahora solo guarda datos
        resetFormulario,  // 🔥 Nueva función para limpiar el formulario
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
