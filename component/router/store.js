/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
import Header from './public/header.js';
class Store extends Component{
    constructor(props){
        super(props)
    }
    render(){

        return (
            <div>
                <Header mytitle='商城'></Header>
                <div className='baking'>
                    <p className='storeDetail'>我是商城页</p>
                </div>

            </div>
        )
    }

}

export default Store