import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uryzzerzmmuwuqxjwwec.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper: get current user's papel (role)
export async function getCurrentRole(): Promise<string> {
  try {
    const { data } = await supabase.rpc('papel_atual')
    return data || 'pendente'
  } catch (err) {
    return 'pendente'
  }
}

// Helper: get current user's agencia
export async function getCurrentAgencia(): Promise<string | null> {
  try {
    const { data } = await supabase.rpc('agencia_atual')
    return data || null
  } catch (err) {
    return null
  }
}
