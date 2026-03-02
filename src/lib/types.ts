export interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  nascimento: string;
  cat: string;
  vip: string;
  status: string;
  matricula: string;
}

export interface Instrutor {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
  categorias: string;
  validade: string;
  telefone: string;
  turno: string;
  status: string;
}

export interface Prova {
  id: number;
  aluno: string;
  tipo: string;
  data: string;
  hora: string;
  local: string;
  status: string;
  instrutor: string;
}

export interface Entrada {
  id: number;
  data: string;
  descricao: string;
  forma: string;
  valor: number;
  parcela: string;
  vencimento: string;
  cpf: string;
  cat: string;
}

export interface Saida {
  id: number;
  data: string;
  descricao: string;
  categoria: string;
  fornecedor: string;
  valor: number;
  doc: string;
  forma: string;
  obs?: string;
}
