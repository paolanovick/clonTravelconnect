import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { DatosAgencia } from "../interfaces/datosAgencia";

/** Definimos el tipo del contexto */
interface DatosAgenciaContextType {
  datosAgencia: DatosAgencia | null;
  cargando: boolean;
  setDatosAgencia: (datos: DatosAgencia | null) => void;
}

/** Creamos el contexto */
export const DatosAgenciaContext = createContext<DatosAgenciaContextType | null>(null);

/** 📌 Componente Provider */
export const DatosAgenciaProvider = ({ children }: { children: ReactNode }) => {
  const [datosAgencia, setDatosAgencia] = useState<DatosAgencia | null>(
    window.__DATOS_AGENCIA__ || obtenerDatosDesdeMeta() || null
  );
  const [cargando, setCargando] = useState<boolean>(!datosAgencia); // 🔥 Estado de carga

  /** 📌 Escuchar cambios en la simulación */
  useEffect(() => {
    const handleCambioSimulacion = () => {
      setTimeout(() => {
        const nuevosDatos = window.__DATOS_AGENCIA__ || null; // 🔥 Asegura que no haya `undefined`
        if (nuevosDatos !== datosAgencia) {
          setDatosAgencia(nuevosDatos);
          setCargando(false);
        }
      }, 100);
    };

    window.addEventListener("cambioSimulacion", handleCambioSimulacion);
    return () => window.removeEventListener("cambioSimulacion", handleCambioSimulacion);
  }, [datosAgencia]);

  return (
    <DatosAgenciaContext.Provider value={{ datosAgencia, cargando, setDatosAgencia }}>
      {children}
    </DatosAgenciaContext.Provider>
  );
};

/** 📌 Hook general para obtener todo el contexto */
export const useDatosAgencia = () => {
  const contexto = useContext(DatosAgenciaContext);
  if (!contexto) {
    throw new Error("useDatosAgencia debe ser usado dentro de un DatosAgenciaProvider");
  }
  return contexto;
};

/** 📌 Hooks específicos para acceder a secciones individuales */
export const useDatosGenerales = () => {
  const { datosAgencia } = useDatosAgencia();
  return datosAgencia
    ? {
        idAgencia: datosAgencia.idAgencia,
        nombreAgencia: datosAgencia.nombreAgencia,
        logoAgencia: datosAgencia.logoAgencia,
        tipografiaAgencia: datosAgencia.tipografiaAgencia,
        colorTipografiaAgencia: datosAgencia.colorTipografiaAgencia,
        colorFondoAgencia: datosAgencia.colorFondoAgencia,
        colorPrincipalAgencia: datosAgencia.colorPrincipalAgencia,
        colorSecundarioAgencia: datosAgencia.colorSecundarioAgencia,
        colorTerciarioAgencia: datosAgencia.colorTerciarioAgencia,
      }
    : null;
};

export const useHeader = () => useDatosAgencia().datosAgencia?.header ?? null;
export const useBuscador = () => useDatosAgencia().datosAgencia?.buscador ?? null;
export const usePublicidadCliente = () => useDatosAgencia().datosAgencia?.publicidadCliente ?? null;
export const useDestacadosMes = () => useDatosAgencia().datosAgencia?.destacadosMes ?? null;
export const useBannerRegistro = () => useDatosAgencia().datosAgencia?.bannerRegistro ?? null;
export const useFooter = () => useDatosAgencia().datosAgencia?.footer ?? null;

/** 📌 Función auxiliar para obtener datos desde `meta` tag */
const obtenerDatosDesdeMeta = (): DatosAgencia | null => {
  const meta = document.querySelector("meta[name='datos-agencia']");
  if (!meta) return null;
  try {
    return JSON.parse(meta.getAttribute("content") || "{}") as DatosAgencia;
  } catch (error) {
    console.error("Error al parsear datos-agencia desde meta:", error);
    return null;
  }
};

/** 📌 Extendemos la interfaz `Window` al final para evitar errores con Fast Refresh */
declare global {
  interface Window {
    __DATOS_AGENCIA__?: DatosAgencia;
  }
}