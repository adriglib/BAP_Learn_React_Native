import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {    StyleSheet, Text, View,ScrollView, Image, Dimensions, SectionList, TouchableOpacity, Linking } from 'react-native';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import TableOfContents from '../../Components/Tables/TableOfContents';
import App from '../../Components/General/App';

export class DocumentationScreen extends Component {

    static navigationOptions = {
        title: 'Documentation'
    };

    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.pageUp} source={require('../../../img/page_up.png')}/>
                        <BigLightTitleText style={styles.title}>
                            Learn more about React Native
                        </BigLightTitleText>
                    </View>
                    <View style={styles.container}>
                        <Text>With this cheat sheet you can refresh your React Native knowledge. If you are new to the framework you can read the documentation first.</Text>
                        <Text onPress={() => Linking.openURL('http://facebook.github.io/react-native/docs/getting-started.html')}>Press here to open the docs.</Text>
                        <TableOfContents
                        navigator={this.props.navigation}
                        />
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
    },
    imageContainer: {
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
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
