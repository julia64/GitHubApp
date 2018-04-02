import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import DataRespository from '../../expand/dao/DataRespository'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'

export default class MyPage extends Component{
    constructor(props){
        super(props);
        this.dataResponsitory=new DataRespository();
        this.state={
            result:'',
        }
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                title='我的'
                style={{
                    backgroundColor:'#2196F3'
                }}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            />
            <Text
                onPress={()=>{
                    this.props.navigator.push({
                        component:CustomKeyPage,
                        params:{...this.props}
                    })
                }}
            >自定义标签</Text>
            <Text
                onPress={()=>{
                    this.props.navigator.push({
                        component:SortKeyPage,
                        params:{...this.props}
                    })
                }}
            >标签排序</Text>
        </View>
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    tips:{
        fontSize:29
    }
});