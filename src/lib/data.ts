export const mockAlunos = [
  { id: 1, nome: "Guilherme Rezende", cpf: "123.456.789-00", email: "guilherme@exemplo.com", telefone: "(31) 98888-1111", nascimento: "15/05/1998", cat: "B", vip: "SIM", status: "Ativo", matricula: "20/01/2024" },
  { id: 2, nome: "Ana Beatriz Silva", cpf: "234.567.890-11", email: "ana.b@exemplo.com", telefone: "(31) 97777-2222", nascimento: "22/09/2001", cat: "A/B", vip: "NÃO", status: "Pendente", matricula: "12/02/2024" },
  { id: 3, nome: "Lucas Oliveira Martins", cpf: "345.678.901-22", email: "lucas.o@exemplo.com", telefone: "(31) 96666-3333", nascimento: "10/01/1995", cat: "B", vip: "NÃO", status: "Ativo", matricula: "05/12/2023" },
  { id: 4, nome: "Mariana Costa Souza", cpf: "456.789.012-33", email: "mariana.c@exemplo.com", telefone: "(31) 95555-4444", nascimento: "30/03/2000", cat: "A", vip: "SIM", status: "Ativo", matricula: "18/02/2024" },
  { id: 5, nome: "Roberto Almeida Junior", cpf: "567.890.123-44", email: "roberto.a@exemplo.com", telefone: "(31) 94444-5555", nascimento: "12/07/1988", cat: "D", vip: "NÃO", status: "Inativo", matricula: "10/10/2023" },
  { id: 6, nome: "Juliana Mendes Faria", cpf: "678.901.234-55", email: "juliana.m@exemplo.com", telefone: "(31) 93333-6666", nascimento: "05/11/2003", cat: "B", vip: "SIM", status: "Ativo", matricula: "01/03/2024" },
  { id: 7, nome: "Ricardo Pereira Santos", cpf: "789.012.345-66", email: "ricardo.p@exemplo.com", telefone: "(31) 92222-7777", nascimento: "20/06/1992", cat: "B", vip: "NÃO", status: "Pendente", matricula: "15/02/2024" },
  { id: 8, nome: "Beatriz Oliveira", cpf: "890.123.456-77", email: "bea.o@exemplo.com", telefone: "(31) 91111-8888", nascimento: "14/02/1999", cat: "A/B", vip: "NÃO", status: "Inadimplente", matricula: "10/01/2024" },
];

export const mockInstrutores = [
  { id: 1, nome: "Marcos Pardim Rezende", cpf: "555.444.333-22", cnh: "1234567890", categorias: "A/B/D/E", validade: "20/08/2026", telefone: "(31) 99999-8888", turno: "Manhã/Tarde", status: "Ativo" },
  { id: 2, nome: "André Santos", cpf: "111.222.333-44", cnh: "9876543210", categorias: "A/B", validade: "15/05/2025", telefone: "(31) 98888-7777", turno: "Manhã", status: "Ativo" },
  { id: 3, nome: "Fernanda Lima", cpf: "222.333.444-55", cnh: "1593572580", categorias: "B", validade: "10/12/2026", telefone: "(31) 97777-6666", turno: "Tarde", status: "Férias" },
  { id: 4, nome: "Ricardo Oliveira", cpf: "333.444.555-66", cnh: "7531598520", categorias: "D/E", validade: "01/06/2025", telefone: "(31) 96666-5555", turno: "Noite", status: "Ativo" },
  { id: 5, nome: "Beatriz Costa", cpf: "444.555.666-77", cnh: "9517534560", categorias: "A/B", validade: "25/03/2026", telefone: "(31) 95555-4444", turno: "Integral", status: "Ativo" },
];

export const mockProvas = [
  { id: 1, aluno: "Guilherme Rezende", tipo: "Prática B", data: "Hoje", hora: "09:00", local: "Gameleira", status: "VIP", instrutor: "Marcos" },
  { id: 2, aluno: "Ana Beatriz Silva", tipo: "Legislação", data: "Amanhã", hora: "14:30", local: "UAI Praça Sete", status: "Agendado", instrutor: "-" },
  { id: 3, aluno: "Lucas Oliveira Martins", tipo: "Prática A", data: "28 Fev", hora: "08:15", local: "Mineirão", status: "Agendado", instrutor: "André" },
  { id: 4, aluno: "Mariana Costa Souza", tipo: "Prática B", data: "01 Mar", hora: "10:00", local: "Gameleira", status: "VIP", instrutor: "Marcos" },
  { id: 5, aluno: "Juliana Mendes Faria", tipo: "Legislação", data: "02 Mar", hora: "16:00", local: "UAI Barro Preto", status: "Pendente", instrutor: "-" },
];

export const mockEntradas = [
  { id: 1, data: "27/02/2026", descricao: "Matrícula - Guilherme Rezende", forma: "PIX", valor: 1500, parcela: "1/1", vencimento: "27/02/2026", cpf: "123.456.789-00", cat: "B" },
  { id: 2, data: "26/02/2026", descricao: "Parcela 02 - Ana Beatriz Silva", forma: "Cartão", valor: 450, parcela: "2/10", vencimento: "25/02/2026", cpf: "234.567.890-11", cat: "A/B" },
  { id: 3, data: "25/02/2026", descricao: "Taxa Detran - Lucas Oliveira", forma: "Dinheiro", valor: 280, parcela: "1/1", vencimento: "25/02/2026", cpf: "345.678.901-22", cat: "B" },
  { id: 4, data: "24/02/2026", descricao: "Matrícula - Mariana Costa", forma: "Boleto", valor: 1500, parcela: "1/1", vencimento: "24/02/2026", cpf: "456.789.012-33", cat: "A" },
];

export const mockSaidas = [
  { id: 1, data: "27/02/2026", descricao: "Combustível - Gol (ABC-1234)", categoria: "Veículo", fornecedor: "Posto Shell", valor: 250, doc: "NF-8822", forma: "Cartão", obs: "Abastecimento completo" },
  { id: 2, data: "26/02/2026", descricao: "Aluguel Sede", categoria: "Administrativo", fornecedor: "Imobiliária Horizonte", valor: 3500, doc: "REC-102", forma: "Boleto", obs: "Aluguel ref. Fevereiro" },
  { id: 3, data: "25/02/2026", descricao: "Pagamento Instrutor Marcos", categoria: "Pessoal", fornecedor: "Marcos Pardim Rezende", valor: 2800, doc: "REC-55", forma: "PIX", obs: "Salário Fevereiro" },
  { id: 4, data: "24/02/2026", descricao: "Taxa Renovação Alvará", categoria: "Taxas/Detran", fornecedor: "Prefeitura Municipal", valor: 420, doc: "DUA-992", forma: "Boleto", obs: "Taxa anual" },
];
