export interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  created_at?: Date;
  updated_at?: Date;
}
