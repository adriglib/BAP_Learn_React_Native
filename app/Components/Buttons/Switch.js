import React, { Component } from 'react'
import {
   View,
   Switch,
   StyleSheet
} 
from 'react-native'

export default MySwitch = (props) => {
   return (
      <View>
         <Switch
            onValueChange = {props.toggleSwitch}
            value = {props.switchValue}/>
      </View>
   )
}