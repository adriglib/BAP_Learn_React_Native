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
        Linking,
        AsyncStorage,
        TextInput  } from 'react-native';

import App from '../../Components/General/App';
import firebase from 'react-native-firebase';

import TextField from '../../Components/Forms/TextField';
// import validation from '../../Components/Forms/Validation';
import validate from '../../Components/Forms/ValidateWrapper';
import Button from '../../Components/Buttons/SquareLargeButton';


export class RegistrationScreen extends Component {
    
    static navigationOptions = {
        title: 'Registration'
    };

    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            username: '',
            usernameError: ''
        }
    }

    register() {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.username)
        const emailError = validate('email', this.state.email)
        const passwordError = validate('password', this.state.password)
        const usernameError = validate('username', this.state.username)
    
        this.setState({
          emailError: emailError,
          passwordError: passwordError,
          usernameError: usernameError
        })

        console.log(emailError)
        console.log(passwordError)
        console.log(usernameError)
    
        if (emailError == null && passwordError== null && usernameError == null) {

            console.log(this.state.email)
            console.log(this.state.password)
            console.log(this.state.username)

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password, this.state.username)
            .then(async (user) => {
                firebase.database().ref('Users/' + user._user.uid).set({
                    email: user._user.email,
                    username: this.state.username,
                    latestQuizNr: 0,
                    experience: 0,
                    trophies: '',
                  });
                  this.itemsRef = firebase.database().ref('Users/' + user._user.uid);
                  let database = this.itemsRef.once('value');
                  database.then(items => {
                      console.log(items._value.experience)
                      AsyncStorage.setItem('@MySuperStore:user', JSON.stringify(items));
                  });

                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
            })
            .catch((error) => {
                const { code, message } = error;
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
        }
    }


    render(){

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.labels}>Name or username</Text>
                        <TextInput 
                            style={styles.TextField}
                            selectionColor={"#F06449"}
                            underlineColorAndroid={"white"}
                            onChangeText={value => {
                                this.setState({
                                    username: value
                                })
                            }}
                            onBlur={() => {
                                this.setState({
                                usernameError: validate('username', this.state.username)
                                })
                            }}
                            error={this.state.usernameError}/>
                        <Text style={styles.validation}>{this.state.usernameError}</Text>
                    </View>
                    <View>
                        <Text style={styles.labels}>Email</Text>
                        <TextInput 
                            style={styles.TextField}
                            selectionColor={"#F06449"}
                            underlineColorAndroid={"white"}
                            onChangeText={value => {
                                this.setState({
                                    email: value.trim()
                                })
                            }}
                            onBlur={() => {
                                this.setState({
                                emailError: validate('email', this.state.email)
                                })
                            }}
                            error={this.state.emailError}/>
                        <Text style={styles.validation}>{this.state.emailError}</Text>
                    </View>
                    <View>
                        <Text style={styles.labels}>Password</Text>
                        <TextInput 
                            style={styles.TextField}
                            selectionColor={"#F06449"}
                            underlineColorAndroid={"white"}
                            secureTextEntry={true}
                            onChangeText={value => {
                                this.setState({
                                    password: value.trim(),
                                    passwordError: validate('password', this.state.password)
                                })
                            }}
                            onBlur={() => {
                                this.setState({
                                passwordError: validate('password', this.state.password)
                                })
                            }}
                            error={this.state.passwordError}/>
                        <Text style={styles.validation}>{this.state.passwordError}</Text>
                    </View>

                        <TouchableOpacity onPress={() => {this.register()}}>
                            <Button buttonText="Sign up"/>
                        </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50, 
        backgroundColor: "#55d3c8",
    },
    labels: {
        color: 'white',
        fontSize: 18
    },
    form: {
        marginTop: 50
    },
    TextField: {
        color: 'white',
        fontSize: 17
    },
    validation: {
        color: 'white',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 25,
        fontWeight: '700',
    }
});
