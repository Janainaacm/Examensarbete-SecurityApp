import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'

export default function Account({ session }: { session: Session }, { onComplete }: {onComplete: boolean}) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')


  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('users')
        .select(`username, firstname, lastname, email, phonenumber`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setFirstname(data.firstname)
        setLastname(data.lastname)
        setPhonenumber(data.phonenumber)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    firstname, 
    lastname, 
    email,
    phonenumber, 
  }: {
    username: string
    firstname: string 
    lastname: string
    email: string,
    phonenumber: string 
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const validStr = (str: string) => !!str.trim(); 
      
      if (!validStr(username) || !validStr(firstname) || !validStr(lastname) || !validStr(phonenumber)) {
        Alert.alert("All fields are required and cannot be empty");
        return;
      }

      const updates = {
        id: session?.user.id,
        username,
        firstname, 
        lastname, 
        email: session?.user?.email,
        phonenumber, 
        updated_at: new Date(),
    }

      console.log({ username, firstname, lastname, email, phonenumber });

      const { error: updateError } = await supabase.from('users').upsert(updates);
        if (updateError) {
        console.error('Error updating profile:', updateError);
        Alert.alert('Error updating profile', updateError.message);
        }


      const { error } = await supabase.from('users').upsert(updates)
      
      
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="First name" value={firstname || ''} onChangeText={(text) => setFirstname(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Last name" value={lastname || ''} onChangeText={(text) => setLastname(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Phone number" value={phonenumber || ''} onChangeText={(text) => setPhonenumber(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Finish'}
          onPress={() => updateProfile({ username, email, firstname, lastname, phonenumber })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})