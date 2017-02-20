/**
 * Created by lishupeng on 2016/12/25.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';

import src from '../image/logo.jpg'

class Login extends Component {

    constructor(props)
    {
        super(props);
    }

    login(){
        /*可以进行ajax的调取 然后判断是否跳转*/
        this.props.history.replaceState(null, '/app/首页');

    }


    render(){
        return (
                <div style={styles.top}>
                    <div>

                       <h1 style={{textIndent: '-9000em'}}>
                       美策
                           <span className='logo'></span>

                       </h1>
                        <div style={{paddingTop:"10%",width:300,margin:"0 auto"}}>
                            <label for="name">账号:</label><input style={styles.inp} id='name' type="text"/>

                        </div>

                        <div style={{width:300,margin:"0 auto"}}>
                            <label for="password">密码:</label><input style={styles.inp}  id='password' type="password"/>
                            <div><a href='#/find_password' style={{color:'blue',fontSize:'12px',marginLeft:'35px'}}>忘记密码</a></div>
                        </div>


                    </div>


                    <button onClick={this.login.bind(this)} className='btn' style={{marginTop:40}}>登陆</button>
                    <Link to='registered'><button className='btn'   >注册</button></Link>
                </div>
        )

    }
}
export default Login;

var styles = {
    inp:{
        height:'40px',
        lineHeight:'40px',
        fontSize:20,
        marginTop:20,
        border:'1px solid black',
    },
    top:{
        width:'100%',
        height:'100%',
        background:'lightskyblue'
    }



}
