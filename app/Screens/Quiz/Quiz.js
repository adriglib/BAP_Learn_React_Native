import React, {
    Component
} from 'react';

import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    AsyncStorage
} from 'react-native';

import SmallerLightTitleText from '../../Components/Text/SmallerLightTitleText';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import Animbutton from '../../Components/Buttons/AnimatedButton';
import firebase from 'react-native-firebase';
import Button from '../../Components/Buttons/SquareLargeButton';

let newArray = []
let currentQuiz = {}
let nav;

export class Quiz extends Component {

    static navigationOptions = {
        title: 'Quiz'
    };

    constructor(props) {
        
        super(props);
        this.questionNumber = 1
        this.score = 0
     
        const quizData = {};
        const currentQuiz = {};
        const newArray = [];
        nav = this.props.navigation;

        this.itemsRef = firebase.database().ref('Quiz/' + nav.state.params.quizNr   );


        this.state = {
            question: 'Loading...',
            quizOptions: {0: 'Loading...', 1: 'Loading...', 2: 'Loading...', 3: 'Loading...'},
            correctOption: 'Loading',
            countCheck: 0,
            correct: 0,
            succesStatus: true,
            bgColor:  {0: '#e6e6e6', 1: '#e6e6e6', 2: '#e6e6e6', 3: '#e6e6e6'},
            disabledButtons: false,
            modalVisible: false,
            modalText: '',
            experience: nav.state.params.experience,
            showNextButton: false,
        }
    }

    componentDidMount() {
        let database = this.itemsRef.once('value');
        database.then(items => {
            quizData = items._value;
            // console.log(quizData)
            // console.log(nav.state.params.quizNr)
            // currentQuiz = quizData['question' + nav.state.params.quizNr]
            // console.log(currentQuiz);
            newArray = quizData;

            // console.log(newArray['question' + this.questionNumber])

            this.setState({
                question: newArray['question' + this.questionNumber].question,
                quizOptions: newArray['question' + this.questionNumber].quizOptions,
                correctOption: newArray['question' + this.questionNumber].correctOption,
            });
        });
    }

    openModal(visible, succeeded) {
        this.setState({
            modalVisible: visible,
        });

        if(succeeded){
            const experience = this.state.experience + 5;
            this.setState({
                modalText: 'You have passed this course and earned 5XP!',
            });
                AsyncStorage.getItem('@MySuperStore:user').then((values) => {
                    const value = JSON.parse(values);
                    const newExperience = parseInt(value.experience) + 5; 
                    if(newExperience < 10){
                        value["experience"] = '0' + newExperience.toString();
                    } else {
                        value["experience"] = newExperience.toString();
                    }
                                     
                    this.setState({
                          experience: newExperience,
                      })

                    AsyncStorage.setItem('@MySuperStore:user', JSON.stringify(value));
                    
                    const loggedInUser = firebase.auth().currentUser;
                    firebase.database().ref('Users/' + loggedInUser._user.uid + '/experience').set(newExperience);
                } )
        }else{
            this.setState({
                modalText: 'You have not passed this course and have not earned any XP.'
            });
        }
    }

    prev() {
        if (this.questionNumber > 1) {
            this.questionNumber--
                this.setState({
                    question: newArray['question' + this.questionNumber].question,
                    quizOptions: newArray['question' + this.questionNumber].quizOptions,
                    correctOption: newArray['question' + this.questionNumber].correctOption,
                    bgColor:  {0: '#e6e6e6', 1: '#e6e6e6', 2: '#e6e6e6', 3: '#e6e6e6'},
                     disabledButtons: false,
                })
        }
    }

    next() {

        if (this.questionNumber < Object.keys(quizData).length) {
            this.questionNumber++
                this.setState({
                    question: newArray['question' + this.questionNumber].question,
                    quizOptions: newArray['question' + this.questionNumber].quizOptions,
                    correctOption: newArray['question' + this.questionNumber].correctOption,
                    bgColor:  {0: '#e6e6e6', 1: '#e6e6e6', 2: '#e6e6e6', 3: '#e6e6e6'},
                    disabledButtons: false,           
                    showNextButton: false,
                })
        } else {
// Check here if everything right or wrong, if wrong go to a screen that recaps 
            if(this.state.succesStatus == false){
                this.openModal(true, false);
            }
            else {
                this.openModal(true, true);
            }
        
//            this.props.quizFinish(this.score * 100 / 5)
        }
    }

    replaceText () {
 
      var originalText = this.state.question.toString();

      var NewText = originalText.replace("___", this.state.quizOptions[this.state.correctOption].toString());


      this.setState({ question : NewText});

      }

    _answer(status, ans) {
        this.setState({
            disabledButtons: true,
            showNextButton: true,
        })
        if (status == true) {
            
            const count = this.state.countCheck + 1;
            console.log(count)
            
            this.setState({
                countCheck: count
            })
            
            this.replaceText();
            const bgColors = this.state.bgColor;
            
            if (ans == this.state.correctOption) {
                this.score += 1
                
                bgColors[this.state.correctOption] = '#55d3c8';

                this.setState({
                    correct: true, 
                    status: false}, 
                    function () {
                    // console.log(this.state.correct)
                    // setTimeout(() => {
                    //   this.next();
                    // }, 3000);
                });
                
                
            }
            else {
                bgColors[ans] = '#d35572';
                bgColors[this.state.correctOption] = '#55d3c8';
                this.setState(
                    {correct: false, 
                     status: false,
                     succesStatus: false,
                    }, function () {
                    // console.log(this.state.correct)
                    // setTimeout(() => {
                    //   this.next();
                    // }, 5000);
                });
            }
        } else {
            const count = this.state.countCheck - 1
            this.setState({
                countCheck: count,
                correct: false
            })
            if (this.state.countCheck < 1 || ans == this.state.correctOption) {
                this.score -= 1
            }
        }

    }


  render() {
    let _this = this
    const currentOptions = this.state.quizOptions

    const { state } = this.props.navigation;
    
    const quizOptions = Object.keys(currentOptions).map( function(i) {
      return (  
          <View key={i}>
            <Animbutton disabled={_this.state.disabledButtons} backgroundColor={_this.state.bgColor[i]} countCheck={_this.state.countCheck} correct={_this.state.correct} effect={"rubberband"} _onPress={(status) => _this._answer(status,i)} text={currentOptions[i]} />
          </View>
                                                   )
    });

    function renderIf(condition, content) {
        if (condition) {
            return content;
        } else {
            return null;
        }
    }

    return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>

                    <Modal
                    animationType="slide"
                    transparent={false}
                    hardwareAccelerated={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.props.navigation.navigate('Levels');
                    }}>
                        <View style={modal.container}>
                            <View>
                                <Text style={modal.text}>{this.state.modalText}</Text>
                            </View>
                            <View>
                                <TouchableOpacity  onPress={() => {
                                    this.openModal(!this.state.modalVisible);
                                    this.questionNumber = 1;
                                    this.setState({
                                        question: newArray['question1'].question,
                                        quizOptions: newArray['question1'].quizOptions,
                                        correctOption: newArray['question1'].correctOption,
                                        bgColor:  {0: '#e6e6e6', 1: '#e6e6e6', 2: '#e6e6e6', 3: '#e6e6e6'},
                                        disabledButtons: false,
                                    });
                                    }}>
                                <Button buttonText="Retry"/>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => {
                                    this.openModal(!this.state.modalVisible);
                                    this.props.navigation.navigate('Levels', { getXP: true });
                                    }}>
                                <Button buttonText="Close"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.imageContainer}>
                        <SmallerLightTitleText>
                            {this.state.question}
                        </SmallerLightTitleText>
                        <View style={styles.prevNextButtonsContainer}>
                            <Text style={[styles.prevNextButton, styles.prevNextButtonText]}>
                                    {this.state.experience} XP
                            </Text>
                            {renderIf(this.state.showNextButton, 
                            <TouchableOpacity style={styles.prevNextButton} onPress={() => this.next()}>
                                <Text style={styles.prevNextButtonText}>Next</Text>
                             </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View style={styles.pageUp}/>
                    <View style={styles.container}>
                        { quizOptions }
                    </View>
                </ScrollView>
            </View>
    );
  }
}

const styles = StyleSheet.create({
    prevNextButtonsContainer: {
        // backgroundColor: 'red',
        height: Dimensions.get('window').height / 2.5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    prevNextButton: {
        padding: 10,
        // backgroundColor: '#F06449',
        borderRadius: 5,
        margin: 5
    },
    prevNextButtonText: {
        color: 'white'
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
    },
    container: {
        flex: 1,
        padding: 25,
    },
    imageContainer: {
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#55d3c8',
        
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2.4,
    },
    item: {
        color: '#919191',
        margin: 10
    },
    header: {
        color: 'grey',
        fontSize: 30,
        marginBottom: 10,
        marginTop: 5
    },
    pageUp: {
        flex: 1,
        margin: 0,
        padding: 0,
        top: 0,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'yellow',
    }
});

const modal = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#55d3c8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'left',
        fontFamily: "ArticulatCF-Light",
        color: 'white',
    }
});