import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import firebase from '../utils/firebaseConfig';
var db = firebase.firestore();

export default class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
        }
    }
    componentDidMount() {
        db.collection('conditions').doc(this.props.route.params.query).onSnapshot(doc => {
            this.setState({
                isLoading: false, 
                data: doc.data(),
            });
        })
    }

    render() {
        return (
            <React.Fragment>
            { this.state.isLoading && <Loading/>}
            { !this.state.isLoading && 
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                
                <Text style={styles.title}>{this.props.route.params.displayTop.toUpperCase()}</Text>

                <Text>{'\n'}</Text>

                <Text style={styles.sectionTitles}> Symptoms </Text>
                {this.state.data.symptoms ? this.state.data.symptoms.map((x, i) => {
                    return (
                    <Text key={i}>{i + 1}: {x}</Text>
                    )
                }) : <Text style={styles.plainText}>No information was available.</Text>}
                
                <Text>{'\n'}</Text>
                
                <Text style={styles.sectionTitles}> Home Remedies </Text>
                {this.state.data.Home_Remedies ? this.state.data.Home_Remedies.map((x, i) => {
                    return (
                    <Text key={i}>{i + 1}: {x}</Text>
                    )
                }) : <Text style={styles.plainText}>No information was available.</Text>}    
                
                <Text>{'\n'}</Text>
                    
                <Text style={styles.sectionTitles}> Tips </Text>
                <Text style={styles.plainText}>{this.state.data.tips ? this.state.data.tips : "No information was available."}</Text>

                <Text>{'\n'}</Text>
                    
                <Text style={styles.sectionTitles}> Prevalence </Text>
                <Text style={styles.plainText}>{this.state.data.prevalence ? this.state.data.prevalence : "No information was available."}</Text>

                <Text>{'\n'}</Text>
                    
                <Text style={styles.sectionTitles}> Nearest Doctor </Text>
                <Text style={styles.plainText}>{this.state.data.doctor ? this.state.data.doctor : "No information was available."}</Text>        
            
            </ScrollView>
            }
        </React.Fragment>
        )
    }
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
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
    },
    plainText: {
        textAlign: "center"
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