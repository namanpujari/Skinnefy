import * as React from 'react';
import { Image, Text, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons';

import { useEndpoint } from '../utils/sagemakerCalls'; 

export default function ResultsScreen({ navigation, route }) {
    const { isLoading, data, err } = useEndpoint(route.params.data.uri);

    return (
        <View style={styles.container}>
            <View style={{padding: 10, flexDirection: "row", justifyContent: "center",}}>
                <Image 
                style={{ width: 210, height: 280, borderRadius: 10,  borderColor: "#333333", borderWidth: 2, }}
                source={
                    { uri: route.params.data.uri }
                }
                />
            </View>
            <View style={styles.resultsContainer}>
                <Text style={{color: "#666666", fontSize: 15}}> 
                    According to our AI powered prediction engine these are your results
                </Text>
                { 
                    isLoading &&
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator style={styles.activityIndicator} size={50} color="#000000" />
                    </View>
                }

                {
                    !isLoading &&
                    (err ? 
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{color: "red"}}>ERROR: {err} </Text>
                        </View>
                    :
                        <Text> Data: </Text>
                    )

                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    resultsContainer: {
        flex: 1,
        padding: 30,
        backgroundColor: "#fefefe",

    }
})