import React, {
    Component
} from 'react';
import { StackNavigator } from 'react-navigation';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    Switch,
    Alert,
    AsyncStorage
} from 'react-native';

import BigBoldTitleText from '../../Components/Text/BigBoldTitleText';
import LoadingCircle from '../../Components/Loading/LoadingCircle';
import Button from '../../Components/Buttons/SquareLargeButton';
import firebase from 'react-native-firebase';

import * as Animatable from 'react-native-animatable';

export class SettingsScreen extends Component {

    static navigationOptions = {
        title: 'Settings'
    };

    constructor(props){  
        super(props)
        const { navigate } = this.props.navigation;
        this.state = {
            loadingModalVisible: false,
            width: Dimensions.get("window").width,
        }
        
    }
    

    checkIfUserIsLoggedIn () {
        if(firebase.auth().currentUser && firebase.auth().currentUser._user.isAnonymous != true){
            return    (
                <View style={styles.buttonsContainer}>
                    <Animatable.View>
                    <TouchableOpacity onPress={() => {this.logout()}}>
                                <Button buttonText="Sign out" backgroundColor="#55d3c8" textColor="white"/>
                            </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View>
                    <TouchableOpacity onPress={() => this.showAlert()}>
                                <Text style={styles.deleteProfileText} >Delete profile</Text>
                            </TouchableOpacity>
                    </Animatable.View>

                </View>
            );
        }
    }

    componentDidMount() {

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

        setTimeout(function(){
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
        }, 2000)

           
    }

    showAlert() {
        Alert.alert(
            // This is Alert Dialog Title
            "Delete profile",
        
            // This is Alert Dialog Message. 
            "Are you sure you want to delete your profile? Be careful! This can not be undone.",
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Confirm deletion', onPress: () => this.deleteProfile()},
            ],
        )
    }

    deleteProfile() {
        this.openModal();

        let _this = this;

        let user = firebase.auth().currentUser;
        user.delete().then(function() {
          // User deleted.
          _this.closeModal();
        }).catch(function(error) {
            Alert.alert(
                'Woops!',
                'Something went wrong, you did not delete your profile succesfully.',
                { cancelable: false }
            )
            _this.closeModal();
          // An error happened.
        });
        
    }


    render(){

 
        return(
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
                        <BigBoldTitleText style={styles.title}>
                            Change your settings
                        </BigBoldTitleText>
                    </View>
                    <View style={[styles.diagonalSide, {            
                    width:  this.state.width,
                    borderLeftWidth: Math.sqrt((this.state.width *this.state.width) + 100),
                    }]}></View>
                    <View style={[styles.settingsContainer, {margin: (Dimensions.get('window').width / 12) * 1,}]}>
                        <View style={[styles.settingsTextContainer,{width: (this.state.width / 12) * 7}]}>
                            <Text style={styles.settingsTitle}>Turn off notifications</Text>
                            <Text style={styles.settingsDescription}>You will not recieve a daily notification by turning this off.</Text>
                        </View>
                        <View style={[styles.settingsSwitchContainer, {width: (this.state.width / 12) * 3,}]}>
                             <Switch ></Switch>
                        </View>
                    </View>
                    {this.checkIfUserIsLoggedIn()}

                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 25,
    },
    imageContainer: {
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#55d3c8',
    },
    settingsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
    },
    settingsSwitchContainer: {
        alignItems: 'center'
    },
    settingsTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    settingsDescription: {
        fontSize: 17
    },
    buttonsContainer: {
        marginTop: 50,
        marginBottom: 15,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    deleteProfileText: {
        fontSize: 18,
        margin: 10,
        marginTop: 20
    },
    diagonalSide: {
        borderTopWidth: 50,
        borderRightWidth: 0,
        borderTopColor: "#55d3c8",
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    }
})

const modal = StyleSheet.create({
    modalContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
    }
})