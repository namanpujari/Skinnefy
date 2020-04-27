import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default class RemediesScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                {prepared_conditions.map((x, i) => {
                    return (
                        <Card key={i}>
                        <CardTitle subtitle={x.toUpperCase()} />
                        <CardContent text="Some description" />
                        <CardAction separator={true} inColumn={false}>
                            <CardButton
                                onPress={() => {this.props.navigation.navigate('Details', {
                                    query: conditions[i],
                                    displayTop: x
                                })}}
                                title="Details"
                                color="#FEB557"
                            />
                        </CardAction>
                        </Card>
                    )
                })
                }
            </ScrollView>
            
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
})