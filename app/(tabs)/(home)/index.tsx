import { supabase } from "@/lib/supabase";
import { View, Text, Pressable, Button, StyleSheet } from "react-native"


const Home = () => {
    return (
        <View style={[styles.verticallySpaced, styles.mt20]}>
            <Text>Home Page</Text>
            <View style={[styles.verticallySpaced, styles.mt20]}>
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

export default Home;




