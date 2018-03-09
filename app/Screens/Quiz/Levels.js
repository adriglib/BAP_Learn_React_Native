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


export class Levels extends Component {
    
    static navigationOptions = {
        title: 'Levels'
    };

    
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <SmallerLightTitleText style={styles.title}>
                           React Native Skills
                        </SmallerLightTitleText>
                    </View>
                    <View style={styles.progressContainer}>
                        <Text>Your progress: 80XP</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={skills.levelWrapper}>
                            <Text style={skills.levelTitle}>Level 1</Text>
                            <Text style={skills.levelDescription}>An introduction of the pure basics of React Native</Text>
                            <View style={skills.grid}>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 1} )}>
                                    <Text style={skills.skillTitle}>Environment</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/apple.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 2})}>
                                    <Text style={skills.skillTitle}>Components</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/blackboard.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 3})}>
                                    <Text style={skills.skillTitle}>State</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/mortarboard.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 4})}>
                                    <Text style={skills.skillTitle}>Recap Level 1</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/diploma.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={skills.levelWrapper}>
                            <Text style={skills.levelTitle}>Level 2</Text>
                            <Text style={skills.levelDescription}>Components and the Component API</Text>
                            <View style={skills.grid}>
                                <TouchableOpacity style={skills.skill}  onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 5})}>
                                    <Text style={skills.skillTitle}>Components</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/open-book.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 6})}>
                                    <Text style={skills.skillTitle}>State</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/physics.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 7})}>
                                    <Text style={skills.skillTitle}>Props</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/computer-mouse.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 8})}>
                                    <Text style={skills.skillTitle}>Recap Level 2</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/test.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={skills.levelWrapper}>
                            <Text style={skills.levelTitle}>Level 3</Text>
                            <Text style={skills.levelDescription}>Styling in React Native</Text>
                            <View style={skills.grid}>
                                <TouchableOpacity style={skills.skill}  onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 9})}>
                                    <Text style={skills.skillTitle}>Stylesheet API</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/palette.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 10})}>
                                    <Text style={skills.skillTitle}>Flexbox</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/abacus.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 11})}>
                                    <Text style={skills.skillTitle}>Animations</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/newtons-cradle.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 12})}>
                                    <Text style={skills.skillTitle}>Recap Level 3</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/test-tubes.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={skills.levelWrapper}>
                            <Text style={skills.levelTitle}>Level 4</Text>
                            <Text style={skills.levelDescription}>Navigate in React Native</Text>
                            <View style={skills.grid}>
                                <TouchableOpacity style={skills.skill}  onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 13})}>
                                    <Text style={skills.skillTitle}>React Navigation</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/earth-globe.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 14})}>
                                    <Text style={skills.skillTitle}>Stacknavigation</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/books-1.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 15})}>
                                    <Text style={skills.skillTitle}>Tabnavigation</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/bookshelf.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 16})}>
                                    <Text style={skills.skillTitle}>Drawernavigation</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/briefcase.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 17})}>
                                    <Text style={skills.skillTitle}>Recap Level 4</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/school-bus.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={skills.levelWrapper}>
                            <Text style={skills.levelTitle}>Level 5</Text>
                            <Text style={skills.levelDescription}>Let's do a final test</Text>
                            <View style={skills.grid}>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 18})}>
                                    <Text style={skills.skillTitle}>Components</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/diploma-1.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 19})}>
                                    <Text style={skills.skillTitle}>Styling</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/paint-brush.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={skills.skill} onPress={() => this.props.navigation.navigate('Quiz', {quizNr: 20})}>
                                    <Text style={skills.skillTitle}>Navigation</Text>    
                                    {/* <Text style={skills.skillLevel}>Done</Text>     */}
                                    <Image style={skills.icon} source={require('../../../icons/professor.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skillTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
    }
})
