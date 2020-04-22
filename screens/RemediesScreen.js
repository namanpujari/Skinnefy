import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RemediesScreen({ navigation, route }) {
    return (
        <View style={styles.container}>
            <Text>
                Blank
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})