import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import NavigationBar from '../common/NavigationBar'
import PopularPage from './PopularPage'
import Fetch from "../../Fetch";
import AsyncStorageTest from "../../AsyncStorageTest";
import MyPage from "./my/MyPage";

type Props = {};
export default class HomePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular',
        }}

    // renderButton(image){
    //     return <TouchableOpacity
    //         onPress={()=>{
    //             this.props.navigator.pop()
    //         }}
    //     >
    //         <Image style={{width:22,height:22,margin:5}} source={image}/>
    //     </TouchableOpacity>
    // }
    render() {
        return (
            <View style={styles.container}>
                {/*<Fetch/>*/}
                    {/*<NavigationBar*/}
                        {/*title={'最热'}*/}
                        {/*style={{*/}
                            {/*backgroundColor:'#EE6363'}}*/}
                        {/*statusBar={{*/}
                            {/*backgroundColor:'#EE6363'}}*/}
                        {/*leftButton={*/}
                            {/*this.renderButton(require('../../res/images/ic_arrow_back_white_36pt.png'))}*/}
                        {/*rightButton={*/}
                            {/*this.renderButton(require('../../res/images/ic_star.png'))}*/}
                    {/*/>*/}
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_popular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_popular.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                        <PopularPage/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color:'red'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_popular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_trending.png')} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                        <View style={styles.page2}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'red'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_popular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_popular.png')} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                        <View style={styles.page1}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'red'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_trending.png')} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                        <MyPage {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
                {/*<AsyncStorageTest/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F5FCFF',
    },
    page1:{
        flex:1,
        backgroundColor:'red',
    },
    page2:{
        flex:1,
        backgroundColor:'yellow',
    },
    image: {
        height: 22,
        width: 22,
    }
});