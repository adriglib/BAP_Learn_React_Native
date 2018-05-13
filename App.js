import React, { Component } from 'react';
import { HeaderBackButton, StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
//import Button  from './app/Components/Button';
import { HomeScreenLoggedIn }  from './app/Screens/Home/HomeScreenLoggedIn';
import { SplashScreen }  from './app/Screens/Splash/SplashScreen';
import { DocumentationScreen }  from './app/Screens/Documentation/DocumentationScreen';
import {DocumentationItemScreen} from "./app/Screens/Documentation/DocumentationItemScreen";
import {Quiz} from "./app/Screens/Quiz/Quiz";
import {Levels} from "./app/Screens/Quiz/Levels";
import {Trophies} from "./app/Screens/Trophies/TrophiesScreen";
import {SettingsScreen} from "./app/Screens/Settings/SettingsScreen";
import {LogInScreen} from "./app/Screens/User/LogInScreen";
import {RegistrationScreen} from "./app/Screens/User/RegistrationScreen";
import { HomeScreenLoggedOut } from './app/Screens/Home/HomeScreenLoggedOut';



import { Notification, NotificationOpen } from 'react-native-firebase';

// Temporary workaround because React Navigation Dev Team confirmed this is a bug
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const checkIfLoggedIn = () => {
    alert('test');
}

const NavigationApp = StackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            header: null,
        }
    },
    Home: {
        screen: HomeScreenLoggedIn,
        navigationOptions: {
            header: null,
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0, // removes the border on the bottom,
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
            },
            }
    },
    HomeNoLogin: {
        screen: HomeScreenLoggedOut,
        navigationOptions: {
            header: null,
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0, // removes the border on the bottom,
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
            },
            }
    },
    LogIn: {
        screen: LogInScreen,
        navigationOptions: {
            header: null,
        }
    },
    Registration: {
        screen: RegistrationScreen,
        navigationOptions: {
            // header: null,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#55d3c8',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0, // removes the border on the bottom
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
            }}
    },
    Documentation: {
        screen: DocumentationScreen,
        navigationOptions({ navigation }) {
            return {
                title: 'Levels',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#55d3c8',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    borderBottomWidth: 0, // removes the border on the bottom
                    elevation: 0,       //remove shadow on Android
                    shadowOpacity: 0,
                },
                headerLeft: (
                <HeaderBackButton
                    title="Home" tintColor="white"
                    onPress={firebase.auth().currentUser._user != null && firebase.auth().currentUser._user.isAnonymous == false ? () => navigation.navigate('Home') : () => navigation.navigate('HomeNoLogin')}
                />
                )
            }
            }
    },
    Detail: {
        path: 'detail/:name',
        screen: DocumentationItemScreen,
        navigationOptions: {
            // header: null,

            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#55d3c8',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0, // removes the border on the bottom
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
            }}
    },
    Levels: {
        screen: Levels,
        navigationOptions({ navigation }) {
        return {
            title: 'Levels',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#55d3c8',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0, // removes the border on the bottom
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
            },
            headerLeft: (
            <HeaderBackButton
                title="Home" tintColor="white"
                onPress={() => navigation.navigate('Home')}
            />
            )
        }
        }
    },
        // screen: Levels,
        // navigationOptions: {
        //     // header: null,
            
        //     headerTintColor: 'white',
        //     headerStyle: {
        //         backgroundColor: '#55d3c8',
        //         position: 'absolute',
        //         top: 0,
        //         left: 0,
        //         right: 0,
        //         borderBottomWidth: 0, // removes the border on the bottom
        //         elevation: 0,       //remove shadow on Android
        //         shadowOpacity: 0,
        //     },
        // }
    // },    
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            // header: null,

            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#55d3c8',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0, // removes the border on the bottom
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
            }}
    },

    Trophies: {
        screen: Trophies,
        navigationOptions: {
            // header: null,

            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#55d3c8',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0, // removes the border on the bottom
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
            }}
    },

    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            // header: null,

            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#55d3c8',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth: 0, // removes the border on the bottom
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,
            }}
    },
});


export default class MyFirstApp extends Component {
    constructor() {
        super();
        this.makeNotificationChannel();
    }

    componentDidMount() {
        let _this = this;

        firebase.messaging().hasPermission()
        .then(enabled => {
            if (enabled) {
            // user has permissions
            console.log('User has giving notification access.');
            this.notificationListener();
            this.makeAndShowNotification();
            } else {
            // user doesn't have permission
            firebase.messaging().requestPermission()
            .then(() => {
                this.notificationListener();
                this.makeAndShowNotification();
                // User has authorised  
            })
            .catch(error => {
                // User has rejected permissions  
                console.log(error);
            });
            } 
        });
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
    }

    makeNotificationChannel(){
        console.log('Making a notification channel.')
        // Build a channel
        const channel = new firebase.notifications.Android.Channel('tips-tricks-channel', 'Tips and tricks channel', firebase.notifications.Android.Importance.Max)
        .setDescription('This is a channel where tips and tricks will appear');

        console.log(channel);
        // Create the channel
        firebase.notifications().android.createChannel(channel);
    }

    makeAndShowNotification(){
        console.log('make notification')
        const notification = new firebase.notifications.Notification()
        .setNotificationId('tip')
        .setTitle('Components')
        .setBody('Get more information about components')
        .setData({
            key1: 'value1',
            key2: 'value2',
        })
        .android.setChannelId('tips-tricks-channel')
        .android.setSmallIcon('./notification.png');

        // console.log(notification);
        console.log('show notification')
        firebase.notifications().displayNotification(notification)
       
    }

    notificationListener(){
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
        });
    }
    
    render() {
        return <NavigationApp />;
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 3,
    }
});
