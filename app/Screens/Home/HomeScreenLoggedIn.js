import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {   Modal, Alert, StyleSheet, Text, View,ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native';
import Button from '../../Components/Buttons/SquareLargeButton';
import BigBoldTitleText from '../../Components/Text/BigBoldTitleText';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import LoadingCircle from '../../Components/Loading/LoadingCircle';
import * as Animatable from 'react-native-animatable';

import { AndroidBackHandler } from 'react-navigation-backhandler';
import firebase from 'react-native-firebase';

export class HomeScreenLoggedIn extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    constructor(props) {  
        super(props)
        const { navigate } = this.props.navigation;
        this.state = {
            loadingModalVisible: false,
            width: Dimensions.get("window").width,
        }
    }




    componentWillMount() {
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

    openModal() {
        this.setState({
            loadingModalVisible: true,
        })
    }
    closeModal(){
        this.setState({
            loadingModalVisible: false,
        })
    }

    logout () {
        this.openModal();

        let _this = this;

            try {
                firebase.auth().signOut().then(function() {
                    _this.closeModal();
                });
            } catch (e) {
                Alert.alert(
                    'Woops!',
                    'Something went wrong, you did not sign out succesfully.',
                    { cancelable: false }
                )
                _this.closeModal();
                // console.log(e);
            }

    }

    onBackButtonPressAndroid () {
         return true;
    };

    render(){
        const { navigate } = this.props.navigation;
        // console.log(firebase.auth().currentUser)
        return (
            
            <AndroidBackHandler onBackPress={() => this.onBackButtonPressAndroid()}>
            <View style={{flex: 1}}>
                {/*<Text onPress={() => navigate('Profile')}>*/}
                    {/*Navigate to Profile*/}
                {/*</Text>*/}
                <ScrollView style={styles.scrollContainer}>
                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.loadingModalVisible}
                    onRequestClose={() => {
                        this.setState({
                            loadingModalVisible: false,
                        })
                    }}>
                    <View style={modal.modalContainer}>
                            <LoadingCircle color="white" />
                    </View>
                    </Modal>

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
                        {/*<App></App>*/}
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
                        <TouchableOpacity onPress={() => navigate('Levels')}>
                            <Animatable.View animation="zoomIn" delay={500} style={[styles.menuItem, {width: (this.state.width / 2) - 15}]}>
                            <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/logo.png')}
                                />
                                <Text style={styles.menuTitle}>Quiz it.</Text>
                                <Text style={styles.menuDescription}>Earn trophies and XP.</Text>
                            </Animatable.View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Trophies')}>
                            <Animatable.View animation="zoomIn" delay={700} style={[styles.menuItem, {width: (this.state.width / 2) - 15}]}>
                                <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/trophy.png')}
                                />
                                <Text style={styles.menuTitle}>Trophies.</Text>
                                <Text style={styles.menuDescription}>See the trophies you have earned..</Text>
                            </Animatable.View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Settings')}>
                            <Animatable.View animation="zoomIn" delay={900} style={[styles.menuItem, {width: (this.state.width / 2) - 15}]}>
                            <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/settings.png')}
                                />
                                <Text style={styles.menuTitle}>Settings.</Text>
                                <Text style={styles.menuDescription}>Sign off, delete profile, notifications...</Text>
                            </Animatable.View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => {this.logout()}}>
                            <Button buttonText="Sign out"/>
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </View>
            </AndroidBackHandler>

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

const modal = StyleSheet.create({
    modalContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
    }
})
