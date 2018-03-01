import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {StyleSheet, 
        Text, 
        View,
        ScrollView, 
        Image, 
        Dimensions, 
        SectionList, 
        TouchableOpacity, 
        Linking } from 'react-native';
import SmallerLightTitleText from '../../Components/Text/SmallerLightTitleText';
import TableOfContents from '../../Components/Tables/TableOfContents';
import App from '../../Components/General/App';

export class Levels extends Component {
    
    static navigationOptions = {
        title: 'Levels'
    };

    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <SmallerLightTitleText style={styles.title}>
                           React Native Skills
                        </SmallerLightTitleText>
                    </View>
                    <View style={styles.container}>
                        <View style={skills.levelWrapper}>
                            <Text style={skills.levelTitle}>Level 1</Text>
                            <View style={skills.skill}>
                                <Text>Components</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 25,
    },
    imageContainer: {
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        backgroundColor: '#55d3c8',
        paddingTop: 120,
        height: Dimensions.get('window').height / 6
    },
    pageUp: {
        flex: 1,
        margin: 0,
        padding: 0,
        top: 0,
        alignItems: 'center',
        justifyContent:'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        resizeMode: 'cover'
    }
});

const skills = StyleSheet.create({
    levelWrapper: {

    },
    levelTitle: {

    },
    skill: {

    }
})
