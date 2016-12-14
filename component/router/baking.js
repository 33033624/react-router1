/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
import Header from './public/header.js';
class Baking extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const href = window.href;



    }

    render(){

        return (
            <div>
                <Header mytitle='烘焙'></Header>
                <div className='baking'>
                <p className='bakingDetail'>我是烘焙页</p>
                </div>

            </div>
        )
    }

}

export default Baking