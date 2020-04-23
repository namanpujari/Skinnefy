import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useFirestoreDoc } from '../utils/db';
import ModalDropdown from 'react-native-modal-dropdown';

export default function RemediesScreen({ navigation, route }) {

    const { isLoading, data } = useFirestoreDoc('conditions', "acne");

    const conditions = ["acne", "eczema", "light disease", "melanoma", "nail fungus",
                    "psoriasis", "scabies", "seborrheic keratoses", "ringworm", "warts"]

    return (
        <React.Fragment>
            { isLoading && <Loading/>}
            { !isLoading && 
            <ScrollView style={{
                flex: 1
            }} 
            contentContainerStyle={styles.container}
            >
                <Text style={styles.title}>Common Conditions and Remedies</Text>
                
                <ModalDropdown 
                    options={['Acne', 'Eczema', 'Light Disease', 'Melanoma', 
                    'Nail Fungus', 'Psoriasis', 'Scabies', 'Keratoses', 'Ringworm', 'Warts']} 
                    onSelect={value => {
                        console.log(conditions[value])
                        selectCondition(conditions[value])
                        }}
                />

                <Text>{'\n'}</Text>

                <Text style={styles.sectionTitles}> Symptoms </Text>
                {data.symptoms.map((x, i) => {
                    return (
                    <Text key={i}>{i + 1}: {x}</Text>
                    )
                })}
                
                <Text>{'\n'}</Text>
                
                <Text style={styles.sectionTitles}> Home Remedies </Text>
                {data.Home_Remedies.map((x, i) => {
                    return (
                    <Text key={i}>{i + 1}: {x}</Text>
                    )
                })}                
                    <Text>{'\n'}</Text>
                    
                    <Text style={styles.sectionTitles}> Tips </Text>
                    <Text> {data.tips} </Text>

                    <Text>{'\n'}</Text>
                    
                    <Text style={styles.sectionTitles}> Prevalence </Text>
                    <Text> {data.prevalence} </Text>

                    <Text>{'\n'}</Text>
                    
                    <Text style={styles.sectionTitles}> Nearest Doctor </Text>
                    <Text> {data.doctor} </Text>        
            </ScrollView>
            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 20,
        paddingTop: 30, 
        backgroundColor: "#fefefe"
    },
    sectionTitles: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center"
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        textDecorationLine: "underline"
    }
})

function selectCondition(input) {
    //const { isLoading, data } = useFirestoreDoc('conditions', input);
}

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
        }}>
            Please wait while we gather some information
        </Text>
      </View>
    )
  }