import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage
} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
import DataRespository,{FLAG_STORAGE} from './js/expand/dao/DataRespository'
const URL='http://github.com/trending/';

export default class TrendingPage extends Component{
    constructor(props){
        super(props);
        this.dataRespository=new DataRespository(FLAG_STORAGE.flag_trending);
        this.state={
            result:''
        }
    }
    loadData(){
        this.dataRespository.fetchNetRepository(url)
            .then(data=>{
                this.setState({
                    result:JSON.stringify(data)
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)
                })
            })
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='GitHubTrending的使用'
                    style={{
                        backgroundColor:'#2196F3'
                    }}
                    statusBar={{
                        backgroundColor:'#2196F3'
                    }}
                />
                <TextInput style={{borderWidth:1,height:40,margin:6}}
                    onChangeText={(text)=>{
                        this.text=text;
                    }}
                />
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.tips}
                          onPress={()=>this.loadData()}
                    >加载数据</Text>
                    <Text>{this.state.result}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    tips:{
        fontSize:18,
        margin:5
    }
});
