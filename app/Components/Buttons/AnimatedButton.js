import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
    StyleSheet,
    Dimensions

} from 'react-native';
import * as Animatable from 'react-native-animatable';
export default class Animbutton extends Component {
  constructor(props) {
     super(props);
     this.state ={
       status: false,
     }
   }
   _onPress(){
     this.props._onPress(!this.state.status)
     // console.log(!this.state.status)
     this.setState({ status: !this.state.status})
     switch (this.props.effect) {
       case 'bounce':
         this.refs.view.bounce(800)
         break;
       case 'flash':
         this.refs.view.flash(800)
         break;
       case 'jello':
         this.refs.view.jello(800)
         break;
       case 'pulse':
         this.refs.view.pulse(800)
         break;
       case 'rotate':
         this.refs.view.rotate(800)
         break;
       case 'rubberBand':
         this.refs.view.rubberBand(800)
         break;
       case 'shake':
         this.refs.view.shake(800)
         break;
       case 'swing':
         this.refs.view.swing(800)
         break;
       case 'tada':
         this.refs.view.tada(800)
         break;
       case 'wobble':
         this.refs.view.wobble(800)
         break;
     }

   }
  render() {
    const status = this.state.status;
          
    // // console.log('Button; ' + this.props.correct);   
      
    return (
      <TouchableWithoutFeedback disabled={this.props.disabled} onPress={() => this._onPress()}>
      {/* [(this.props.correct != null) ? [(this.props.correct) ? styles.greenBackground : styles.redBackground] : styles.greyBackground] */}
        <Animatable.View ref="view"  style={[styles.button,  {backgroundColor: this.props.backgroundColor}]}>
          <Text style={[styles.buttonText, {color: this.props.backgroundColor == '#e6e6e6' ? "#919191" : "white", fontWeight: "bold"}]}>{this.props.text}</Text>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        padding: 15,
        margin: 8,
        borderRadius: 5,
        backgroundColor: '#9e9e9e'
    },
    buttonText: {
        fontSize: 16,
    },
        
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        padding: 25,
        // justifyContent: 'flex-start'
    },
    imageContainer: {
        flex: 1,
        top: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    item: {
        color: '#919191',
        margin: 10
    },
    header: {
        color: 'grey',
        fontSize: 30,
        marginBottom: 10,
        marginTop: 5
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
    }
});