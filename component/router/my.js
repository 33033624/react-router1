/**
 * Created by super on 16/12/14.
 */
/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
import Header from './public/header.js';
import Tab from './public/tab.js';
import {navTo} from '../../utils.js'
class My extends Component{
    constructor(props){
        super(props)
    }

    login(){
        console.log('my_login');
        navTo.call(this,'/login')

    }
    reg(){
        navTo.call(this,'/registered')

    }
    render(){

        return (
            <div>
                <Header mytitle='我的'></Header>
                <div className='baking'>

                    <div className='myInfo'>
                        <p>
                            <span onClick={this.reg.bind(this)}>注册</span>
                            |
                            <span onClick={this.login.bind(this)}>登录</span>
                        </p>



                    </div>

                    <Tab list={[{path:'/app/my/我的收藏',contain:'我的收藏'},{path:'/app/my/购物历史',contain:'购物历史'},{path:'/app/my/浏览历史',contain:'浏览历史'},{path:'/app/my/自助退货',contain:'自助退货'},{path:'/app/my/优惠券',contain:'优惠券'},{path:'/app/my/收货地址',contain:'收货地址'},{path:'/app/my/我的钱包',contain:'我的钱包'}]}></Tab>


                    <div className='myFooter'>
                        <p>
                            Copyright © 2008-2016 lishupeng, All Rights Reserved 粤ICP备lishupeng号

                        </p>

                    </div>

                </div>



            </div>
        )
    }

}

export default My