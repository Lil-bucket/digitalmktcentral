export type UserRole = 'pendente' | 'agencia' | 'marketing' | 'financeiro' | 'admin'

export interface Profile {
  user_id: string
  email: string
  nome: string
  sobrenome: string
  papel: UserRole
  agencia?: string
  criado_em: string
}

export interface Project {
  id: string
  data: any // JSONB: { nome, tipo, stage, status, resp, tasks[], log[], envolvidos[], datas… }
  updated_at: string
}

export interface Campaign {
  id: string
  nome: string
  agencia: string
  orcamento_id: string
  activity: string
  aprovacao_status: 'PENDENTE' | 'APROVADO' | 'REJEITADO'
}

export interface PurchaseOrder {
  id: string
  projeto_id: string
  competencia: string
  agencia: string
  valor: number
  descricao: string
  numero_po: string
  status: string
  solicitado_em: string
}

export interface Notification {
  id: string
  titulo: string
  corpo: string
  lida: boolean
  criada_em: string
}
