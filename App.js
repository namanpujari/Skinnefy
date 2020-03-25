import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';

export default function App() {
  const [buttonPresses, setButtonPress] = React.useState(100);
  //       state value    function that sets
  return (
    <View style={styles.container}>
      <Text style = {{ textAlign: "center", fontSize: 20 }}> Click on this button to increase the number of taps!</Text>
      <TouchableOpacity style = {styles.button}
        onPress={() => {
          setButtonPress(buttonPresses + 1);
        }}  
      >
        <Text style={{fontSize: 30}}> Click me! </Text>
      </TouchableOpacity>
      <View style={{marginTop: 10}}> 
        <Text style={{textAlign: "center", fontSize: 25}}>
          You clicked {buttonPresses} times!  
        </Text> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { padding: 10, marginVertical: 10, backgroundColor: "#dddddd", borderColor: "#bbbbbb", borderWidth: 0.5, elevation: 1 }
});
