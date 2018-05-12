import React from 'react';
import { View, Text, SectionList, TouchableOpacity, AppRegistry, ActivityIndicator, StyleSheet   } from 'react-native';
import firebase from 'react-native-firebase';
import ListItemSmallTitle from '../Text/ListItemSmallTitle';
import ListItem from '../Text/ListItem';
import LoadingCircle from '../Loading/LoadingCircle';
import { StackNavigator } from 'react-navigation';
import App from '../../Components/General/App';


class TableOfContents extends React.Component {

    constructor(props) {
        super(props);

        this.itemsRef = firebase.database().ref('Inhoud');

        this.state = {
           dataSource: [],
           isLoading: true
        };
        this.items = []
        this.title = ''
        this.datas = []
        this.sectionKey = ''
    }

    componentDidMount() {
            let database = this.itemsRef.once('value');
            database.then(items => {
                items.forEach(item => {
                    this.title = item.val().title;
                    this.datas = item.val().data;
                    this.sectionKey = item.key;
                    this.items.push({title: this.title, data: this.datas, sectionKey: this.sectionKey});
                })
                this.setState({
                    dataSource: this.items,
                    isLoading: false
                });
            });
    }

    sectionList () {
        // console.log(this.dataSource)
        return <SectionList
            sections={this.state.dataSource}
            renderItem={({item, index, section}) =>
                <TouchableOpacity  onPress={() => this.props.navigator.navigate('Detail', {name: item, sectionKey: section.sectionKey, itemKey: index} )}>
                    <ListItem>{item}</ListItem>
                </TouchableOpacity>}
            renderSectionHeader={({section}) => <ListItemSmallTitle>{section.title}</ListItemSmallTitle>}
            keyExtractor={(item, index) => index}
        />
    }

    loadingList () {
        return (
            <View style={styles.container}>
                <LoadingCircle color="#55d3c8"/>
            </View>
        )

    }

    render() {
        // // console.log(this.items)
        // const { navigator } = this.props.navigation;
        return (
        <View style={styles.test}>
            {this.state.isLoading ? this.loadingList() : this.sectionList() }
        </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    test: {
        flex: 1,
        // alignSelf: 'stretch'
    }
});

export default TableOfContents;