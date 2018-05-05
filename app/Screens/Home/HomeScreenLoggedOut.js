import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {    StyleSheet, Text, View,ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native';
import Button from '../../Components/Buttons/SquareLargeButton';
import BigBoldTitleText from '../../Components/Text/BigBoldTitleText';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import App from '../../Components/General/App';
import firebase from 'react-native-firebase';

export class HomeScreenLoggedOut extends Component {

    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: false,
            loading: true,
        };
    }

    componentDidMount() {
        firebase.auth().signInAnonymously()
            .then(() => {
                this.setState({
                    isAuthenticated: true,
                });
            });
    }

    render(){
        const { navigate } = this.props.navigation;
        // console.log(firebase.auth().currentUser)
        return (
            <View style={{flex: 1}}>
                {/*<Text onPress={() => navigate('Profile')}>*/}
                    {/*Navigate to Profile*/}
                {/*</Text>*/}
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <BigLightTitleText style={styles.title}>
                            Learn React Native
                        </BigLightTitleText>
                    </View>
                    <View style={styles.container}>
                        {/* <App></App> */}
                        <TouchableOpacity onPress={() => navigate('Documentation')}>
                            <View style={styles.menuItem}>
                                <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/open-book.png')}
                                />
                                <Text style={styles.menuTitle}>Learn it.</Text>
                                <Text style={styles.menuDescription}>Tips, cheat sheet...</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('LogIn')}>
                            <View style={styles.menuItem}>
                            <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/student.png')}
                                />
                                <Text style={styles.menuTitle}>Sign in.</Text>
                                <Text style={styles.menuDescription}>Quiz yourself and earn trophies.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Settings')}>
                            <View style={styles.menuItem}>
                                <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/settings.png')}
                                />
                                <Text style={styles.menuTitle}>Settings.</Text>
                                <Text style={styles.menuDescription}>Turn off your notifications.</Text>
                            </View>
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
        backgroundColor: '#55d3c8',
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
    },
    menuItem: {
        width: Dimensions.get('window').width / 2 - 15, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40
    },
    menuIcon: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5,
    },
    menuDescription: {
        textAlign: 'center',
        padding: 10,
        paddingTop: 5
    }
});
