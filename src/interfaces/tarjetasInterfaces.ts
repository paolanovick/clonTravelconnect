export interface HotelData {
  nombre: string;
  id_hotel: number;
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

  familia_1_precio?: number;
  familia_1_impuesto?: number;
  familia_1_otro?: number;
  familia_1_otro2?: number;

  familia_2_precio?: number;
  familia_2_impuesto?: number;
  familia_2_otro?: number;
  familia_2_otro2?: number;

  cupos?: number;
  salida_externo_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VueloData {
  clase_vuelo: string;
  destino_ciudad: string;
  destino_fecha: string;
  destino_hora: string | null;
  escalas: string;
  linea_aerea: string;
  origen_ciudad: string;
  origen_fecha: string;
  origen_hora: string | null;
  vuelo: string;
}

export interface PaqueteData {
  id: number;
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

  paquete_externo_id?: string;
  ciudad?: string;
  ciudad_iata?: string;
  pais?: string;
  edad_menores?: number;
  venta_online?: number;
  info_tramos?: number;
  activo?: boolean;
  created_at?: string;
  updated_at?: string;
  fecha_modificacion?: string;
  fecha_vigencia_desde?: string;
  fecha_vigencia_hasta?: string;
  galeria_imagenes?: string | null;
  usuario_id?: number;
  tipo_moneda?: string;
  tipo_producto?: string;
  categorias?: string;
  componentes?: string;

  ida_clase_vuelo?: string;
  ida_destino_ciudad?: string;
  ida_destino_fecha?: string;
  ida_destino_hora?: string | null;
  ida_escalas?: string;
  ida_linea_aerea?: string;
  ida_origen_ciudad?: string;
  ida_origen_fecha?: string;
  ida_origen_hora?: string | null;
  ida_vuelo?: string;

  vuelta_clase_vuelo?: string;
  vuelta_destino_ciudad?: string;
  vuelta_destino_fecha?: string;
  vuelta_destino_hora?: string | null;
  vuelta_escalas?: string;
  vuelta_linea_aerea?: string;
  vuelta_origen_ciudad?: string;
  vuelta_origen_fecha?: string;
  vuelta_origen_hora?: string | null;
  vuelta_vuelo?: string;
}
