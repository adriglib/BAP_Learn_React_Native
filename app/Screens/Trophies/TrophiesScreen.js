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
import AlertButton from '../../Components/Buttons/AlertButton';
import App from '../../Components/General/App';
import firebase from 'react-native-firebase';


export class Trophies extends Component {
    
    static navigationOptions = {
        title: 'Trophies'
    };

    
    constructor(props) {
        super(props);
        this.state = {
            experience: '0',
            trophies: {},
        }
    }

    componentWillMount(){
        this.getUserInfo();
    }

    async getUserInfo() {

        
        try {
            const value = await AsyncStorage.getItem('@MySuperStore:user');
            if (value !== null){
              let userInfo = JSON.parse(value);
              // console.log('User info:', userInfo);
              this.setState({
                  experience: userInfo.experience,
                  username: userInfo.username,
                  trophies: userInfo.trophies,
              })
            }
          } catch (error) {
              // console.log(error);
            // Error retrieving data
          }
    }


    render(){
        const trophiesObject = {
            'first trophy': {
                title: 'Getting Started',
                description: 'Good job! You have earned this trophy because you succesfully finished the first quiz.',
                imgUrl: require('../../../icons/diploma.png'),
                },
            'second': {
                title: 'Keeping up!',
                description: 'You have already done 3 tests, good job..',
                imgUrl: require('../../../icons/medal.png'),
                },
            'third': {
                title: 'You\'re the best, keep on learning',
                description: 'If you keep up like this, you\'ll be a React Native pro in no time.',
                imgUrl: require('../../../icons/physics.png'),
                },
            'fourth': {
                title: 'Getting Started',
                description: 'Good job! You have earned this trophy because you succesfully finished the first quiz.',
                imgUrl: require('../../../icons/backpack.png'),
                },
            'fifth': {
                title: 'Keeping up!',
                description: 'You have already done 3 tests, good job..',
                imgUrl: require('../../../icons/university.png'),
                },
            'sixt': {
                title: 'You\'re the best, keep on learning',
                description: 'If you keep up like this, you\'ll be a React Native pro in no time.',
                imgUrl: require('../../../icons/microscope.png'),
                },
            'seventh': {
                title: 'Getting Started',
                description: 'Good job! You have earned this trophy because you succesfully finished the first quiz.',
                imgUrl: require('../../../icons/column.png'),
                },
            'eight': {
                title: 'Keeping up!',
                description: 'You have already done 3 tests, good job..',
                imgUrl: require('../../../icons/molecule.png'),
                },
            'nine': {
                title: 'You\'re the best, keep on learning',
                description: 'If you keep up like this, you\'ll be a React Native pro in no time.',
                imgUrl: require('../../../icons/bell.png'),
                },
            'ten': {
                title: 'Getting Started',
                description: 'Good job! You have earned this trophy because you succesfully finished the first quiz.',
                imgUrl: require('../../../icons/school.png'),
                },
            'eleven': {
                title: 'Keeping up!',
                description: 'You have already done 3 tests, good job..',
                imgUrl: require('../../../icons/test.png'),
                },
            'twelve': {
                title: 'You\'re the best, keep on learning',
                description: 'If you keep up like this, you\'ll be a React Native pro in no time.',
                imgUrl: require('../../../icons/earth-globe.png'),
                }
        }


        // const userHasTrophies = false ;
        const userHasTrophies = !(this.state.trophies == undefined || this.state.trophies == null) ;

        let allTrophies;
        let allTrophiesWhenUserHasTrophies;
        let trophies;
        let lockedTrophies;
// console.log(userHasTrophies);
        if(userHasTrophies){
            console.log(this.state.trophies)
            trophies = 
            Object.keys(trophiesObject)
                .filter(key => key in this.state.trophies)
                .map((key, index) => {
                    // console.log(this.state.trophies[key])
                    return ( 
                        <View key={key} style={skills.trophy}>
                          <AlertButton disabled={false} imageURL={trophiesObject[key].imgUrl} title={trophiesObject[key].title} description={trophiesObject[key].description} dateEarned={this.state.trophies[key]} />
                        </View>
            )})

            lockedTrophies = 
            Object.keys(trophiesObject)
                .filter(key => !(key in this.state.trophies))
                .map((key, index) => {
                    return ( 
                        <View key={key} style={skills.trophy}>
                          <AlertButton disabled={true} imageURL={trophiesObject[key].imgUrl} title={trophiesObject[key].title} description={trophiesObject[key].description} dateEarned={this.state.trophies[key]} />
                        </View>
            )})
        }
        else {
            allTrophies = 
            Object.keys(trophiesObject)
                .map((key, index) => {
                    return ( 
                        <View key={key} style={skills.trophy}>
                          <AlertButton disabled={true} imageURL={trophiesObject[key].imgUrl} title={trophiesObject[key].title} description={trophiesObject[key].description} />
                        </View>
            )})

            console.log(allTrophies)
        }


        // // console.log(lockedTrophies)

        const {navigate} = this.props.navigation;
  
        const _that= this;

        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <SmallerLightTitleText style={styles.title}>
                           {this.state.username}
                        </SmallerLightTitleText>
                    </View>
                    <View style={styles.container}>
                        {userHasTrophies ? [trophies, lockedTrophies] : allTrophies}
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
    trophy: {
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
    trophyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingTop: 10,
    },
    trophyDescription: {
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
