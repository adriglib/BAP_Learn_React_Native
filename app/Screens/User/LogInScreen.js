import React, { Component } from 'react';
import { Stacknavigation } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import {StyleSheet, 
        Text, 
        View,
        ScrollView, 
        Image, 
        Modal,
        Dimensions, 
        SectionList, 
        TouchableOpacity,
        TextInput, 
        AsyncStorage,
        Linking } from 'react-native';
import SmallerLightTitleText from '../../Components/Text/SmallerLightTitleText';
import TableOfContents from '../../Components/Tables/TableOfContents';
import App from '../../Components/General/App';
import firebase from 'react-native-firebase';
import Button from '../../Components/Buttons/SquareLargeButton';
import TextField from '../../Components/Forms/TextField';
import LoadingCircle from '../../Components/Loading/LoadingCircle';
import validate from '../../Components/Forms/ValidateWrapper';

export class LogInScreen extends Component {
    
    static navigationOptions = {
        title: 'LogIn'
    };

    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            error: '',
            loadingModalVisible: false,
        }
    }

    loggedIn(){
        this.props.navigation.navigate('Home');
    }

    openModal(){
        this.setState({
            loadingModalVisible: false,
        })
    }

    closeModal(){
        this.setState({
            loadingModalVisible: false,
        })
    }

    onLogin() {

        this.openModal();

        // console.log(this.state.email)
        // console.log(this.state.password)
        const emailError = validate('email', this.state.email)
        const passwordError = validate('password', this.state.password)
    
        this.setState({
          emailError: emailError,
          passwordError: passwordError
        })
    
        if (emailError == null && passwordError == null) {
            this.setState({
                loadingModalVisible: true,
            })


        

            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (user) => {
                this.itemsRef = firebase.database().ref('Users/' + user._user.uid);
                let database = this.itemsRef.once('value');
                database.then(items => {
                    // console.log(items._value.experience)
                    AsyncStorage.setItem('@MySuperStore:user', JSON.stringify(items));
                    this.closeModal();
                });
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the 
                // `onAuthStateChanged` listener in App.js
            })
            .catch((error) => {
            const { code, message } = error;
            this.closeModal();
            // console.log(error);
            this.setState({
                error: error.toString()
            })
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
            });
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
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

                        <TouchableOpacity onPress={() => {this.onLogin()}}>
                            <Button backgroundColor="white" textColor="grey" buttonText="Sign in"/>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.warning}>{this.state.error}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigate('Registration')}>
                                <Text style={styles.register}>Don't have an account? Register.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate('HomeNoLogin')}>
                                <Text style={styles.register}>Use the app without an account.</Text>
                            </TouchableOpacity>
                        </View>

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
        width: Dimensions.get('window').width,
    },
    labels: {
        color: 'white',
        fontSize: 18
    },
    form: {
        marginTop: 40
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
    },
    register: {
        textAlign: 'center',
        color: 'white',
        paddingTop: 10,
    },
    warning: {
        textAlign: 'center',
        color:  '#F06449',
        paddingBottom: 15
    }
});


const modal = StyleSheet.create({
    modalContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
    }
})