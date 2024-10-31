import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bklvqvelmxnxovwdlsoh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrbHZxdmVsbXhueG92d2Rsc29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNzgyMTgsImV4cCI6MjA0NTg1NDIxOH0.S6uYtQ0y-a7FtMG85Scwd-kcFSu5615OuPX41rLYZTw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})