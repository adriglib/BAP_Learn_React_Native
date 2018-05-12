import React, { Component } from 'react';
// import LinearGradient from 'react-native-linear-gradient';

import {    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

export default class Button extends Component {

    constructor(props) {  
        super(props)
        this.state = {
            width: Dimensions.get("window").width,
        }
    }

    componentWillMount() {
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

    render() {
        var bgC = true;
        return(
            <View style={[styles.box, {backgroundColor: this.props.backgroundColor, width: 250}]}>
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
        padding: 20,
        borderRadius: 50,
    },
});
