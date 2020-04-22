import React from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';

// import BottomTabNavigator
import BottomTabNavigator from './navigation/BottomTabNavigator';

// import auth flow screens
import LoginScreen from './screens/LoginScreen';

// for authentication
import { useAuth } from './utils/auth';
import { userContext } from './utils/auth';

import {decode, encode} from 'base-64'

if (!global.btoa) {
  global.btoa = encode 
}
if (!global.atob) {
  global.atob = decode 
}

YellowBox.ignoreWarnings(['Setting a timer']);

const Stack = createStackNavigator();
// root stack navigator for the application

export default function App() {
  const { initializing, user } = useAuth();

  if(initializing) { return null; }
  else {
    SplashScreen.hide();
    return (
      <userContext.Provider value = {{ user }}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          <NavigationContainer>
            <Stack.Navigator>
              {(user) ? (
                <Stack.Screen
                  name="Root"
                  component={BottomTabNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
              ) : (
                <React.Fragment>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                </React.Fragment>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </userContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
