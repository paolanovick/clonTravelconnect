import { DatosAgencia } from "../../interfaces/datosAgencia";
import { transformarAgenciaBackData, AgenciaBackData } from "./transformarAgenciaBackData";
import { fetchDatosAgenciaReal } from "./fetchDatosAgenciaReal";

export const fetchDatosAgencia = async (): Promise<DatosAgencia> => {
  const datosBack: AgenciaBackData = await fetchDatosAgenciaReal();
  return transformarAgenciaBackData(datosBack);
};
