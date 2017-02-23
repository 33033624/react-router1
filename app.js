/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHistory, useBasename } from 'history'
import {Footer} from './component/index';
const ACTIVE = { color: 'red' };
<<<<<<< HEAD
require('./index.css');
const App=React.createClass({
=======
class  App extends Component{
>>>>>>> 539406260eb3c0cb75e01b28791c3e1957f640eb
    render(){
        return (

            <div >
                {/**主屏幕**/}
                <div >

                    {/**这里面的内容会被子路由给代替**/}
                    {this.props.children}

                    {/**公共页脚**/}
                    <div >
                        <Footer  />
                    </div>
                    {/**公共页脚**/}
                </div>
                {/**主屏幕**/}
            </div>
        )
    }
}
export default App
