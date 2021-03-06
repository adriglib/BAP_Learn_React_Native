import React, { Component } from 'react';
import {    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

export default class SmallerLightTitleText extends Component {
    render() {
        return(
            <View style={styles.fontContainerLight} >
                <Text style={styles.textStyleLight}>{this.props.children}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyleLight: {
        fontSize: 30,
        textAlign: 'left',
        fontFamily: "ArticulatCF-Light",
        color: 'white',
        justifyContent: 'flex-start'
    },
    fontContainerLight: {
        padding: 20,
        position: 'absolute',
    }
});
