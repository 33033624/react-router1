/**
 * Created by super on 16/12/14.
 */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHistory, useBasename } from 'history'


import App from './app.js'
import Baking from './component/router/baking.js'
import My from './component/router/my.js'
import Store from './component/router/mall.js'
import Study from './component/router/study.js'
import First from './component/router/first.js'
import Login from './component/router/login.js'
import Registered from './component/router/registered.js'
import FindPsw from './component/router/findPsw.js'
import Detail from './component/router/detail.js'



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






        {/*
    <IndexRoute component={MyNav} />
    <Route path="userCenter" component={MyUserCenter} />
    <Route path="memberClub" component={MemberClub} />
    </Route>

    <Route path="/circle" component={Circle}>
    <IndexRoute component={CircleType} />
    <Route path="tip/:tipName" component={CircleTip} />
    <Route path="say" component={CircleSay} />
    </Route>*/}

         </Route>



    </Router>
), document.getElementById('app'))

