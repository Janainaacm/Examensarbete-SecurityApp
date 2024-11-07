import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import SignInScreen from './app/auth/SignIn/SignInScreen';
import SignUpScreen from './app/auth/SignUp/SignUpScreen';
import Home from './app/(tabs)/(home)/index';
import TabLayout from './app/_layout'; // Assuming you want to use tabs in the app after login

const Stack = createStackNavigator()

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={session ? 'Tabs' : 'SignIn'}>
        <Stack.Screen name="/SignIn" component={SignInScreen} />
        <Stack.Screen name="/SignUp" component={SignUpScreen} />
        <Stack.Screen name="/Tabs" component={TabLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
