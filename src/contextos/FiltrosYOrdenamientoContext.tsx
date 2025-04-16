import React, { createContext, useContext, useState, useEffect } from "react";

// Tipos
type Orden = "asc" | "desc" | null;

export interface Filtros {
  ciudades: string[];
  hoteles: string[];
  regimenes: string[];
  estrellas: [number, number];
  precio: [number, number];
  duracion: [number, number];
  habitaciones: string[];
  serviciosIncluidos: string[];
  aerolineas: string[];
  ciudadesOrigenVuelo: string[];
  ciudadesDestinoVuelo: string[];
  tipoMoneda: string[];
  ventaOnline: boolean;
}

export interface Ordenamientos {
  salida: Orden;
  precio: Orden;
  nombre: Orden;
  duracion: Orden;
}

interface FiltrosYOrdenamientoContextType {
  filtros: Filtros;
  ordenamientos: Ordenamientos;
  prioridadOrdenamientos: (keyof Ordenamientos)[];
  setFiltros: (nuevosFiltros: Partial<Filtros>) => void;
  setOrdenamientos: (campo: keyof Ordenamientos, orden: Orden) => void;
  setPrioridadOrdenamientos: (prioridades: (keyof Ordenamientos)[]) => void;
  resetFiltrosYOrdenamientos: () => void;
}

// Estado por defecto
const filtrosIniciales: Filtros = {
  ciudades: [],
  hoteles: [],
  regimenes: [],
  estrellas: [1, 5],
  precio: [0, 10000],
  duracion: [1, 30],
  habitaciones: [],
  serviciosIncluidos: [],
  aerolineas: [],
  ciudadesOrigenVuelo: [],
  ciudadesDestinoVuelo: [],
  tipoMoneda: [],
  ventaOnline: false,
};

const ordenamientosIniciales: Ordenamientos = {
  salida: null,
  precio: null,
  nombre: null,
  duracion: null,
};

// Contexto
const FiltrosYOrdenamientoContext = createContext<FiltrosYOrdenamientoContextType | undefined>(undefined);

// Provider
export const FiltrosYOrdenamientoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filtros, setFiltrosState] = useState<Filtros>(filtrosIniciales);
  const [ordenamientos, setOrdenamientosState] = useState<Ordenamientos>(ordenamientosIniciales);
  const [prioridadOrdenamientos, setPrioridadOrdenamientos] = useState<(keyof Ordenamientos)[]>([]);

  const setFiltros = (nuevosFiltros: Partial<Filtros>) => {
    setFiltrosState((prev) => ({ ...prev, ...nuevosFiltros }));
  };

  const setOrdenamientos = (campo: keyof Ordenamientos, orden: Orden) => {
    setOrdenamientosState((prev) => ({ ...prev, [campo]: orden }));
    setPrioridadOrdenamientos((prev) => {
      const sinCampo = prev.filter((p) => p !== campo);
      return [...sinCampo, campo];
    });
  };

  const resetFiltrosYOrdenamientos = () => {
    setFiltrosState(filtrosIniciales);
    setOrdenamientosState(ordenamientosIniciales);
    setPrioridadOrdenamientos([]);
    localStorage.removeItem("filtros");
    localStorage.removeItem("ordenamientos");
    localStorage.removeItem("prioridadOrdenamientos");
  };

  useEffect(() => {
    const filtrosLS = localStorage.getItem("filtros");
    const ordenamientosLS = localStorage.getItem("ordenamientos");
    const prioridadesLS = localStorage.getItem("prioridadOrdenamientos");

    if (filtrosLS) setFiltrosState(JSON.parse(filtrosLS));
    if (ordenamientosLS) setOrdenamientosState(JSON.parse(ordenamientosLS));
    if (prioridadesLS) setPrioridadOrdenamientos(JSON.parse(prioridadesLS));
  }, []);

  useEffect(() => {
    localStorage.setItem("filtros", JSON.stringify(filtros));
    localStorage.setItem("ordenamientos", JSON.stringify(ordenamientos));
    localStorage.setItem("prioridadOrdenamientos", JSON.stringify(prioridadOrdenamientos));
  }, [filtros, ordenamientos, prioridadOrdenamientos]);

  return (
    <FiltrosYOrdenamientoContext.Provider
      value={{
        filtros,
        ordenamientos,
        prioridadOrdenamientos,
        setFiltros,
        setOrdenamientos,
        setPrioridadOrdenamientos,
        resetFiltrosYOrdenamientos,
      }}
    >
      {children}
    </FiltrosYOrdenamientoContext.Provider>
  );
};

// Hook personalizado
export const useFiltrosYOrdenamiento = () => {
  const context = useContext(FiltrosYOrdenamientoContext);
  if (!context) throw new Error("useFiltrosYOrdenamiento debe usarse dentro de FiltrosYOrdenamientoProvider");
  return context;
};
