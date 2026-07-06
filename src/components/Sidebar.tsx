import React from 'react'
import type { UserRole } from '../types'

interface SidebarProps {
  role: UserRole
  activeModule: 'work' | 'budget'
  onModuleChange: (module: 'work' | 'budget') => void
  showWork: boolean
  showBudget: boolean
  user: any
  onLogout: () => void
}

export default function Sidebar({
  role,
  activeModule,
  onModuleChange,
  showWork,
  showBudget,
  user,
  onLogout
}: SidebarProps) {
  return (
    <aside style={{
      width: '240px',
      background: '#14161c',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #2a2d35'
    }}>
      <div style={{ padding: '20px 16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700 }}>Digital MKT Central</h2>
      </div>

      <nav style={{ flex: 1, padding: '16px 8px' }}>
        {showWork && (
          <button
            onClick={() => onModuleChange('work')}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: activeModule === 'work' ? '#ff5436' : 'transparent',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              textAlign: 'left',
              marginBottom: '8px',
              cursor: 'pointer',
              fontWeight: activeModule === 'work' ? 600 : 500,
              fontSize: '14px'
            }}
          >
            🎯 WORK
          </button>
        )}

        {showBudget && (
          <button
            onClick={() => onModuleChange('budget')}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: activeModule === 'budget' ? '#ff5436' : 'transparent',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              textAlign: 'left',
              marginBottom: '8px',
              cursor: 'pointer',
              fontWeight: activeModule === 'budget' ? 600 : 500,
              fontSize: '14px'
            }}
          >
            💰 BUDGET
          </button>
        )}
      </nav>

      <div style={{ padding: '16px 8px', borderTop: '1px solid #2a2d35' }}>
        <div style={{ fontSize: '12px', color: '#8b8d95', marginBottom: '12px' }}>
          {user.email}
          <br />
          <span style={{ textTransform: 'capitalize' }}>{role}</span>
        </div>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '8px 12px',
            background: '#2a2d35',
            color: '#fff',
            border: '1px solid #3a3d45',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          Sair
        </button>
      </div>
    </aside>
  )
}
