import React, { Component } from 'react';
import {    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

export default class BigBoldTitleText extends Component {
    render() {
        return(
            <View style={styles.fontContainer} >
                <Text style={styles.textStyle}>{this.props.children}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45,
        textAlign: 'left',
        fontFamily: "ArticulatCF-Bold",
        color: 'white'
    },
    fontContainer: {
        position: 'absolute',
        padding: 20
    }
});
