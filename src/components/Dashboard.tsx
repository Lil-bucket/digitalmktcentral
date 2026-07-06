import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { UserRole } from '../types'
import Sidebar from './Sidebar'
import WorkModule from './modules/WorkModule'
import BudgetModule from './modules/BudgetModule'

interface DashboardProps {
  user: any
  role: UserRole
}

export default function Dashboard({ user, role }: DashboardProps) {
  const [activeModule, setActiveModule] = useState<'work' | 'budget'>('work')

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const showWork = ['admin', 'marketing'].includes(role)
  const showBudget = ['admin', 'marketing', 'financeiro', 'agencia'].includes(role)

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#faf9f6' }}>
      <Sidebar
        role={role}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        showWork={showWork}
        showBudget={showBudget}
        user={user}
        onLogout={handleLogout}
      />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeModule === 'work' && showWork && <WorkModule role={role} />}
        {activeModule === 'budget' && showBudget && <BudgetModule role={role} />}
      </main>
    </div>
  )
}
