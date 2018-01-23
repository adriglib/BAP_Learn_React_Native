import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

export default class Button extends Component {
    render() {
        return(
            <View style={styles.box}>
                <Text style={styles.button}>{this.props.buttonText}</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    box: {
        margin: 3,
        justifyContent: 'center',
        backgroundColor: '#F06449',
        height: Dimensions.get('window').width / 6,
        width: Dimensions.get('window').width / 1.5,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    }
});
