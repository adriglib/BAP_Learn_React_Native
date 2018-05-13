import React from 'react';
import { View, Text, ListView, FlatList, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.itemsRef = firebase.database().ref('items');
        this.state = {
            isAuthenticated: false,
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };
        this.items = []
    }

    componentDidMount() {
        firebase.auth().signInAnonymouslyAndRetrieveData()
            .then(() => {
                this.setState({
                    isAuthenticated: true,
                });
            });

        this.itemsRef.on('child_added', (dataSnapshot) => {
            this.items.push({id: dataSnapshot.key, text: dataSnapshot.val()});
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.items)
            });
        });

        this.itemsRef.on('child_removed', (dataSnapshot) => {
            this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.items)
            });
        });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight>
                <View>
                    <View>
                        <Text>{rowData.text}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        // If the user has not authenticated
        if (!this.state.isAuthenticated) {
            return null;
        }

        return (
            <View>
                {/*<Text>You are authenticated.</Text>*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }

}

export default App;