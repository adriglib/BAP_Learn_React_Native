import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {   Modal, Alert, StyleSheet, Text, View,ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native';
import Button from '../../Components/Buttons/SquareLargeButton';
import BigBoldTitleText from '../../Components/Text/BigBoldTitleText';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import LoadingCircle from '../../Components/Loading/LoadingCircle';
import App from '../../Components/General/App';

import firebase from 'react-native-firebase';

export class HomeScreenLoggedIn extends Component {
    
//                    <View style={styles.imageContainer}>
//                        <Image style={styles.homeUp} source={require('../../../img/home_down.png')}/>
//                    </View>

    constructor(props){  
        super(props)
        const { navigate } = this.props.navigation;
        this.state = {
            loadingModalVisible: false,
        }

        console.log(firebase.auth().currentUser._user.isAnonymous);
        
    }

    openModal(){
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


    render(){
        const { navigate } = this.props.navigation;
        // console.log(firebase.auth().currentUser)
        return (
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
                            loadingModalVisible: false
                        })
                    }}>
                    <View style={modal.modalContainer}>
                            <LoadingCircle color="white" />
                    </View>
                    </Modal>

                    <View style={styles.imageContainer}>
                        <Text></Text>
                        <BigBoldTitleText style={styles.title}>
                            Learn{"\n"}React Native
                        </BigBoldTitleText>
                    </View>
                    <View style={styles.container}>
                        {/*<App></App>*/}
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
                        <TouchableOpacity onPress={() => navigate('Levels')}>
                            <View style={styles.menuItem}>
                            <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/logo.png')}
                                />
                                <Text style={styles.menuTitle}>Quiz it.</Text>
                                <Text style={styles.menuDescription}>Earn trophies and XP.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Trophies')}>
                            <View style={styles.menuItem}>
                                <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/trophy.png')}
                                />
                                <Text style={styles.menuTitle}>Trophies.</Text>
                                <Text style={styles.menuDescription}>See the trophies you have earned..</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Settings')}>
                            <View style={styles.menuItem}>
                            <Image
                                style={styles.menuIcon}
                                source={require('../../../icons/settings.png')}
                                />
                                <Text style={styles.menuTitle}>Settings.</Text>
                                <Text style={styles.menuDescription}>Sign off, delete profile, notifications...</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => {this.logout()}}>
                            <Button buttonText="Sign out"/>
                        </TouchableOpacity> */}
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

const modal = StyleSheet.create({
    modalContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
    }
})
