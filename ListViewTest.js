import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    ListView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationBar from './js/common/NavigationBar'
var data = {
    "result": [
        {
            "email": "f.lee@taylor.edu",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "g.jackson@hall.net",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "l.hall@rodriguez.com",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "q.lopez@davis.io",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "c.gonzalez@perez.net",
            "fullName": "张三张三张三"
        },
        {
            "email": "a.johnson@williams.net",
            "fullName": "张三张三"
        },
        {
            "email": "i.anderson@lopez.edu",
            "fullName": "张三张三"
        },
        {
            "email": "r.lee@davis.org",
            "fullName": "张三张三"
        },
        {
            "email": "o.young@lee.edu",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "j.wilson@williams.org",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "z.walker@jackson.io",
            "fullName": "张三张三"
        },
        {
            "email": "j.martinez@brown.gov",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "y.martin@lewis.io",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "w.taylor@gonzalez.org",
            "fullName": "张三张三"
        },
        {
            "email": "j.thomas@garcia.org",
            "fullName": "张三张三张三张三"
        }
    ],
    "statusCode": 0
};
export default class ListViewTest extends Component {
    constructor(props) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) =>
                r1 !== r2
        });
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
            isLoading:true
        };
        this.onLoad();
    }

    _renderRow(item) {
        return <View style={styles.row}>
            <TouchableOpacity
                // onPress={() => {
                //     this.toast.show('你单击了：' + item.fullName, DURATION.LENGTH_SHORT)
                // }}
            >
                <Text style={styles.tips}>{item.fullName}</Text>
                <Text>{item.email}</Text>
            </TouchableOpacity>
        </View>
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}/>
    }

    _renderFooter() {
        return <Image style={{width: 400, height: 100}}
                      source={{uri: 'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}}/>
    }

    onLoad(){
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        },2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='ListView'
                    style={{
                    backgroundColor:'#EE6363'
                    }}
                    statusBar={{
                        backgroundColor: '#EE6363'
                    }}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderRow(item)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    renderFooter={() => this._renderFooter()}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.onLoad()}/>}
                />
                {/*<Toast ref={toast=>{this.toast=toast}}/>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    tips:{
        fontSize:18,
    },
    row:{
        height:50,
    },
    line:{
        height:1,
        backgroundColor:'black'
    }
});