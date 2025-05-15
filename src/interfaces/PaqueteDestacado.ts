export interface PaqueteDestacado {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: number;
  imagen: string;
  precio: number;
  fecha: string;
  moneda: string; // ✅ Agregado para mostrar tipo de divisa en el componente
}
