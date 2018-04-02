import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import NavigationBar from "../../../js/common/NavigationBar";
import ViewUtils from '../../util/ViewUtils'
import ArrayUtils from '../../util/ArrayUtils'
import CheckBox from 'react-native-check-box'

export default class CustomKeyPage extends Component{
    constructor(props){
        super(props);
        this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues=[];
        this.state={
            dataArray:[]
        };
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    dataArray:result
                })
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    onBack(){
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {text:'不保存',onPress:()=>{
                        this.props.navigator.pop();
                    },style:'cancel'},
                {text:'保存',onPress:()=>{this.onSave()}},
            ]
        )
    }
    onSave(){
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return;
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }
    renderView() {
        // return <Text style={{height:400,width:400}}>{JSON.stringify(this.state.dataArray)}</Text>
        if (!this.state.dataArray || this.state.dataArray.length === 0) return <Text style={{height:400,width:400}}>{JSON.stringify(this.state.dataArray)}</Text>
        let len = this.state.dataArray.length;
        // return <Text>{len}</Text>;
        let views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]):null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
            </View>
        );
        return views;

    }
    onClick(data){
        data.checked=!data.checked;
        ArrayUtils.updateArray(this.changeValues,data)
    }
    renderCheckBox(data){
        let leftText=data.name;
        return (
            <CheckBox
                style={{flex:1,padding:10}}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                isChecked={data.checked}
                checkedImage={<Image
                    style={{tintColor:'#6495ED'}}
                    source={require('../../../res/images/ic_check_box.png')}/>}
                unCheckedImage={<Image
                    style={{tintColor:'#6495ED'}}
                    source={require('../../../res/images/ic_check_box_outline_blank.png')}/>}
            />
        )
    }
    render(){
        let rightButton=<TouchableOpacity
            onPress={()=>this.onSave()}
        >
            <View style={{margin:10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>;
        return (

            <View style={styles.container}>
                <NavigationBar
                    title='自定义标签'
                    style={{backgroundColor:'#2196F3'}}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    rightButton={rightButton}
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
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
    },
    title:{
        fontSize:20,
        color:'white'
    },
    line:{
        height:0.3,
        backgroundColor:'darkgray'
    },
    item:{
        flexDirection:'row',
        alignItems:'center'
    }
});
