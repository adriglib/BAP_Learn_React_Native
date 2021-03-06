import React, { Component } from 'react';

import {    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

export default class LoadingCircle extends Component {
    render() {
        return(
            <View style={styles.horizontal}>
                <ActivityIndicator style={styles.loadingCircle} size="large" color={this.props.color} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});