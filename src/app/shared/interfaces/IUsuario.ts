import { IHorario } from "./IHorario";

export interface IUsuario {
  nomeCompleto?: string;
  dataNascimento?: Date;
  cpf?: string;
  id?: number;
  email?: string;
  horarios?: IHorario[];
}
