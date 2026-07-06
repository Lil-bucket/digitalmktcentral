import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { UserRole } from '../../types'

interface BudgetModuleProps {
  role: UserRole
}

export default function BudgetModule({ role }: BudgetModuleProps) {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('fin_projects')
        .select('*')
        .limit(20)

      if (error) throw error
      setCampaigns(data || [])
    } catch (err) {
      console.error('Erro ao carregar campanhas:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Campaigns</h1>
        <p style={{ color: '#8b8d95' }}>Gerenciamento de orçamentos e POs</p>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : campaigns.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', background: '#fff', borderRadius: '12px', border: '1px solid #e3e1da' }}>
          <p style={{ color: '#8b8d95' }}>Nenhuma campanha encontrada</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {campaigns.map((campaign) => (
            <div key={campaign.id} style={{
              background: '#fff',
              border: '1px solid #e3e1da',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer'
            }}>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>{campaign.nome}</h3>
              <p style={{ color: '#8b8d95', fontSize: '13px', marginBottom: '8px' }}>Agência: {campaign.agencia}</p>
              <p style={{ color: '#5d6068', fontSize: '13px' }}>Status: {campaign.aprovacao_status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
