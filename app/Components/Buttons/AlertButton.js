import React, { Component } from 'react';
import { 
    Alert, 
    Text, 
    TouchableOpacity, 
    Image,
    Dimensions,
    StyleSheet } from 'react-native';
    
export default class AlertButton extends Component {

    constructor(props){
        super(props);
    }
    
    showAlert(title, description, date) {
        Alert.alert(
            // This is Alert Dialog Title
            title,
        
            // This is Alert Dialog Message. 
            description + '\n\n' + 'You have earned this trophy on: ' + date, 
            [            
            {text: 'Close'},  
            ]
        )
    }

    render() {
        return(
            <TouchableOpacity disabled={this.props.disabled} onPress={() => this.showAlert(this.props.title, this.props.description, this.props.dateEarned)}>
                 <Image style={this.props.disabled ? trophy.disabledImage : trophy.image} source={this.props.imageURL}/>
            </TouchableOpacity>
        )
    }
}

const trophy = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        margin: 15,
    },
    disabledImage: {
        width: 70,
        height: 70,
        margin: 15,
        opacity: 0.2,
    }
})