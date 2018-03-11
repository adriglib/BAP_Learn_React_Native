import React, { Component } from 'react';
import { Stacknavigation } from 'react-navigation';
import {StyleSheet, 
        Text, 
        View,
        ScrollView, 
        Image, 
        Dimensions, 
        SectionList, 
        TouchableOpacity, 
        Linking } from 'react-native';
import SmallerLightTitleText from '../../Components/Text/SmallerLightTitleText';
import TableOfContents from '../../Components/Tables/TableOfContents';
import App from '../../Components/General/App';
import firebase from 'react-native-firebase';
import LoadingCircle from '../../Components/Loading/LoadingCircle';


export class SplashScreen extends Component {
    
    static navigationOptions = {
        title: 'Splash'
    };

    constructor() {
        super();
        this.state = {
            loading: true,
        };
    }
    
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            let _this = this;
            this.setState({
                loading: false,
                user,
            });
            setTimeout( () => {
                this.checkLoggedInt();
             },1000);
        });
    }

    checkLoggedInt() {
        // The application is initialising
        if (!this.state.loading){
            // The user is an Object, so they're logged in
            console.log('Done loading')
            if (this.state.user) {
               this.props.navigation.navigate('Home')
            } else {  
                this.props.navigation.navigate('HomeNoLogin')
            }
        };
    }
    
    // Stop listening for auth changes.
    componentWillUnmount() {
        this.authSubscription();
    }

    render(){
        
        return (
            <View style={styles.container}>
                <View>
                    <LoadingCircle color="#55d3c8" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
    },
});

