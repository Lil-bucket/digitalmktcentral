import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password
      })

      if (err) {
        setError(err.message)
      } else {
        setMessage('Login realizado com sucesso!')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error: err } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      })

      if (err) {
        setError(err.message)
      } else {
        setMessage('Verifique seu email para confirmar o cadastro')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#faf9f6' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Digital MKT Central</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d3d0c6', borderRadius: '8px', fontSize: '14px' }}
              disabled={loading}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d3d0c6', borderRadius: '8px', fontSize: '14px' }}
              disabled={loading}
            />
          </div>

          {error && <div style={{ marginBottom: '12px', padding: '10px', background: '#fbe4e1', color: '#b32418', borderRadius: '6px', fontSize: '13px' }}>{error}</div>}
          {message && <div style={{ marginBottom: '12px', padding: '10px', background: '#e4f5ec', color: '#0c7048', borderRadius: '6px', fontSize: '13px' }}>{message}</div>}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{ flex: 1, padding: '10px', background: '#ff5436', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading || !email || !password}
              style={{ flex: 1, padding: '10px', background: '#14161c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
