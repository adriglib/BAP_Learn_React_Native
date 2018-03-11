import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';

class App extends Component {

        constructor() {
            super();
            this.state = {
                // isAuthenticated: false,
                loading: true,
            };
        }

        componentDidMount() {
            this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                loading: false,
                user,
            });
            });
        }

        // Stop listening for auth changes.
        componentWillUnmount() {
            this.authSubscription();
        }

    // componentDidMount() {
    //     firebase.auth().signInAnonymously()
    //         .then(() => {
    //             this.setState({
    //                 isAuthenticated: true,
    //             });
    //         });
    // }

    render() {
        // The application is initialising
        if (this.state.loading) return null;
    
        // The user is an Object, so they're logged in
        if (this.state.user) return <LoggedIn />;
    
        // The user is null, so they're logged out
        return <LoggedOut />;
      }

    // render() {
    //     // If the user has not authenticated
    //     if (!this.state.isAuthenticated) {
    //         return null;
    //     }

    //     return (
    //         <View>
    //             <Text>You are authenticated.</Text>
    //         </View>
    //     );
    // }

}

export default App;