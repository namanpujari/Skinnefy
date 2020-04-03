import * as React from 'react';
import { Image, Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons';
import { BarChart, } from 'react-native-chart-kit';

import { useEndpoint } from '../utils/sagemakerCalls'; 

export default function ResultsScreen({ navigation, route }) {
    const { isLoading, data, err } = useEndpoint(route.params.data);

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
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        {err ? 
                            <Text style={{color: "red"}}>ERROR: {err}</Text>
                        :
                            <BarChart
                                // style={graphStyle}
                                data={data}
                                width={Dimensions.get('window').width - 20}
                                height={200}
                                chartConfig={{
                                    backgroundColor: '#1cc910',
                                    backgroundGradientFrom: '#fff',
                                    backgroundGradientTo: '#999',
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                      borderRadius: 16
                                    }
                                }}                              
                                bezier
                                style={{
                                    borderRadius: 5,
                                }}                              
                            />
                        }
                    </View>

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