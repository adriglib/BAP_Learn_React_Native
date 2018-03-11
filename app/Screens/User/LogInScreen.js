import React, { Component } from 'react';
import { Stacknavigation } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import {StyleSheet, 
        Text, 
        View,
        ScrollView, 
        Image, 
        Dimensions, 
        SectionList, 
        TouchableOpacity,
        TextInput, 
        Linking } from 'react-native';
import SmallerLightTitleText from '../../Components/Text/SmallerLightTitleText';
import TableOfContents from '../../Components/Tables/TableOfContents';
import App from '../../Components/General/App';
import firebase from 'react-native-firebase';
import Button from '../../Components/Buttons/SquareLargeButton';

export class LogInScreen extends Component {
    
    static navigationOptions = {
        title: 'LogIn'
    };

    
    constructor(props) {
        super(props);
    }

    loggedIn(){
        this.props.navigation.navigate('Home')
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <SmallerLightTitleText style={styles.title}>
                           Log in
                        </SmallerLightTitleText>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigate('Registration')}>
                            <Button buttonText="Registration"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.loggedIn()}>
                            <Button buttonText="Logged in"/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    progressContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 25,
            backgroundColor: '#f7f7f7'
    },
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
        flexDirection: 'column',
    },
    grid: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    icon: {
        marginTop: 10,
        width: 50,
        height: 50,
    },
    levelTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingTop: 10,
    },
    levelDescription: {
        fontSize: 18,
        paddingBottom: 30,
    },
    skill: {
        flexGrow: 1,
        height: Dimensions.get('window').width / 3,
        // width: Dimensions.get('window').width / 2 - 100,
        borderRadius: 5,
        margin: 10,
        marginLeft: 0,
        marginTop: 0,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skillTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
    }
})
