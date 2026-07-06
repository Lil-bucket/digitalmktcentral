import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import type { UserRole } from './types'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<UserRole>('pendente')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        try {
          const { data } = await supabase.rpc('papel_atual')
          setRole(data || 'pendente')
        } catch (err) {
          console.error('Failed to fetch role:', err)
        }
      }
      setLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          try {
            const { data } = await supabase.rpc('papel_atual')
            setRole(data || 'pendente')
          } catch (err) {
            console.error('Failed to fetch role:', err)
          }
        } else {
          setUser(null)
          setRole('pendente')
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Carregando...</div>
  }

  if (!user) {
    return <Auth />
  }

  return <Dashboard user={user} role={role} />
}
