import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { logout } from '../utils/auth';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={logout}    
            >
                <Text>
                    Logout
                </Text> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#ddd",
        borderColor: "#aaa", borderWidth: 0.5, 
        elevation: 0.5, padding: 10, borderRadius: 5,
    }
})