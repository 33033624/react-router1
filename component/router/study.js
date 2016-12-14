/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
import Header from './public/header.js';
class Study extends Component{
    constructor(props){
        super(props)
    }
    render(){

        return (
            <div>
                <Header mytitle='教程'></Header>
                <div className='baking'>
                    <p className='studyDetail'>我是教程页</p>
                </div>

            </div>
        )
    }

}

export default Study