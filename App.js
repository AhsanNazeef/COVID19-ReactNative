import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import StartScreen from "./components/worldStats";
import Country from "./components/country";
import Favourite from "./components/favourite";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="World Statistics"
        screenOptions={{
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'crimson',
          },
        }}>
        <Stack.Screen
          name="World Stats"
          component={StartScreen}
          options={{title: 'World Statistics'}}
        />
        <Stack.Screen name="Favourite" component={Favourite}  options={{title: 'Favourite'}}/>
        <Stack.Screen name="Country" component={Country}  options={{title: 'Country Stats'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

   