import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
//import Button  from './app/Components/Button';
import { HomeScreen }  from './app/Screens/Home/HomeScreen';
import { DocumentationScreen }  from './app/Screens/Documentation/DocumentationScreen';
import {DocumentationItemScreen} from "./app/Screens/Documentation/DocumentationItemScreen";
import {Quiz} from "./app/Screens/Quiz/Quiz";
import {Levels} from "./app/Screens/Quiz/Levels";

const NavigationApp = StackNavigator({
    Home: {
        screen: HomeScreen,
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
});

export default class MyFirstApp extends Component {
    render() {
        return(
            <NavigationApp/>
           )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'lightgrey'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 3,
    }
});
