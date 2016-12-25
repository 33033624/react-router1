/**
 * Created by lishupeng on 2016/12/25.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';

class Registered extends Component {

    constructor(props)
    {
        super(props);
    }

    submit(){

        /*进行路由判断  如果成功就弹出注册成功请登录  */
        alert('注册成功，请登陆');
        this.props.history.replaceState(null, '/login');

        
    }


    render(){
        return (
            <div >


                <div>
                    <label for="name">姓名:</label><input style={styles.inp} id='name' type="text"/>

                </div>

                <div>
                    <label for="name">年龄:</label><input style={styles.inp} id='name' type="text"/>

                </div>

                <div>
                    <label for="name">性别:</label><input style={styles.inp} id='name' type="text"/>

                </div>

                <div>
                    <label for="name">职业:</label><input style={styles.inp} id='name' type="text"/>

                </div>


                <div>
                    <label for="name">身份证号:</label><input style={styles.inp} id='name' type="text"/>

                </div>


                <div>
                    <label for="name">账号:</label><input style={styles.inp} id='name' type="text"/>

                </div>



                <div>
                    <label for="password">密码:</label><input style={styles.inp}  id='password' type="password"/>
                </div>

                <div>
                    <label for="password">重读密码:</label><input style={styles.inp}  id='password' type="password"/>
                </div>


                <button onClick={this.submit.bind(this)} style={{width:"200px",height:'40px',marginLeft:"50px",marginTop:'10px'}}>注册</button>
            </div>
        )

    }
}
export default Registered;

var styles = {
    inp:{
        height:'40px',
        lineHeight:'40px',
        fontSize:20,
        marginTop:20,
        border:'1px solid black',
    },



}
