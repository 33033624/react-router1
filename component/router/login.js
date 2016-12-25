/**
 * Created by lishupeng on 2016/12/25.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';

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
                        <label for="name">账号:</label><input style={styles.inp} id='name' type="text"/>

                    </div>

                   <div>
                       <label for="password">密码:</label><input style={styles.inp}  id='password' type="password"/>
                   </div>

                    <button onClick={this.login.bind(this)} style={{width:"200px",height:'40px',marginLeft:"50px",marginTop:'10px'}}>登陆</button>
                    <Link to='registered'><button  style={{width:"200px",height:'40px',marginLeft:"50px",marginTop:'10px'}}>注册</button></Link>
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
        position:'fixed',
        top:'20%',

    }



}
