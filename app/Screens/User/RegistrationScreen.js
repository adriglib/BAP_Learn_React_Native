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
            passwordError: ''
        }
    }

    register() {
        console.log(this.state.email)
        console.log(this.state.password)
        const emailError = validate('email', this.state.email)
        const passwordError = validate('password', this.state.password)
    
        this.setState({
          emailError: emailError,
          passwordError: passwordError
        })
    
        if (!emailError && !passwordError) {
          alert('Details are valid!')
        }
    }

    render(){

        return (
            <View style={styles.container}>
                <View style={styles.form}>
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
                            <Button buttonText="Register"/>
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
        marginTop: 100
    },
    TextField: {
        color: 'white',
        fontSize: 17
    },
    validation: {
        color: '#ff6b6b',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 25
    }
});
