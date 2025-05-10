export interface User {
  /** MongoDB _id en formato string */
  _id: string;

  /** Nombre completo del usuario */
  name: string;

  /** Email único del usuario */
  email: string;

  /** Fecha de creación en ISO string */
  createdAt: string;

  /**
   * Contraseña enhashada (solo la usa el backend;
   * opcional en el frontend para evitar exponerla)
   */
  password?: string;
}