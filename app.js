/**
 * Created by super on 16/12/14.
 */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHistory, useBasename } from 'history'
import {Footer} from './component/index';

require('./index.css');

const ACTIVE = { color: 'red' };
const App=React.createClass({
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
});
export default App
