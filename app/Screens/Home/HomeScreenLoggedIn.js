import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {    StyleSheet, Text, View,ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native';
import Button from '../../Components/Buttons/SquareLargeButton';
import BigBoldTitleText from '../../Components/Text/BigBoldTitleText';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import App from '../../Components/General/App';

import firebase from 'react-native-firebase';

export class HomeScreenLoggedIn extends Component {
    
//                    <View style={styles.imageContainer}>
//                        <Image style={styles.homeUp} source={require('../../../img/home_down.png')}/>
//                    </View>

    constructor(props){  
        super(props)
        const { navigate } = this.props.navigation;
    }

    logout = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        console.log(firebase.auth().currentUser)
        return (
            <View style={{flex: 1}}>
                {/*<Text onPress={() => navigate('Profile')}>*/}
                    {/*Navigate to Profile*/}
                {/*</Text>*/}
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.homeUp} source={require('../../../img/home_up.png')}/>
                        <BigLightTitleText style={styles.title}>
                            Learn React Native
                        </BigLightTitleText>

                    </View>
                    <View style={styles.container}>
                        {/*<App></App>*/}
                        <TouchableOpacity onPress={() => navigate('Documentation')}>
                            <Button buttonText="Learn React Native"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Levels')}>
                            <Button buttonText="Play the game"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('')}>
                            <Button buttonText="Trophies"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('')}>
                            <Button buttonText="Settings"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.logout()}}>
                            <Button buttonText="Sign out"/>
                        </TouchableOpacity>
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
        padding: 15,
        justifyContent: 'center'
    },
    imageContainer: {
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        top: 0,
        left: 5,
        right: 5
    },
    homeUp: {
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
