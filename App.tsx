import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import SignInScreen from './app/auth/SignIn/SignInScreen';
import SignUpScreen from './app/auth/SignUp/SignUpScreen';
import Home from './app/(tabs)/(home)/index';
import { registerRootComponent } from 'expo';
import { AppState, AppStateStatus } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    console.log(session)
  };

  useEffect(() => {
    fetchSession();  

    const handleAppStateChange = async (state: AppStateStatus) => {
      if (state === 'active') {
        await fetchSession();
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={session ? 'Home' : 'SignIn'}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
