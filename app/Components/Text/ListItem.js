import React, { Component } from 'react';
import {    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

export default class ListItem extends Component {
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
        fontSize: 18,
        textAlign: 'left',
        fontFamily: "ArticulatCF-Light",
        color: 'grey',
    },
    fontContainer: {
        padding: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.5,
    }
});
