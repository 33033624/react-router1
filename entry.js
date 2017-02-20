/**
 * Created by super on 16/12/14.
 */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHistory, useBasename } from 'history'


import App from './app.js'
import Baking from './view/baking.js'
import My from './view/my.js'
import Store from './view/mall.js'
import Study from './view/study.js'
import First from './view/first.js'
import Login from './view/login.js'
import Registered from './view/registered.js'
import FindPsw from './view/findPsw.js'
import Detail from './view/detail.js'



render((
    <Router>

       <Route path='/' component={Login}  />

            <Route path="/login" component={Login}/>
            <Route path="/registered" component={Registered}/>
            <Route path="/find_password" component={FindPsw}/>


        <Route path="/app" component={App}>
            <Route path="/app/首页" component={First}/>
            <Route path="/app/零食" component={Baking} />
            <Route path="/app/海购" component={Study}/>
            <Route path="/app/我的" component={My}/>
            <Route path="/app/美妆" component={Store}/>


            <Route path='/app/detail/:pro' component={Detail}/>

         </Route>



    </Router>
), document.getElementById('app'))
