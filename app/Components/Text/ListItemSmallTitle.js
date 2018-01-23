import React, { Component } from 'react';
import {    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

export default class ListItemSmallTitle extends Component {
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
        fontSize: 23,
        textAlign: 'left',
        fontFamily: "ArticulatCF-Bold",
        color: 'grey'
    },
    fontContainer: {
        padding: 10,
        paddingTop: 20,
        paddingLeft: 0
    }
});
