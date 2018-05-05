import React, { Component } from 'react';
import {    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

export default class ProgressBar extends Component {

    gettingUserData(props) {
        const experience = this.props.xp;
        if (experience == 0) {
          return  <Text>Hi {this.props.username}! {"\n"}{"\n"}
          Welcome to the React Native Course, here you can learn this exiting framework in an interactive way. {"\n"}
          Earn thropies and become a true React Native master! {"\n"}{"\n"}
          You can only learn about a new skill when you've answered all previous question correctly. You gain experience by learning skills.{"\n"}{"\n"}
          Have fun!
          {"\n"} </Text>;
        }
        else if(experience >= 100) {
            return <Text>Look who it is, our React Native superstar {this.props.username}! 
            You have finished all games and sadly can't earn any more experience, 
            if you want you can retake the quizes.{"\n"}{"\n"}</Text>;
        }
        else {
            return  <Text>Welcome back {this.props.username}! Enjoy learning React Native and earning those throphies.{"\n"}{"\n"}</Text>;
        }
      }
      

    render() {
        var width = (Dimensions.get('window').width / 3.2)*2; 
        var progress = this.props.progress < 100 ? '0.' + this.props.progress : '1';


        return(
            <View>
                <View>
                    {this.gettingUserData()}
                </View>
                <View style={styles.container}>
                    <View style={styles.experience}>       
                        <Text>Experience: {this.props.xp}/100XP</Text>
                    </View>
                    <View style={styles.barContainer}>
                        <View style={[{width: width}, styles.backgroundBar ]}>
                        </View>
                        <View style={[{width: width * progress}, styles.progressBar]}>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    experience: {
        width: (Dimensions.get('window').width / 4)*1,
        // backgroundColor: 'blue',
    },
    barContainer:{
        justifyContent: 'center',
    },
    backgroundBar: {
        height: 5,
        backgroundColor: 'white',
        // position: 'absolute',
        borderRadius: 5,
    },
    progressBar: {
        height: 5,
        backgroundColor: '#55d3c8',
        position: 'absolute',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    }
});
