import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {    StyleSheet, Text, View,ScrollView, Image, Dimensions, SectionList, TouchableOpacity } from 'react-native';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import firebase from 'react-native-firebase';

export class DocumentationItemScreen extends Component {

    static navigationOptions = {
        title: 'Detail'
    };

    constructor(props) {
        super(props);
        const { state } = this.props.navigation;

        this.itemsRef = firebase.database().ref('Documentation/' + state.params.name);

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
        console.log(database)
        database.then(items => {
            console.log(items)
            items.forEach(item => {
                this.data = item.val();
            })
            this.setState({
                dataSource: this.data,
                isLoading: false
            });
        });
    }

    render(){
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

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
                        <Text>{this.state.dataSource}</Text>
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
