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
import Store from './component/router/store.js'
import Study from './component/router/study.js'
import First from './component/router/first.js'


/*import Mall from './component/routers/mall/mall.js'
import Circle from './component/routers/circle/circle.js'
import CircleType from './component/routers/circle/circleType.js'
import My from './component/routers/my/my.js'
import MyNav from './component/routers/my/myNav.js'
import MyUserCenter from './component/routers/my/userCenter.js'
import MemberClub from './component/routers/my/memberClub.js'
import Index from './component/routers/index/index.js'
import Type from './component/routers/index/type.js'
import CircleTip from './component/routers/circle/circleTip.js'
import CircleSay from './component/routers/circle/circleSay.js'*/

const history = useBasename(createHistory)({
    basename: '/React-Router'
});

{/**  {this.props.children}   非常重要**/}
{/** 思考：首页也有其他分路由，怎么配**/ }
render((
    <Router>
    <Route path="/" component={App}>
        <IndexRoute component={First} />

        <Route path="/烘焙" component={Baking} />



        <Route path="/教程" component={Study}/>
        <Route path="/我的" component={My}/>
        <Route path="/商城" component={Store}/>
        <Route path="/首页" component={First}/>

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

