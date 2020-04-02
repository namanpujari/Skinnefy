import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import the screens that are being used
import CameraScreen from './screens/CameraScreen';
import ResultsScreen from './screens/ResultsScreen';


const Stack = createStackNavigator();
// creates stack navigator for basic navigation across camera and 
// results screen
const INITIAL_ROUTE_NAME = 'Camera';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME} >
          <Stack.Screen
            name='Camera'
            component={CameraScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Results'
            component={ResultsScreen}
            options={{
              headerShown: true,
              title: "Here's what we think"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
