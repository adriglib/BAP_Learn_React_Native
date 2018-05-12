import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {    StyleSheet, Text, View,ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native';
import Button from '../../Components/Buttons/SquareLargeButton';
import BigBoldTitleText from '../../Components/Text/BigBoldTitleText';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';

export class HomeScreenLoggedOut extends Component {

    constructor(props){
        super(props)
        this.state = {
            isAuthenticated: false,
            loading: true,
            width: Dimensions.get("window").width,
        };
    }

    componentDidMount() {
        firebase.auth().signInAnonymously()
        .then(() => {
            this.setState({
                isAuthenticated: true,
            });
        });

        Dimensions.addEventListener('change', () => {
            let newWidth =  Dimensions.get("window").width;
            this.setState({
                width: newWidth
            });
        });
    }

    componentWillUnmount () {
        Dimensions.removeEventListener('change');
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
                    <Animatable.View animation="bounceIn" duration={2000}>
                            <BigBoldTitleText style={styles.title}>
                                Learn{"\n"}React Native
                            </BigBoldTitleText>
                        </Animatable.View>
                    </View>
                    <View style={[styles.diagonalSide, {            
                    width:  this.state.width,
                    borderRightWidth: Math.sqrt((this.state.width *this.state.width) + 100),
                    }]}></View>
                    <View style={styles.container}>
                        {/* <App></App> */}
                        <TouchableOpacity onPress={() => navigate('Documentation')}>
                            <Animatable.View animation="zoomIn" delay={300} style={[styles.menuItem, {width: (this.state.width / 2) - 15}]}>
                                <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/open-book.png')}
                                />
                                <Text style={styles.menuTitle}>Learn it.</Text>
                                <Text style={styles.menuDescription}>Tips, cheat sheet...</Text>
                            </Animatable.View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('LogIn')}>
                            <Animatable.View animation="zoomIn" delay={500} style={[styles.menuItem, {width: (this.state.width / 2) - 15}]}>
                            <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/student.png')}
                                />
                                <Text style={styles.menuTitle}>Sign in.</Text>
                                <Text style={styles.menuDescription}>Quiz yourself and earn trophies.</Text>
                            </Animatable.View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Settings')}>
                            <Animatable.View animation="zoomIn" delay={700} style={[styles.menuItem, {width: (this.state.width / 2) - 15}]}>
                                <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/settings.png')}
                                />
                                <Text style={styles.menuTitle}>Settings.</Text>
                                <Text style={styles.menuDescription}>Turn off your notifications.</Text>
                            </Animatable.View>
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
    menuItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
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
        paddingTop: 5,
        paddingBottom: 5
    },
    diagonalSide: {
        borderTopWidth: 50,
        borderLeftWidth: 0,
        borderTopColor: "#55d3c8",
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    }
});
