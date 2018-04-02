import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    RefreshControl,
    ListView,
    ToastAndroid,
    DeviceEventEmitter
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import DataRespository from '../expand/dao/DataRespository'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao'

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';

export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.dataResponsitory=new DataRespository();
        this.state={
            result: '',
            languages:[]
        };
        this.loadLanguage();
    }
    loadLanguage() {
        this.languageDao.fetch().then((languages)=> {
            if (languages) {
                this.setState({
                    languages: languages,
                });
            }
        }).catch((error)=> {
        });
    }
    render(){
        let content=this.state.languages.length>0?
            <ScrollableTabView
                tabBarBackgroundColor='#2196F3'
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2.5}}
                renderTabBar={()=><ScrollableTabBar/>}
            >
                {this.state.languages.map((result, i, arr)=>{
                    let lan=arr[i];
                    return lan.checked?<PopularTab key={i} tabLabel={lan.name}{...this.props}/>:null;
                })}
            </ScrollableTabView>:null;
        return <View style={styles.container}>
            <NavigationBar
                title='Popular'
                style={{
                backgroundColor:'#2196F3'
                }}
                statusBar={{
                backgroundColor:'#2196F3'
                }}
            />
            {content}
        </View>
    }
}
class PopularTab extends Component{
    constructor(props){
        super(props);
        this.dataResponsitory=new DataRespository();
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:false
        }
    }
    loadData(){
        this.setState({
            isLoading:true
        });
        let url=this.genUrl(this.props.tabLabel);
        this.dataResponsitory
            .fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isLoading: false
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error),
                    isLoading: false
                })
            })
    }
    componentDidMount() {
        this.loadData();
    }
    genUrl(key){
        return URL + key + QUERY_STR;
    }
    renderRow(data){
        return <RepositoryCell data={data}/>
    }
    render(){
        return <View style={{flex:1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={<RefreshControl
                    refreshing={this.state.isLoading}
                    onFresh={()=>this.loadData()}
                    colors={['#2196F3']}
                    tintColor={'#2196F3'}
                    title={'Loading...'}
                    titleColor={'#2196F3'}
                />}
            />
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