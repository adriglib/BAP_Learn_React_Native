import React, { Component } from 'react';
import { Stacknavigation } from 'react-navigation';
import {StyleSheet, 
        Text, 
        View,
        ScrollView, 
        Image, 
        Modal,
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
import LoadingCircle from '../../Components/Loading/LoadingCircle';
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
            usernameError: '',
            loadingModalVisible: false,
            
            width: Dimensions.get("window").width,
        }
    }

    componentWillMount() {
        Dimensions.addEventListener('change', () => {
            let newWidth =  Dimensions.get("window").width;
            this.setState({
                width: newWidth
            });
        });
    }

    componentWillUnmount () {
        Dimensions.removeEventListener('change');
    }

    openModal(){
        this.setState({
            loadingModalVisible: true,
        })
    }

    closeModal(){
        this.setState({
            loadingModalVisible: false,
        })
    }

    register() {

        const emailError = validate('email', this.state.email)
        const passwordError = validate('password', this.state.password)
        const usernameError = validate('username', this.state.username)
    
        this.setState({
          emailError: emailError,
          passwordError: passwordError,
          usernameError: usernameError
        })

    
        if (emailError == null && passwordError== null && usernameError == null) {
            this.openModal();
            let date = new Date();
            day = date.getDate();
            month = date.getMonth();
            year = date.getFullYear();
            hours = date.getUTCHours() + 2;
            minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password, this.state.username)
            .then(async (user) => {
                firebase.database().ref('Users/' + firebase.auth().currentUser._user.uid).set({
                    email: user._user.email,
                    username: this.state.username,
                    experience: 0,
                    trophies: {
                        'first trophy': `${day}-${month}-${year} at ${hours}:${minutes}`,
                    },
                  });
                  this.itemsRef = firebase.database().ref('Users/' + firebase.auth().currentUser._user.uid);
                  let database = this.itemsRef.once('value');
                  database.then(items => {
                      // console.log(items._value.experience)
                      AsyncStorage.setItem('@MySuperStore:user', JSON.stringify(items));
                      this.closeModal();
                  });

                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
            })
            .catch((error) => {
                const { code, message } = error;
                this.closeModal();
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
        }
    }


    render(){

        return (
            <ScrollView style={{flex: 1,  backgroundColor: "#55d3c8",}}>
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
                        <View style={[modal.modalContainer, {width: this.state.width,}]}>
                                <LoadingCircle color="white" />
                        </View>
                    </Modal>
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
                                <Button backgroundColor="white" textColor="grey" buttonText="Sign up"/>
                            </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
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

const modal = StyleSheet.create({
    modalContainer: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
    }
})