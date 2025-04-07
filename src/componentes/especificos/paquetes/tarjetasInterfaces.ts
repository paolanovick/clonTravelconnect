export interface HotelData {
    nombre: string;
    id_hotel: string;
    categoria_hotel: string;
  }
  
  export interface SalidaData {
    id: number;
    paquete_id: number;
    fecha_desde: string | null;
    fecha_hasta: string | null;
    fecha_viaje?: string;
    single_precio?: number;
    single_impuesto?: number;
    single_otro?: number;
    single_otro2?: number;
    doble_precio?: number;
    doble_impuesto?: number;
    doble_otro?: number;
    doble_otro2?: number;
    triple_precio?: number;
    triple_impuesto?: number;
    triple_otro?: number;
    triple_otro2?: number;
    cuadruple_precio?: number;
    cuadruple_impuesto?: number;
    cuadruple_otro?: number;
    cuadruple_otro2?: number;
  }
  
  export interface PaqueteData {
    id: string;
    titulo: string;
    imagen: string;
    fechaSalida: string;
    duracion: string;
    regimen: string;
    destinos: string;
    tarifa: number | null | undefined;
    impuestos: number | null | undefined;
    total: number | null | undefined;
    hoteles?: Array<{ hotel: HotelData }>;
    descripcion?: string | null;
    salidas?: SalidaData[];
    transporte?: string;
    usuario?: string;
  }
  
  export interface TarjetaPaqueteProps {
    paquete: PaqueteData;
    cargando?: boolean;
    
  }