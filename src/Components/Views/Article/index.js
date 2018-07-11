import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Linking } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const Article = (props) => {

    const articleImage = () => (
        <View style={{position:'relative'}}>
        <Image 
            resizeMode={"cover"}
            style={styles.articleImage}
            source={{uri:'https://loremflickr.com/400/400/girl,brazil,dog'}}
            />
            <Text style={styles.priceTag}>
                $ {props.ArticleData.price}

            </Text>
        </View>
    )

    const articleText = () => (
        <View>
            <Text style={styles.articleTitle}>
                {props.ArticleData.title}
                </Text>
            <Text style={styles.articleDescription}>
            {props.ArticleData.description}
                </Text>

        </View>
    )

    const ownerNfo = () => (
        <View style={styles.ownerNfo}>
            <Text>
                Contact the owner at: 
            </Text>

            <Icon.Button
                name='envelope-o'
                color='#00ADA9'
                backgroundColor='#ffffff'
                onPress={()=> openEmail()}
            >
                <Text
                >{props.ArticleData.email}</Text>
            </Icon.Button>
        </View>
    )

    const openEmail = () => {
        Linking.openURL(`mailto:${props.ArticleData.email}?subject=Regarding ${props.ArticleData.title}&body=I want that stuff!`)
    }

    return (
        <ScrollView style={styles.articleContainer}>
                {articleImage()}
                {articleText()}
                {ownerNfo()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    priceTag:{
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FF6444',
        padding: 10,
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Roboto-Black',
    },
    articleContainer:{
        padding: 10,
    },
    articleImage:{
        width:'100%',
        height: 250
    },
    articleTitle:{
        fontSize: 30,
        color: '#474143',
        fontFamily: 'Roboto-Black',
        marginTop: 20
    },
    articleDescription:{
        marginTop: 20,
        fontSize: 18
    },
    ownerNfo:{
        marginTop: 30,
        marginBottom: 30,
        paddingTop: 10,
        borderTopColor: 'lightgrey',
        borderTopWidth: 1
    }
})

export default Article;