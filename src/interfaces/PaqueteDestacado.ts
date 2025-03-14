export interface PaqueteDestacado {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: number; // 🔥 Se asegura que esté presente en todos los usos
  imagen: string;
  precio: number;
  fecha: string;
}
