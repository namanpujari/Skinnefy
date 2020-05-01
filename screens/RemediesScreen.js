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
                {prepared_conditions.map((condition, key) => {
                    return (
                        <Card style={{
                            backgroundColor: "#efefef",
                            borderRadius: 10, elevation: 2,
                        }}
                        key={key}>
                            <CardImage 
                                source={{uri : condition.image}}       
                                style={{
                                    height: 150,
                                }}                 
                            />
                            <CardTitle title={condition.name} />
                            <CardContent text={condition.description} />
                            <CardAction separator={true} inColumn={false}>
                                <CardButton
                                    onPress={() => {this.props.navigation.navigate('Details', {
                                        query: condition.ref,
                                        displayTop: condition.name,
                                        description: condition.description,
                                        image: condition.image,
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

const prepared_conditions = [
    { 
        name: "Acne", 
        image: "https://assets.nhs.uk/prod/images/S_0917_acne_M1080444.width-320_4r0CUty.jpg",
        description: "Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells.\
         It often causes whiteheads, blackheads or pimples, and usually appears on the face, forehead, chest, upper back and shoulders.",
        ref: "acne",
    },
    { 
        name: "Eczema", 
        image: "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/014/14417/eczema-can-cause-dry-and-itchy-rashes-image-credit-g-steph-rocket-2015.jpg?w=1155&h=1654",
        description: "Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough. Blisters may sometimes occur.",
        ref: "eczema",
    },
    { 
        name: "Light Disease", 
        image: "https://assets.nhs.uk/prod/images/C0166700.width-320.jpg",
        description: "Light chain deposition disease (LCDD) is a rare blood cell disease which is characterized by deposition of fragments of infection-fighting immunoglobulins, called light chains (LCs), in the body.",
        ref: "light disease",
    },
    { 
        name: "Melanoma", 
        image: "https://www.news-medical.net/image.axd?picture=2019%2F12%2F%40shutterstock_1391821073.jpg",
        description: "Melanoma is a serious form of skin cancer that begins in cells known as melanocytes.",
        ref: "melanoma",
    },
    { 
        name: "Nail Fungus",
        image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/toenail_fungus_slideshow/princ_rm_photo_of_toenail_fungus.jpg",
        description: "Nail fungus is a common condition that begins as a white or yellow spot under the tip of your fingernail or toenail. As the fungal infection goes deeper, nail fungus may cause your nail to discolor, thicken and crumble at the edge.",
        ref: "nail_fungus",
    },
    { 
        name: "Psoriasis",
        image: "https://images.medicinenet.com/images/image_collection/pediatrics/psoriasis-9-9.jpg",
        description: "Psoriasis is a skin disorder that causes skin cells to multiply up to 10 times faster than normal. This makes the skin build up into bumpy red patches covered with white scales.",
        ref: "psoriasis",
    },
    { 
        name: "Scabies",
        image: "https://images.medicinenet.com/images/slideshow/stds-s3-photo-of-scabies.jpg",
        description: "Scabies, also known as the seven-year itch, is a contagious skin infestation by the mite Sarcoptes scabiei. The most common symptoms are severe itchiness and a pimple-like rash.",
        ref: "scabies",
    },
    { 
        name: "Seborrheic Keratoses", 
        image: "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/320/320742/seborrheic-keratosis.jpg?w=1155&h=1541",
        description: "Seborrheic keratosis is a common, harmless, noncancerous growth on the skin. It usually appears as a pale, black, or brown growth on the back, shoulders, chest, or face.",
        ref: "seborrheic_keratoses",
    },
    { 
        name: "Tinea Ringworm", 
        image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/ringworm_slideshow/650x350_ringworm_slideshow.jpg",
        description: "Ringworm is a common fungal skin infection otherwise known as tinea. Ringworm most commonly affects the skin on the body (tinea corporis), the scalp (tinea capitis), the feet (tinea pedis, or athlete's foot), or the groin (tinea cruris, or jock itch).",
        ref: "tinea",
    },
    { 
        name: "Warts", 
        image: "https://img.medscape.com/thumbnail_library/ps_200115_warts_hands_800x450.jpg",
        description: "A wart is a small growth with a rough texture that can appear anywhere on the body. It can look like a solid blister or a small cauliflower. Warts are caused by viruses in the human papillomavirus (HPV) family.",
        ref: "wart",
    }
]

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 20,
        paddingTop: 30, 
        backgroundColor: "#fefefe"
    },
})