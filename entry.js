/**
 * Created by super on 16/12/14.
 */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHistory, useBasename } from 'history'
import {Baking,My,Store,Study,First,Login,Registered,FindPsw,Detail} from './view/index.js'
import App from './app.js'

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
