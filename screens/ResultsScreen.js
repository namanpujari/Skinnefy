import * as React from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons';
import { BarChart, } from 'react-native-chart-kit';

import { useEndpoint } from '../utils/sagemakerCalls'; 
import { uploadDiagnosisSequence } from '../utils/storage';
import { useSession } from '../utils/auth';

export default function ResultsScreen({ navigation, route }) {
    const user  = useSession();
    const { isLoading, data, err } = useEndpoint(route.params.data);

    return (
        <ScrollView style={styles.container}>
            <View style={{padding: 10, flexDirection: "row", justifyContent: "center",}}>
                <Image 
                style={{ width: 150, height: 200, borderRadius: 10,  borderColor: "#333333", borderWidth: 2, }}
                source={
                    { uri: route.params.data.uri }
                }
                />
            </View>
            <View style={styles.resultsContainer}>
                <Text style={{color: "#666666", fontSize: 14, marginBottom: 20,}}> 
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
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center",}}>
                        {err ? 
                            <Text style={{color: "red"}}>ERROR: {err}</Text>
                        :
                            <React.Fragment>
                                <BarChart
                                    // style={graphStyle}
                                    fromZero={true}
                                    segments={4}
                                    withInnerLines={false}
                                    data={{
                                        labels: data.labels.slice(0, 2),
                                        datasets: [
                                            {
                                                data: data.dataset.slice(0, 2).map(val => {
                                                    return val * 100;
                                                }),
                                            },
                                        ],
                                    }}
                                    yAxisSuffix="%"
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
                                        },
                                    
                                    }}                              
                                    style={{
                                        borderRadius: 5,
                                        padding: 5,
                                        backgroundColor: "#999",
                                        elevation: 5,
                                    }}                              
                                />
                                <View style={{ flexDirection: "row", flexWrap: "nowrap", marginTop: 20, justifyContent: "flex-end"}}>
                                    <TouchableOpacity style={{ 
                                            backgroundColor: "#ededed",
                                            borderColor: "ccc", borderWidth: 0.5,
                                            elevation: 1, paddingHorizontal: 15,
                                            paddingVertical: 5, borderRadius: 5,
                                        }} onPress={() => {
                                            uploadDiagnosisSequence(user.uid, {
                                                data: data,
                                                title: data.labels[0],
                                            }, route.params.data);
                                            navigation.navigate("Camera");
                                        }}
                                    >
                                        <Text style={{
                                                fontSize: 15,
                                            }}
                                        >
                                            Save
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        }
                    </View>

                }

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    resultsContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fefefe",

    }
})