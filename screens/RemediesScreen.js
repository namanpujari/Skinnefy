import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useFirestoreDoc } from '../utils/db';

export default function RemediesScreen({ navigation, route }) {
    
    // query for the condition that was identified with the endpoint
    // this needs to be updated so that 
    const { isLoading, data } = useFirestoreDoc('conditions', 'acne');

    return (
        <React.Fragment>
            { isLoading && <Loading/>}
            { !isLoading && 
            <ScrollView style={{
                flex: 1
            }} 
            contentContainerStyle={styles.container}
            >
                <Text style={{fontWeight: "bold"}}> Symptoms: </Text>
                {data.symptoms.map((x, i) => {
                    return (
                    <Text key={i}>{i + 1}: {x}</Text>
                    )
                })}
                
                <Text>{'\n'}</Text>
                
                <Text style={{fontWeight: "bold"}}> Home Remedies: </Text>
                {data.Home_Remedies.map((x, i) => {
                    return (
                    <Text key={i}>{i + 1}: {x}</Text>
                    )
                })}                
                    <Text>{'\n'}</Text>
                    
                    <Text style={{fontWeight: "bold"}}> Tips: </Text>
                    <Text> {data.tips} </Text>

                    <Text>{'\n'}</Text>
                    
                    <Text style={{fontWeight: "bold"}}> Prevalence: </Text>
                    <Text> {data.prevalence} </Text>

                    <Text>{'\n'}</Text>
                    
                    <Text style={{fontWeight: "bold"}}> Nearest Doctor: </Text>
                    <Text> {data.doctor} </Text>        
            </ScrollView>
            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 20, backgroundColor: "#fefefe",
    },
})

function Loading() {
    return (
      <View style={{ 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center", 
      }}>
        <ActivityIndicator style={styles.activityIndicator} size={50} color="#000000" />
        <Text style={{
          marginTop: 15,
          fontSize: 13, 
          color: "grey" 
        }}> Please wait while we get your data </Text>
      </View>
    )
  }