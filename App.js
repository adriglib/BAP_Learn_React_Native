import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
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
    }

    // componentDidMount() {
    //     firebase.messaging().hasPermission()
    //     .then(enabled => {
    //         if (enabled) {
    //         // user has permissions

    //         } else {
    //         // user doesn't have permission
    //         firebase.messaging().requestPermission()
    //         .then(() => {
    //             // User has authorised  
    //         })
    //         .catch(error => {
    //             // User has rejected permissions  
    //         });
    //         } 
    //     });
    // }  
    
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
