import { View, Text, Pressable } from "react-native"
import { Link, router } from 'expo-router'

const HomePage = () => {
    return (
        <View>
            <Text>Home Page</Text>
            
        </View>
    )
}

export default HomePage


/*
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import Auth from '../../../components/Auth'
import Account from '../../../components/Account'
import ContactsAccess from '../../../components/ContactsAccess'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [isAccountSetup, setIsAccountSetup] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleAccountSetupComplete = () => {
    setIsAccountSetup(true)
  }

  return (
    <View>
      { {!session ? (
        <Auth />
      ) : (
        isAccountSetup ? (
          <ContactsAccess />
        ) : (
          <Account key={session.user.id} session={session} onComplete={handleAccountSetupComplete} />
        )
      )} }
     
      </View>
      )
    }
    
*/