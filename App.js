import React, { Component } from 'react';
import { HeaderBackButton, StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Modal, TouchableOpacity } from 'react-native';
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
import Button from './app/Components/Buttons/SquareLargeButton';


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



const tips = {
    components : {
        title: 'Smart vs Dumb Components',
        info: 'Dividing your app’s logic into two categories is helps you reuse your components better. Smart components, also known as the container components are concerned with the actual working of the UI. It is responsible for making API calls, fetching data, managing the state and so on. They have zero knowledge of how the data is presented to the user. Instead, it transfers the data over to the dumb components as props. Dumb components, popularly known as presentational components, are concerned with how the data is presented and the actual appearance of the app. This is where all the HTML and the styling for that particular UI element is rendered. They use the props received in a meaningful way and have no dependencies on any state management libraries. You can bind them with other container components, making them reusable as long as the props match.'
    },
    stylesheet: {
        title: 'Inline styling is not always the way to go',
        info: 'You can write your styles inline but that’s usually not the best idea. There are times to take advantage of inline styles but when in doubt, use StyleSheet, import { StyleSheet } from \'react-native\'. It’s often worth splitting your styles from your component code and importing them into your component. Using StyleSheet is an easy way to handle the maintainability of your front-end codebase.'
    },
    dimensions: {
        title: 'Use Dimensions for better responsiveness!',
        info: 'You can pull Dimensions from React Native, import { Dimensions } from \'react-native\'. This allows you to get the window width and height of the users device which can be very helpful in certain cases. Example: const { width, height } = Dimensions.get(\'window\'). Be careful with this, if you find yourself using dimensions too much it probably means you aren’t leveraging Flexbox well enough. '
    },
    constants: {
        title: 'Clean your code by learning constants',
        info: 'Much like using variables in standard CSS pre-processors, I’d recommend a similar strategy in React Native styling. It will allow you to define certain values in one location and re-use it throughout your styles. It’s massively beneficial when it comes to the maintainability of your styles. To implement this, simply import an object composed of styling properties. '
    }
}

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
        this.checkIfAppWasOpenedFromClosed();

        this.state = {
            firstLaunch: null,
            modalVisible: false,
            modalTitle: '',
            modalDescription: ''
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
                 notificationDate = 1514804400000; //01 Jan 2018, 12h00: Default hour: 12h
                 AsyncStorage.setItem('alreadyLaunched', 'true');               
                 AsyncStorage.setItem('notificationTime', '1514804400000');
                 AsyncStorage.setItem('showNotifications', 'true');

                 this.makeANotification(notificationDate);
            }
            else{
                AsyncStorage.getItem("notificationTime").then(value => {
                    // console.log('Reeds gelaunched dus notificatietijd blijft zelfde als ervoor.');
                    // console.log('Reeds opgeslagen tijd:', parseInt(value));

                    this.makeANotification(parseInt(value));
                })
            }})
        }  

      makeANotification(notificationTime) {
        // console.log('Notificatieschedule zal worden berekend op basis van:', notificationTime)       

        AsyncStorage.getItem("showNotifications").then(value => {
            console.log('Showing Notifications', value);
            if(value == 'true' || value == null){
                if(value == null){
                    'value is null dus notificatie wordt getoond'
                }
                else {
                    'value is true dus notificatie wordt getoond'
                }
                firebase.notifications().scheduleNotification(localNotification, {
                    fireDate: notificationTime,
                    repeatInterval: 'minute'
                })
            }
            else {
                firebase.notifications().cancelNotification('notificationId')
            }
        })

        // firebase.notifications().scheduleNotification(localNotification, {
        //     fireDate: dateTest.getTime(),
        //     repeatInterval: 'minute'
        // })
      }

      checkIfAppWasOpenedFromClosed() {
        firebase.notifications().getInitialNotification()
        .then((notificationOpen: NotificationOpen) => {
          if (notificationOpen) {
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            this.getRandomNotification();
            this.setState({modalVisible: true})
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;  
            firebase.notifications().removeAllDeliveredNotifications();
          }
        });
      }

      checkIfNotificationIsOpen(){
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            // Select a random doc page to go to.
            // Navigate to that page.
            // console.log(navigate)
            // this.props.navigation.navigate('Detail');
            
            this.getRandomNotification();
            this.setState({modalVisible: true})
            firebase.notifications().removeAllDeliveredNotifications();
            // console.log(notification);
        });
      }

      getRandomNotification () {
          console.log(Object.keys(tips).length);
          let randomTipIndex =  Math.floor(Math.random() * Object.keys(tips).length);
          console.log(randomTipIndex);
          let randomTip = Object.keys(tips)[randomTipIndex];
          console.log(randomTip)
          console.log(tips[randomTip])
          this.setState({
              modalTitle: tips[randomTip].title,
              modalDescription: tips[randomTip].info,
          })

      }

     
    
   
      render() {
        return (
          <View style={{flex:1}}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                <View style={modal.container}>
                    <View style={modal.itmes}>
                        <Text style={modal.title}>{this.state.modalTitle}</Text>
                        <Text style={modal.description}>{this.state.modalDescription}</Text>
                    </View>
                    <View style={modal.buttonContainer}>
                        <TouchableOpacity style={modal.touchable} onPress={() => {this.setState({modalVisible: false})}}>
                                    <Button style={modal.button} buttonText="Close tip" backgroundColor="#55d3c8" textColor="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <NavigationApp />
          </View>
        );
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

const modal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 25
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 35
    },
    description: {
        fontSize: 17
    },
    buttonContainer: {
        marginTop: 50,
        justifyContent: 'center'
    },
    touchable: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
});