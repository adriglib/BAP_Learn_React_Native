import React, { Component } from 'react';
import firebase from 'react-native-firebase';


const localNotification = new firebase.notifications.Notification(
    {
            sound: 'default',
            show_in_foreground: true,
    }
    )
    .setNotificationId('notificationId')
    .setTitle('Daily Reminder')
    .setBody('Check the React Native tip of the day!')
    .setData({
        key1: 'value1',
        key2: 'value2',
    })
    .android.setChannelId('tips-tricks-channel')
    .android.setSmallIcon('ic_launcher')   
    .android.setPriority(firebase.notifications.Android.Priority.High);

export default localNotification;