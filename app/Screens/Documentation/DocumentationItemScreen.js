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
        console.log(database.value)
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
            h3: {
                fontSize: 24,
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

        return (

            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.pageUp} source={require('../../../img/page_up.png')}/>
                        <BigLightTitleText style={styles.title}>
                            {state.params.name}
                        </BigLightTitleText>
                    </View>
                    <View style={styles.container}>
                        <HTML html={this.state.htmlContent} tagsStyles={tags} classesStyles={classes} Styles={tags} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.homeUp} source={require('../../../img/home_down.png')}/>
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
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
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
    }
});

const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: 'pink',
    },
    mailTo: {
        color: 'orange',
    },
    text: {
        color: '#555555',
    },
}
