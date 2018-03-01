import React, {
    Component
} from 'react';

import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import SmallerLightTitleText from '../../Components/Text/SmallerLightTitleText';
import Animbutton from '../../Components/Buttons/AnimatedButton';


let newArray = []

const quizData = {
    "quiz": {
        "quiz1": {
            "question1": {
                "correctOption": "3",
                "quizOptions": {
                    "1": "Java",
                    "2": "PHP",
                    "3": "Javascript",
                    "4": "IOS"
                },
                "question": "React is a ____ library"
            },
            "question2": {
                "correctOption": "4",
                "quizOptions": {
                    "1": "XML",
                    "2": "YML",
                    "3": "HTML",
                    "4": "JSX"
                },
                "question": "____ tag syntax is used in React"
            },
            "question3": {
                "correctOption": "1",
                "quizOptions": {
                    "1": "Single root DOM node",
                    "2": "Double root DOM node",
                    "3": "Multiple root DOM node",
                    "4": "None of the above"
                },
                "question": "Application built with just React usually have ____"
            },
            "question4": {
                "correctOption": "2",
                "quizOptions": {
                    "1": "mutable",
                    "2": "immutable",
                    "3": "variable",
                    "4": "none of the above"
                },
                "question": "React elements are ____"
            },
            "question5": {
                "correctOption": "3",
                "quizOptions": {
                    "1": "functions",
                    "2": "array",
                    "3": "components",
                    "4": "json data"
                },
                "question": "React allows to split UI into independent and reusable pieses of ____"
            }
        }
    }
}

export class Quiz extends Component {

    static navigationOptions = {
        title: 'Quiz'
    };

    constructor(props) {
        
        super(props);
        this.questionNumber = 0
        this.score = 0

        const currentQuiz = quizData.quiz.quiz1
        newArray = Object.keys(currentQuiz).map(function (i) {
            return currentQuiz[i]
        });
        
        this.state = {
            question: newArray[this.questionNumber].question,
            quizOptions: newArray[this.questionNumber].quizOptions,
            correctOption: newArray[this.questionNumber].correctOption,
            countCheck: 0,
            correct: null
        }
    }

    prev() {
        if (this.questionNumber > 0) {
            this.questionNumber--
                this.setState({
                    question: newArray[this.questionNumber].question,
                    quizOptions: newArray[this.questionNumber].quizOptions,
                    correctOption: newArray[this.questionNumber].correctOption
                })
        }
    }

    next() {
        if (this.questionNumber < newArray.length - 1) {
            this.questionNumber++
                this.setState({
                    countCheck: 0,
                    question: newArray[this.questionNumber].question,
                    quizOptions: newArray[this.questionNumber].quizOptions,
                    correctOption: newArray[this.questionNumber].correctOption
                })
        } else {
alert('no questions')
//            this.props.quizFinish(this.score * 100 / 5)
        }
    }

    replaceText () {
 
      var originalText = this.state.question.toString();

      var NewText = originalText.replace("____", this.state.quizOptions[this.state.correctOption].toString());

      this.setState({ question : NewText});

      }

    _answer(status, ans) {

        if (status == true) {
            
            const count = this.state.countCheck + 1
            
            this.setState({
                countCheck: count
            })
            
            this.replaceText();
            
            if (ans == this.state.correctOption) {
                this.score += 1
                                
                this.setState({correct: true, status: false}, function () {
                    console.log(this.state.correct)
                    setTimeout(() => {
                      this.next();
                    }, 3000);
                });
                
                
            }
            else {
                this.setState({correct: false, status: false}, function () {
                    console.log(this.state.correct)
                    setTimeout(() => {
                      this.next();
                    }, 5000);
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
    
    const quizOptions = Object.keys(currentOptions).map( function(i) {
      return (  
          <View key={i}>
            <Animbutton countCheck={_this.state.countCheck} correct={_this.state.correct} effect={"tada"} _onPress={(status) => _this._answer(status,i)} text={currentOptions[i]} />
          </View>
                                                   )
    });

    return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <SmallerLightTitleText>
                            {this.state.question}
                        </SmallerLightTitleText>
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
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
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