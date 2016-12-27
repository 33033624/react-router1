/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

const src = require('../../../image/goback.png')

class Header extends Component{
    constructor(props){
        super(props);

    }



    render(){
        const {mytitle} = this.props;

        return (

            <div className='header'>
                <Goback></Goback>
                <Title title={mytitle}></Title>

            </div>
        )
    }
}



class Goback extends  Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='goback'>
                <Link to={`/app/首页`}>
                    <img src={src} alt="" style={{float:'left',margin:"8px"}}/>
                </Link>
            </div>
        )
    }
}

class Title extends  Component{
    constructor(props){
        super(props)
    }

    render(){
        const {title}= this.props;

        return (
            <div className='title'  >
                {title}
            </div>
        )
    }
}


export default Header