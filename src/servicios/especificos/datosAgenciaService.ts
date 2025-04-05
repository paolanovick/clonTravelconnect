import { DatosAgencia } from "../../interfaces/datosAgencia";
import { transformarAgenciaBackData, AgenciaBackData } from "./transformarAgenciaBackData";
import { fetchDatosAgenciaMock } from "./fetchDatosAgenciaMock";
import { fetchDatosAgenciaReal } from "./fetchDatosAgenciaReal";

const usarMock = true;

export const fetchDatosAgencia = async (): Promise<DatosAgencia> => {
  const datosBack: AgenciaBackData = usarMock
    ? await fetchDatosAgenciaMock()
    : await fetchDatosAgenciaReal();

  return transformarAgenciaBackData(datosBack);
};
