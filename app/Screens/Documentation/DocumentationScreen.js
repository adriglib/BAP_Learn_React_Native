import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {StyleSheet, 
        Text, 
        View,
        ScrollView, 
        Image, 
        Dimensions, 
        SectionList, 
        TouchableOpacity, 
        Linking } from 'react-native';
import BigLightTitleText from '../../Components/Text/BigLightTitleText';
import TableOfContents from '../../Components/Tables/TableOfContents';
import * as Animatable from 'react-native-animatable';

export class DocumentationScreen extends Component {
    
    static navigationOptions = {
        title: 'Documentation'
    };

    constructor(props){
        super(props);
        this.state = {
            width: Dimensions.get("window").width,
        }
    }

    componentDidMount() {

        Dimensions.addEventListener('change', () => {
            let newWidth =  Dimensions.get("window").width;
            this.setState({
                width: newWidth
            });
        });
    }

    componentWillUnmount () {
        Dimensions.removeEventListener('change');
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.imageContainer}>
                    <Animatable.View animation="fadeInLeft" delay={100} duration={1900}>
                        <BigLightTitleText style={styles.title}>
                            Learn more about React Native
                        </BigLightTitleText>
                    </Animatable.View>
                    </View>
                    <View style={[styles.diagonalSide, {            
                    width:  this.state.width,
                    borderLeftWidth: Math.sqrt((this.state.width *this.state.width) + 100),
                    }]}></View>
                    <Animatable.View animation="fadeInRight"  delay={250} duration={2000} style={styles.container}>
                        <Text style={styles.text}>With this cheat sheet you can refresh your React Native knowledge. If you are new to the framework you can read the documentation first.</Text>
                        <Text style={styles.linkText} onPress={() => Linking.openURL('http://facebook.github.io/react-native/docs/getting-started.html')}>Press here to open the docs.</Text>
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" delay={450} style={styles.container}>
                        {/*<Text>With this cheat sheet you can refresh your React Native knowledge. If you are new to the framework you can read the documentation first.</Text>*/}
                        {/*<Text onPress={() => Linking.openURL('http://facebook.github.io/react-native/docs/getting-started.html')}>Press here to open the docs.</Text>*/}
                        <TableOfContents style={styles.tableOfContents}
                        navigator={this.props.navigation}
                        />
                    </Animatable.View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 25,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 25,
        paddingTop: 10,
    },
    imageContainer: {
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#55d3c8',
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
    text: {
        fontSize: 16,
    },
    linkText: {
        fontSize: 16,
        color: '#55d3c8'
    },
    diagonalSide: {
        borderTopWidth: 50,
        borderRightWidth: 0,
        borderTopColor: "#55d3c8",
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    }
});
