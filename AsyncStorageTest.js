import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage
} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
import Toast,{DURATION} from 'react-native-easy-toast'

export default class AsyncStorageTest extends Component{
    constructor(props){
        super(props);
    }
    onSave(){
        AsyncStorage.setItem('text',this.text,(error)=>{
            if(!error){
                this.toast.show('保存成功',DURATION.LENGTH_SHORT);
            }else{
                this.toast.show('保存失败',DURATION.LENGTH_SHORT);
            }
        })
    }
    onRemove(){
        AsyncStorage.removeItem('text',(error)=>{
            if(!error){
                this.toast.show('移除成功',DURATION.LENGTH_SHORT);
            }else{
                this.toast.show('移除失败',DURATION.LENGTH_SHORT);
            }
        })
    }
    onFetch(){
        AsyncStorage.getItem('text',(error,result)=>{
            if(!error){
                if(result!==''&&result!==null){
                    this.toast.show('取出的内容为：'+result);
                }else{
                    this.toast.show('取出的内容不存在');
                }
            }else{
                this.toast.show('取出失败');
            }
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='AsyncStorage的使用'
                    style={{backgroundColor:'#6495ED'}}
                />
                <TextInput style={{borderWidth:1,height:40,margin:6}}
                    onChangeText={(text)=>{
                        this.text=text;
                    }}
                />
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.tips}
                          onPress={()=>this.onSave()}
                    >保存</Text>
                    <Text style={styles.tips}
                          onPress={()=>this.onRemove()}
                    >移除</Text>
                    <Text style={styles.tips}
                          onPress={()=>this.onFetch()}
                    >取出</Text>
                </View>
                <Toast ref={toast=>this.toast=toast}/>
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