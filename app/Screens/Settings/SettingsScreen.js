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
    Alert,
    TimePickerAndroid,
    AsyncStorage
} from 'react-native';

import BigBoldTitleText from '../../Components/Text/BigBoldTitleText';
import MySwitch from '../../Components/Buttons/Switch';
import LoadingCircle from '../../Components/Loading/LoadingCircle';
import Button from '../../Components/Buttons/SquareLargeButton';
import firebase from 'react-native-firebase';
import type { Notification } from 'react-native-firebase';
import localNotification from '../../Utils/localNotification';

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
            switchValue: false,
            switchTitleText: 'Loading settingsinfo',
            switchDescription: '',
            notificationTime: '...',
            notificationTimeDisabled: false
        }     
        
        
        this.checkIfTheUserHasNotificationsTurnedOn();
        this.getCurrentNotificationTime();
    }


    checkIfTheUserHasNotificationsTurnedOn() {
        AsyncStorage.getItem("showNotifications").then(value => {
            // console.log(value);
            if(value == 'true' || value == null){
                this.setState({
                    switchValue: true, 
                    switchTitleText: 'Turn off notifications', 
                    switchDescription: 'By turning off this switch you won\'t receive daily React Native notifications.',
                    notificationTimeDisabled: false
                })
                console.log('Notificaties staan aan of de instelling is nooit eerder gewijzigd.')
            }
            else {
                this.setState({
                    switchValue: false, 
                    switchTitleText: 'Turn on notifications', 
                    switchDescription: 'By turning on this switch you can receive a React Native notification everyday.',
                    notificationTimeDisabled: true
                })
                console.log('Notificaties staan uit.')
                firebase.notifications().cancelNotification('notificationId')
            }
        })  
    }

    getCurrentNotificationTime () {
        AsyncStorage.getItem("notificationTime").then(value => {
            console.log(value);
            
            let d = new Date(parseInt(value, 10));
            var ds = d.toString('MM/dd/yy HH:mm:ss');

            let hoursWithLeadingZeros = d.getHours() < 10 ? `0${d.getHours()}` : `${d.getHours()}`;
            let minutesWithLeadingZeros = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
            let previouslySetNotificationTime = `${hoursWithLeadingZeros}:${minutesWithLeadingZeros}`

            this.setState({notificationTime: previouslySetNotificationTime})
        })
    }
    
    toggleSwitch = (value) => {
        // console.log(value)
        if(value == true) {
            this.setState({
                switchValue: value, 
                switchTitleText: 'Turn off notifications', 
                switchDescription: 'By turning off this switch you won\'t receive daily React Native notifications.',
                notificationTimeDisabled: false
            })

            this.resumeNotifications();
            console.log('Zou nu de notificatie moeten hervatten.')
        }
        else {
            this.setState({
                switchValue: value, 
                switchTitleText: 'Turn on notifications', 
                switchDescription: 'By turning on this switch you can receive a React Native notification everyday.',
                notificationTimeDisabled: true
            })
            console.log('Zou nu de notificatie moeten cancelen.')
            firebase.notifications().cancelNotification('notificationId')

        }
        AsyncStorage.setItem("showNotifications", value.toString());
     }

     resumeNotifications () {
         console.log('We updaten de tijd, cancelen voorgaande notificaties en activeren nieuwe.')
        console.log('Notification Time',this.state.notificationTime);
        let notificationHour = this.state.notificationTime.split(':')[0];
        let notificationMinutes = this.state.notificationTime.split(':')[1];
        console.log(notificationHour, notificationMinutes)

        let newDateAndTime = new Date(2018, 1, 1, notificationHour, notificationMinutes, 0) // year, month, day, hour, minute, second
        let newDateAndTimeString = (newDateAndTime.getTime());

        console.log(newDateAndTimeString)
        // Before resuming clear previous notifications so you don't keep getting the previously timed notifications.
        firebase.notifications().cancelNotification('notificationId')

        firebase.notifications().scheduleNotification(localNotification, {
            fireDate: newDateAndTimeString,
            repeatInterval: 'minute'
        })
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
        this.checkIfTheUserHasNotificationsTurnedOn();

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

    async openTimepicker () {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: 14,
              minute: 0,
              is24Hour: true, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
              // Selected hour (0-23), minute (0-59)
              let minuteWithLeadingZero = minute < 10 ? `0${minute}` : minute.toString();

              let newTime = `${hour}:${minuteWithLeadingZero}`;
              this.setState({notificationTime: newTime})
              this.updateNotificationTime(hour, minute)
            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    }

    updateNotificationTime(selectedHour, selectedMinute){
        // console.log(selectedHour, selectedMinute);
        // Pick a random day and set the time of the day to the new selected time
        // convert this day to miliseconds since 1970.
        // set this time in the localstorage
        // cancel all running notification and start a new one
        let newDateAndTime = new Date(2018, 1, 1, selectedHour, selectedMinute, 0) // year, month, day, hour, minute, second
        let newDateAndTimeString = (newDateAndTime.getTime()).toString();
        AsyncStorage.setItem('notificationTime', newDateAndTimeString);
        this.resumeNotifications();
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

        // console.log(this.state.notificationTimeDisabled)
 
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
                            <Text style={styles.settingsTitle}>{this.state.switchTitleText}</Text>
                            <Text style={styles.settingsDescription}>{this.state.switchDescription}</Text>
                        </View>
                        <View style={[styles.settingsSwitchContainer, {width: (this.state.width / 12) * 3,}]}>
                                <MySwitch
                                toggleSwitch = {this.toggleSwitch}
                                switchValue = {this.state.switchValue}/>
                        </View>
                    </View>
                    <View style={[styles.settingsContainer, {margin: (Dimensions.get('window').width / 12) * 1,}]}>
                        <View style={[styles.settingsTextContainer,{width: (this.state.width / 12) * 7}]}>
                            <Text style={styles.settingsTitle}>Notification time:</Text>
                            <Text style={styles.settingsDescription}>You can change the time you will receive the daily notification.</Text>
                        </View>
                        <View style={[styles.settingsSwitchContainer, {width: (this.state.width / 12) * 3,}]}>
                               <TouchableOpacity disabled={this.state.notificationTimeDisabled} onPress={() => this.openTimepicker()}>
                                   <Text style={[{padding: 10,}, this.state.notificationTimeDisabled ? {opacity: 0.5} : {opacity: 1}]}>{this.state.notificationTime}</Text>
                               </TouchableOpacity>
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