import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
import HttpUtil from "./HttpUtil"

export default class fetch extends Component{
    constructor(props){
        super(props);
        this.state={
            result:''
        }
    }

    onLoad(url){
        // fetch(url)
        //     .then(response=>response.json())
        //     .then(result=>{
        //         this.setState({
        //             result:JSON.stringify(result)
        //         })
        //     })
        //     .catch(error=>{
        //         this.setState({
        //             result:JSON.stringify(error)
        //         })
        //     })
        HttpUtil.get(url)
            .then(result=>{
                this.setState({
                     result:JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                     result:JSON.stringify(error)
                })
            })
    }
    onSubmit(url,data){
        // fetch(url,{
        //     method:'POST',
        //     header:{
        //         'Accept':'application/json',
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(data)
        // })
        //     .then(response=>response.JSON())
        //     .then(result=>{
        //         this.setState({
        //             result:JSON.stringify(result)
        //         })
        //     })
        //     .catch(error=>{
        //         this.setState({
        //             result:JSON.stringify(error)
        //         })
        //     })
        HttpUtil.post(url,data)
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result)
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
                    title='Fetch的使用'
                    style={{
                        backgroundColor:'#EE6363'
                    }}
                    statusBar={{
                        backgroundColor: '#EE6363'
                    }}
                />
                <Text style={styles.tips}
                      onPress={()=>this.onLoad('http://rap.taobao.org/mockjsdata/11793/test')}
                >获取数据</Text>
                <Text style={styles.tips}
                      onPress={() => this.onSubmit('http://rap.taobao.org/mockjsdata/11793/submit',
                          {userName: '小明', password: '123456'})
                      }
                >提交数据</Text>
                <Text>返回结果：{this.state.result}</Text>
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
    }
});