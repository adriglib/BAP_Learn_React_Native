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
        AsyncStorage,
        Linking } from 'react-native';
import SmallerLightTitleText from '../../Components/Text/SmallerLightTitleText';
import TableOfContents from '../../Components/Tables/TableOfContents';
import ProgressBar from '../../Components/Progress/ProgressBar';
import LoadingCircle from '../../Components/Loading/LoadingCircle';
import App from '../../Components/General/App';
import firebase from 'react-native-firebase';


export class Levels extends Component {
    
    static navigationOptions = {
        title: 'Levels'
    };

    
    constructor(props) {
        super(props);
        this.state = {
            experience: '0',
            canRender: false
        }
    }

    // componentDidMount(){
    //     this.getUserInfo();
    // }

    componentWillMount(){
        this.getUserInfo();
    }

    async getUserInfo() {

        
        try {
            const value = await AsyncStorage.getItem('@MySuperStore:user');
            if (value !== null){
              let userInfo = JSON.parse(value);
              this.setState({
                  experience: userInfo.experience,
                  username: userInfo.username
              }, () => {
                  this.setState({
                      canRender: true,
                  })
              })
            }
          } catch (error) {
              // console.log(error);
            // Error retrieving data
          }
    }


    render(){
        const levelWrapper = {
            1: {
                title: 'Level 1',
                description: 'An introduction of the pure basics of React Native',
                skills: {
                    a: {
                        quizNr: 1,
                        title: 'Environment',
                        finished: false,
                        imgUrl: require('../../../icons/apple.png')
                    },
                    b: {
                        quizNr: 2,
                        title: 'Components',
                        finished: false,
                        imgUrl: require('../../../icons/blackboard.png')
                    },
                    c: {
                        quizNr: 3,
                        title: 'State',
                        finished: false,
                        imgUrl: require('../../../icons/mortarboard.png')
                    },
                    d: {
                        quizNr: 4,
                        title: 'Recap Level 1',
                        finished: false,
                        imgUrl: require('../../../icons/diploma.png')
                    }
                }
            },
            2: {
                title: 'Level 2',
                description: 'Components and the Component API',
                skills: {
                    a: {
                        quizNr: 5,
                        title: 'Components',
                        finished: false,
                        imgUrl: require('../../../icons/open-book.png')
                    },
                    b: {
                        quizNr: 6,
                        title: 'State',
                        finished: false,
                        imgUrl: require('../../../icons/physics.png')
                    },
                    c: {
                        quizNr: 7,
                        title: 'Props',
                        finished: false,
                        imgUrl: require('../../../icons/computer-mouse.png')
                    },
                    d: {
                        quizNr: 8,
                        title: 'Recap Level 2',
                        finished: false,
                        imgUrl: require('../../../icons/test.png')
                    }
                }
            },
            3: {
                title: 'Level 3',
                description: 'Styling in React Native',
                skills: {
                    a: {
                        quizNr: 9,
                        title: 'Stylesheet API',
                        finished: false,
                        imgUrl: require('../../../icons/palette.png')
                    },
                    b: {
                        quizNr: 10,
                        title: 'Flexbox',
                        finished: false,
                        imgUrl: require('../../../icons/abacus.png')
                    },
                    c: {
                        quizNr: 11,
                        title: 'Animations',
                        finished: false,
                        imgUrl: require('../../../icons/newtons-cradle.png')
                    },
                    d: {
                        quizNr: 12,
                        title: 'Recap Level 3',
                        finished: false,
                        imgUrl: require('../../../icons/test-tubes.png')
                    }
                }
            },
            4: {
                title: 'Level 4',
                description: 'Navigate in React Native',
                skills: {
                    a: {
                        quizNr: 13,
                        title: 'React Navigation',
                        finished: false,
                        imgUrl: require('../../../icons/earth-globe.png')
                    },
                    b: {
                        quizNr: 14,
                        title: 'Stacknavigation',
                        finished: false,
                        imgUrl: require('../../../icons/books-1.png')
                    },
                    c: {
                        quizNr: 15,
                        title: 'Tabnavigation',
                        finished: false,
                        imgUrl: require('../../../icons/bookshelf.png')
                    },
                    d: {
                        quizNr: 16,
                        title: 'Drawernavigation',
                        finished: false,
                        imgUrl: require('../../../icons/briefcase.png')
                    },
                    e: {
                        quizNr: 17,
                        title: 'Recap Level 4',
                        finished: false,
                        imgUrl: require('../../../icons/school-bus.png')
                    }
                }
            },
            5: {
                title: 'Level 5',
                description: 'Let\'s do a final test',
                skills: {
                    a: {
                        quizNr: 18,
                        title: 'Components',
                        finished: false,
                        imgUrl: require('../../../icons/diploma-1.png')
                    },
                    b: {
                        quizNr: 19,
                        title: 'Styling',
                        finished: false,
                        imgUrl: require('../../../icons/paint-brush.png')
                    },
                    c: {
                        quizNr: 20,
                        title: 'Navigation',
                        finished: false,
                        imgUrl: require('../../../icons/professor.png')
                    }
                }
            },
        }

        // alert(this.state.canRender);

        const {navigate} = this.props.navigation;
  
        const _that= this;
        const levels = 
        Object.keys(levelWrapper).map( function(key, index) {
                const experience = parseInt(_that.state.experience);
            // Object.keys(levelWrapper[key].skills).map( function(e) {
                return ( 
                    <View key ={key} style={skills.levelWrapper}>
                            <Text style={skills.levelTitle}>{levelWrapper[key].title}</Text>
                            <Text style={skills.levelDescription}>{levelWrapper[key].description}</Text>
                            <View style={skills.grid}>
                                {Object.keys(levelWrapper[key].skills).map( function(e) {

                                const completedText = (levelWrapper[key].skills[e].quizNr * 5)<=(experience);
                                const currentLevelText = (levelWrapper[key].skills[e].quizNr * 5) == (experience + 5);
                                const isLastLevel = false;
                                     
                                return ( 
                                        <TouchableOpacity key={e}
                                        disabled={(levelWrapper[key].skills[e].quizNr * 5)>(experience + 5)?true:false}
                                        style={(levelWrapper[key].skills[e].quizNr * 5)>(experience + 5)?skills.disabledSkill:skills.skill} onPress={() => navigate('Quiz', {quizNr: levelWrapper[key].skills[e].quizNr, experience: experience, } )}>
                                            <Text style={(levelWrapper[key].skills[e].quizNr * 5)>(experience + 5)?skills.disabledSkillTitle:skills.skillTitle}>{levelWrapper[key].skills[e].title}</Text>    
                                            <Image style={skills.icon} source={levelWrapper[key].skills[e].imgUrl}/>
                                            <View style={skills.checkMarkContainer}>
                                                 {completedText ? 
                                                    <Text style={skills.skillLevel}>✔</Text>
                                                    : 
                                                    currentLevelText ? <Text style={skills.skillLevel}>🕑</Text> : <Text></Text>
                                                    }
                                            </View>
                                        </TouchableOpacity>
                                 )
                                })}
                            </View>
                    </View>
                )
            // });
        });
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <SmallerLightTitleText style={styles.title}>
                           React Native Skills
                        </SmallerLightTitleText>
                    </View>
                    <View style={styles.progressContainer}>
                       {this.state.canRender ? <ProgressBar username={this.state.username} xp={this.state.experience} progress={this.state.experience}/> : <LoadingCircle></LoadingCircle>}
                    </View>
                    <View style={styles.container}>
                        {levels}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    progressContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 25,
            backgroundColor: '#f7f7f7'
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 25,
    },
    imageContainer: {
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        backgroundColor: '#55d3c8',
        paddingTop: 120,
        height: Dimensions.get('window').height / 6
    },
    pageUp: {
        flex: 1,
        margin: 0,
        padding: 0,
        top: 0,
        alignItems: 'center',
        justifyContent:'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        resizeMode: 'cover'
    }
});

const skills = StyleSheet.create({
    levelWrapper: {
        flexDirection: 'column',
    },
    grid: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    icon: {
        marginTop: 10,
        width: 50,
        height: 50,
    },
    levelTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingTop: 10,
    },
    levelDescription: {
        fontSize: 18,
        paddingBottom: 30,
    },
    skill: {
        flexGrow: 1,
        height: Dimensions.get('window').width / 3,
        // width: Dimensions.get('window').width / 2 - 100,
        borderRadius: 5,
        margin: 10,
        marginLeft: 0,
        marginTop: 0,
        // backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skillTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:5,
    },
    disabledSkill: {
        flexGrow: 1,
        height: Dimensions.get('window').width / 3,
        borderRadius: 5,
        margin: 10,
        marginLeft: 0,
        marginTop: 0,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledSkillTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:5,
    },
    checkMarkContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    skillLevel:{
        fontSize: 20,   
        
        paddingTop:5    
    }
})
