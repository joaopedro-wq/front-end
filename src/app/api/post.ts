export interface Post {
  id?: number;
  usuario_id: number;
  assunto: string;
  equipamento: string;
  descricao: string;
  data_postagem?: Date;
  created_at?: Date;
  updated_at?: Date;
}
