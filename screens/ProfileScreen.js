import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, 
    ScrollView, ActivityIndicator } from 'react-native';

import { Ionicons } from  '@expo/vector-icons';
import { Avatar, Badge } from 'react-native-elements'

import { logout, useSession } from '../utils/auth';
import { useFirestoreDoc } from '../utils/db';

const avatar_src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Karen_Pence_official_portrait_2_%28cropped%29.jpg/1200px-Karen_Pence_official_portrait_2_%28cropped%29.jpg";

export default function ProfileScreen({ navigation, route }) {
    navigation.setOptions({
        headerRight: () => {
            return (
                <View style={{flexDirection: "row", flexWrap: "nowrap", marginRight: 5,}}>
                    <TouchableOpacity style={{ padding: 10}}
                        onPress={() => {
                            navigation.navigate("Edit Profile");
                        }}    
                    >
                        <Ionicons
                            name="ios-build"
                            size={30}
                            color="#333"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10}} 
                        onPress={logout}
                    >
                        <Ionicons
                            name="ios-log-out"
                            size={30}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    })

    const user = useSession();
    const { isLoading, data } = useFirestoreDoc('users', user.uid);

    return (
        <React.Fragment>
            { isLoading && <Loading/>}
            { !isLoading && 
            <ScrollView style={{
                flex: 1
            }} contentContainerStyle={styles.container}>
                <View style={{
                    padding: 15, backgroundColor: "#fefefe",
                    elevation: 2,
                }}>
                    <Avatar
                        title="L"
                        name="Lauren Smith"
                        size={120}
                        rounded
                        source={{
                            uri: data.img_src
                        }}
                        containerStyle={{
                            borderColor: "#555",
                            borderWidth: 0.5, elevation: 1,
                            alignSelf: "center",
                        }}
                    />
                    <View style={{
                        flexDirection: "row", flexWrap: "nowrap",
                        justifyContent: "space-evenly", paddingTop: 10,
                    }}>
                        <Text style={{
                            fontSize: 25, color: "#333",
                        }}>
                            {data.info.first} {data.info.last}
                        </Text>
                        <View style={{
                            backgroundColor: "pink",
                            borderRadius: 5, paddingHorizontal: 10,
                            paddingVertical: 2.5,
                        }}>
                            <Text style={{
                                fontSize: 20,
                            }}>
                                {data.info.age}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    padding: 20,
                    flex: 1,
                }}>
                    <View>
                        <Text style={{fontSize:15, color: "#5a5d81"}}>
                            I have a history of...
                        </Text>
                        <View style={{
                            paddingVertical: 10, 
                            flexDirection: "row", flexWrap: "wrap", 
                            justifyContent: "center"
                        }}>
                            {
                                data.history.map((x, i) => {
                                    return (
                                        <Badge 
                                            badgeStyle={{
                                            backgroundColor: "#dbdbdb", 
                                            borderColor: "#cccccc",
                                            borderWidth: 0.5,
                                            elevation: 1,
                                            padding: 16, 
                                            margin: 3, 
                                            }} 
                                            key={i} 
                                            value={
                                                <Text style={{
                                                    color: "#555555",
                                                }}> 
                                                    {x} 
                                                </Text>
                                            } 
                                        />
                                    ) 
                                })
                            }
                        </View>
                    </View>
                    <View style={{
                        marginVertical: 10,
                        flex: 1,
                    }}>
                        <Text style={{fontSize:15, color: "#5a5d81"}}>
                            My Diagnoses
                        </Text>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                        }}>
                            {!data.diagnoses &&
                                <View style={{
                                    alignItems: "center",
                                }}>
                                    <Text style={{
                                        color: "#555",
                                        fontSize: 18,
                                    }}>
                                        You have no Self-Diagnoses
                                    </Text>
                                    <Text style={{
                                        color: "#999",
                                        fontSize: 11,
                                    }}>
                                        Click on the Diagnosis tab to make one!
                                    </Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>

            </ScrollView>
            }
        </React.Fragment>
    )
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
      }}> Please wait while we get your data </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: "#ddd",
        borderColor: "#aaa", borderWidth: 0.5, 
        elevation: 0.5, padding: 10, borderRadius: 5,
    }
})