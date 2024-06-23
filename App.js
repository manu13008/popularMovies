import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';

const Stack = createNativeStackNavigator();

export default function App() {


  const handlePress = () => {
    console.log('En savoir plus')
    // navigation.navigate('MovieScreen', {
    //     title: props.title,
    //     poster_path: props.poster_path,
    //     // Ajoutez d'autres propriétés que vous souhaitez passer ici
    // });
};


  return (

    <NavigationContainer>
    <StatusBar style="light" backgroundColor='black' translucent={false}/>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Movie" component={MovieScreen} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
