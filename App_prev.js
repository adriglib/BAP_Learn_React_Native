import React, { Component } from 'react';
import { HeaderBackButton, StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
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
import localNotification from './app/Utils/localNotification';



import type { Notification, NotificationOpen } from 'react-native-firebase';

// Temporary workaround because React Navigation Dev Team confirmed this is a bug
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

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

// const localNotification = new firebase.notifications.Notification(
//     {
//             sound: 'default',
//             show_in_foreground: true,
//     }
//     )
//     .setNotificationId('notificationId')
//     .setTitle('Daily Reminder')
//     .setBody('Learn more about React Native!')
//     .setData({
//         key1: 'value1',
//         key2: 'value2',
//     })
//     .android.setChannelId('tips-tricks-channel')
//     .android.setSmallIcon('ic_launcher')   
//     .android.setPriority(firebase.notifications.Android.Priority.High);

export default class MyFirstApp extends Component {
    constructor() {
        super();
        this.makeNotificationChannel();
        this.checkIfNotificationIsOpen();

        this.state = {
            firstLaunch: null,
        };
    }

    componentDidMount() {

        let _this = this;

        firebase.messaging().hasPermission()
        .then(enabled => {
            if (enabled) {
            // user has permissions
            // console.log('User has giving notification access.');
            this.notificationListener(localNotification);
            } else {
            // user doesn't have permission
            firebase.messaging().requestPermission()
            .then(() => {
                this.notificationListener(localNotification);
                // User has authorised  
            })
            .catch(error => {
                // User has rejected permissions  
                // console.log(error);
            });
            } 
        });
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

    makeNotificationChannel(){
        // Build a channel
        const channel = new firebase.notifications.Android.Channel('tips-tricks-channel', 'Tips and tricks channel', firebase.notifications.Android.Importance.Max)
        .setDescription('This is a channel where tips and tricks will appear');

        // Create the channel
        firebase.notifications().android.createChannel(channel);
    }


    notificationListener(){

        this.checkIfFirstTimeLaunched();

        firebase.notifications().onNotification((notification) => {
            // You've received a notification that hasn't been displayed by the OS
            // To display it whilst the app is in the foreground, simply call the following
            firebase.notifications().displayNotification(localNotification);
        });
      }

      checkIfFirstTimeLaunched(){
         let notificationDate;
          // Check if you have already launched the application.
          // You have not opened the application so the 
          AsyncStorage.getItem("alreadyLaunched").then(value => {
            if(value == null){
                 notificationDate = new Date("June 14, 2018 12:00:00");
                 AsyncStorage.setItem('alreadyLaunched', 'true');               
                 AsyncStorage.setItem('notificationTime', notificationDate.getTime());

                 this.makeANotification(notificationDate.getTime());
                 this.setState({firstLaunch: true});
            }
            else{
                AsyncStorage.getItem("notificationTime").then(value => {
                    console.log('opgeslagen tijd',value);
                    console.log('Reeds gelaunched dus notificatietijd blijft zelfde als ervoor.');

                    this.makeANotification(value);
                    this.setState({firstLaunch: false});
                })
            }})
        }  

      makeANotification(notificationTime) {
        console.log('datum waar notificatie wordt berekend', notificationTime)

        AsyncStorage.getItem("notificationTime").then(value => {
            if(value == null){
                AsyncStorage.setItem('notificationTime', '1526724000000');
                notificationTime = '1514804400000'
            }
  

            firebase.notifications().scheduleNotification('notificationId', {
                fireDate: notificationTime,
                repeatInterval: 'minute'
            })
        });
      }


      checkIfNotificationIsOpen(){
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            // console.log(notification);
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
