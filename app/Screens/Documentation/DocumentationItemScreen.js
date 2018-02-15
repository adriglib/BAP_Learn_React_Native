import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {    StyleSheet, Text, View,ScrollView, Image, Dimensions, SectionList, TouchableOpacity } from 'react-native';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import firebase from 'react-native-firebase';
import { MarkdownView } from 'react-native-markdown-view';

export class DocumentationItemScreen extends Component {

    static navigationOptions = {
        title: 'Detail'
    };

    constructor(props) {
        super(props);
        const { state } = this.props.navigation;

        this.itemsRef = firebase.database().ref('Documentation/' + state.params.sectionKey + '/' + state.params.itemKey);

        this.state = {
            dataSource: [],
            isLoading: true
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
                isLoading: false
            });
        });
    }

    render(){
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        console.log(this.state.dataSource)
        return (

            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.pageUp} source={require('../../../img/page_up.png')}/>
                        <BigLightTitleText style={styles.title}>
                            {state.params.name}
                        </BigLightTitleText>
                    </View>

                    /*
                    * VOORUITGNG 15feb2018: Markdown wordt ingelezen en data zit in firebase! Maar data gaat precies van zelf in Text was niet mag.
                    * */

                    <MarkdownView>
                        # MarkdownView{'\n'}
                        {'\n'}
                        **React Native** is even better with Markdown!{'\n'}
                        {'\n'}
                        ![RN Logo](https://reactjs.org/logo-og.png =120x63){'\n'}
                        {'\n'}
                        `react-native-markdown-view` is:{'\n'}
                        {'\n'}
                        * Easy to use{'\n'}
                        * Looks good by default{'\n'}
                        * Is __extensible__{'\n'}
                        {/*{this.state.dataSource}*/}
                    </MarkdownView>
                    {/*<View style={styles.container}>*/}
                        {/*<MarkdownView style={styles.container}>{this.state.dataSource}</MarkdownView>*/}
                    {/*</View>*/}
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
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 25,
        justifyContent: 'center'
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
