import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from '../utils/firebaseConfig';
var db = firebase.firestore();

export default class RemediesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
            current_condition: prepared_conditions[0]
        }
    }
    componentDidMount() {
        db.collection('conditions').doc('acne').onSnapshot(doc => {
            this.setState({
                isLoading: false, 
                data: doc.data(),
                current_condition: prepared_conditions[0]
            });
        })
    }

    render() {
        return (
            <React.Fragment>
            { this.state.isLoading && <Loading/>}
            { !this.state.isLoading && 
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                <Text style={styles.title}>Common Conditions and Remedies</Text>
                
                <Text>{'\n'}</Text>

                <ModalDropdown 
                    textStyle={styles.sectionTitles}
                    dropdownTextStyle={styles.sectionTitles}
                    options={prepared_conditions} 
                    onSelect={value => {
                        console.log("You selected " + conditions[value]);
                        this.setState({ isLoading: true, data: null, current_condition: null });
                        db.collection('conditions').doc(conditions[value]).onSnapshot(doc => {
                            this.setState({
                                isLoading: false, 
                                data: doc.data(),
                                current_condition: prepared_conditions[value]
                            });
                        })
                    }}
                />

                <Text>{'\n'}</Text>

                <Text style={styles.sectionTitles}>Information retrieved for {this.state.current_condition}</Text>

                <Text>{'\n'}</Text>

                <Text style={styles.sectionTitles}> Symptoms </Text>
                {this.state.data.symptoms.map((x, i) => {
                    return (
                    <Text key={i}>{i + 1}: {x}</Text>
                    )
                })}
                
                <Text>{'\n'}</Text>
                
                <Text style={styles.sectionTitles}> Home Remedies </Text>
                {this.state.data.Home_Remedies.map((x, i) => {
                    return (
                    <Text key={i}>{i + 1}: {x}</Text>
                    )
                })}    
                
                <Text>{'\n'}</Text>
                    
                <Text style={styles.sectionTitles}> Tips </Text>
                <Text>{this.state.data.tips}</Text>

                <Text>{'\n'}</Text>
                    
                <Text style={styles.sectionTitles}> Prevalence </Text>
                <Text>{this.state.data.prevalence}</Text>

                <Text>{'\n'}</Text>
                    
                <Text style={styles.sectionTitles}> Nearest Doctor </Text>
                <Text>{this.state.data.doctor}</Text>        
            
            </ScrollView>
            }
        </React.Fragment>
        )
    }
}
 
const conditions = ["acne", "eczema", "light disease", "melanoma", "nail_fungus",
"psoriasis", "scabies", "seborrheic_keratoses", "tinea", "wart"]

const prepared_conditions = ["Acne", "Eczema", "Light Disease", "Melanoma", "Nail Fungus",
"Psoriasis", "Scabies", "Seborrheic Keratoses", "Tinea Ringworm", "Warts"]

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
            Please wait while we gather your information.
        </Text>
      </View>
    )
  }