import React, {Component} from 'react';
import {
    AsyncStorage,
} from 'react-native'
import keys from '../../../res/data/keyData';

export var FLAG_LANGUAGE={flag_language:'flag_language_language',flag_key:'flag_language_key'};
export default class LanguageDao{
    constructor(flag){
        this.flag=flag;
    }
    fetch(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error);
                }else{
                    if(result){
                        try{
                            resolve(JSON.parse(result));
                        }catch (e){
                            reject(error);
                        }
                    }else{
                        let data=this.flag===FLAG_LANGUAGE.flag_key?keys:null;
                        this.save(data);
                        resolve(data);
                    }
                }
            })
        })
    }
    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{

        })
    }
}