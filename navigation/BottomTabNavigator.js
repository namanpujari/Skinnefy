import * as React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DiagnosisStackNavigator from './DiagnosisStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';

import TabBarIcon from '../components/TabBarIcon';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Remedies"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => 
                        <TabBarIcon focused={focused} name="ios-search" />,
                }}
            />
            <BottomTab.Screen
                name="Diagnosis"
                component={DiagnosisStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => 
                        <TabBarIcon focused={focused} name="ios-heart-half" />,
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => 
                        <TabBarIcon focused={focused} name="ios-person" />,
                }}
            />
        </BottomTab.Navigator>
    )
}