import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {    StyleSheet, Text, View,ScrollView, Image, Dimensions, SectionList, TouchableOpacity } from 'react-native';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import firebase from 'react-native-firebase';
// import Markdown from 'react-native-markdown-renderer';
// import { MarkdownView } from 'react-native-markdown-view';
import HTML from 'react-native-render-html';



export class DocumentationItemScreen extends Component {

    static navigationOptions = {
        title: 'Detail'
    };

    constructor(props) {
        super(props);
        const { state } = this.props.navigation;

        this.itemsRef = firebase.database().ref('Documentation/' + state.params.sectionKey + '/' + state.params.itemKey);

        this.tagsStyles =  { h3: { backgroundColor: 'red', fontStyle: 'italic', color: 'grey' } },

        this.state = {
            dataSource: [],
            isLoading: true,
            htmlContent: 'Loading...'
        };
        this.items = []
        this.title = ''
        this.data = []

    }

    componentDidMount() {
        let database = this.itemsRef.once('value');
        // console.log(database.value)
        database.then(items => {
            this.data = items.val()
            this.setState({
                dataSource: this.data,
                isLoading: false,
                htmlContent: this.data.toString()
            });
        });
    }

    render(){
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

        // const classes = {}
        const tags = {
            p: {
                fontSize: 54,
                fontWeight: '800'
            },
            pre: {
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#24243d',
                paddingLeft: 20,
                fontFamily: 'monospace',
                color: 'white'
            },
            code: {
                padding: 10}
        };

        const classes = {
            'language-bash': {
                width: '50%',
                flex: 1}
        };

        const html = `
    <i>Here, we have a style set on the "i" tag with the "tagsStyles" prop.</i>
    <p class="last-paragraph">Finally, this paragraph is styled through the classesStyles prop</p>`;



        return (


            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View  style={styles.titleContainer}>
                            <Text style={styles.title}>{state.params.name}</Text>
                    </View>
                    <View style={styles.container}>
                        <HTML html={this.state.htmlContent} 
                            tagsStyles={ 
                                { 
                                    h3: { fontSize: 19}, 
                                    li: { fontSize: 16},
                                    img: { paddingTop: 20, paddingBottom: 20},
                                    pre: { paddingTop: 20, paddingBottom: 20},
                                }
                            } 
                            classesStyles={
                                { 
                                    'language-bash': { backgroundColor: '#32476b', fontSize: 22, textAlign: 'left', color: 'white', fontWeight: '800' } 
                                }
                            } 
                            imagesMaxWidth={Dimensions.get('window').width/1.2} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        marginTop: 25,
    },
    container: {
        flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        padding: 25,
        // justifyContent: 'flex-start'
    },
    imageContainer: {
        backgroundColor: '#55d3c8'
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        resizeMode: 'cover'
    },
    titleContainer: {
        backgroundColor: '#55d3c8',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom : 40,
        paddingRight : 25,
        paddingLeft : 25,
    },
    title: {
        fontSize: 30,
        textAlign: 'left',
        fontFamily: "ArticulatCF-Light",
        color: 'white',
    }
});

