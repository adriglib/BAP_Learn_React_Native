import React, { Component } from 'react';
// import LinearGradient from 'react-native-linear-gradient';

import {    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

export default class Button extends Component {

    render() {
        var bgC = true;
        return(
            <View style={[styles.box, {backgroundColor: this.props.backgroundColor}]}>
                <Text style={[styles.button, {color: this.props.textColor}]}>{this.props.buttonText}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        fontSize: 22,
        textAlign: 'center',
    },
    box: {
        margin: 3,
        justifyContent: 'center',
        // height: Dimensions.get('window').width / 6,
        width: Dimensions.get('window').width / 1.5,
        padding: 20,
        borderRadius: 50,
    },
});
