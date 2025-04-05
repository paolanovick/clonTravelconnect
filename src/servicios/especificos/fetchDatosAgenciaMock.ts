import { AgenciaBackData } from "./transformarAgenciaBackData";
import { datosAgenciaSimuladaBack } from "./datosAgenciaSimulada";

export const fetchDatosAgenciaMock = async (): Promise<AgenciaBackData> => {
  console.warn("🔌 MODO MOCK: usando datos locales simulados");
  return datosAgenciaSimuladaBack;
};
