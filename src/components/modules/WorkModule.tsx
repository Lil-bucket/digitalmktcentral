import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { UserRole } from '../../types'

interface WorkModuleProps {
  role: UserRole
}

export default function WorkModule({ role }: WorkModuleProps) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('act_projects')
        .select('*')
        .limit(20)

      if (error) throw error
      setProjects(data || [])
    } catch (err) {
      console.error('Erro ao carregar projetos:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Projects</h1>
        <p style={{ color: '#8b8d95' }}>Gerenciamento de projetos e atividades</p>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : projects.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', background: '#fff', borderRadius: '12px', border: '1px solid #e3e1da' }}>
          <p style={{ color: '#8b8d95' }}>Nenhum projeto encontrado</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {projects.map((project) => (
            <div key={project.id} style={{
              background: '#fff',
              border: '1px solid #e3e1da',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer'
            }}>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>{project.data?.nome || 'Sem nome'}</h3>
              <p style={{ color: '#8b8d95', fontSize: '13px' }}>ID: {project.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
