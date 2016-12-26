/**
 * Created by lishupeng on 2016/12/25.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
import {navTo} from '../../utils.js'
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

    back(){
        navTo.call(this,'/login');
    }


    render(){
        return (
            <div >

               <p className='head'>
                   <span style={{position:'absolute',fontSize:"20px",color:'black',height:40,width:60,left:0,top:0}} onClick={this.back.bind(this)}>返回</span>

                   注册
               </p>
                <div style={{...styles.inp,border:'none'}}>


                </div>
                <div>
                    <label style={styles.lab} for="name">姓名:</label><input style={styles.inp} id='name' type="text"/>

                </div>

                <div>
                    <label style={styles.lab} for="name">年龄:</label><input style={styles.inp} id='name' type="text"/>

                </div>

                <div>
                    <label style={styles.lab} for="name">性别:</label><input style={styles.inp} id='name' type="text"/>

                </div>

                <div>
                    <label style={styles.lab} for="name">职业:</label><input style={styles.inp} id='name' type="text"/>

                </div>


                <div>
                    <label style={styles.lab} for="name">身份证号:</label><input style={styles.inp} id='name' type="text"/>

                </div>


                <div>
                    <label style={styles.lab} for="name">账号:</label><input style={styles.inp} id='name' type="text"/>

                </div>



                <div>
                    <label style={styles.lab} for="password">密码:</label><input style={styles.inp}  id='password' type="password"/>
                </div>

                <div>
                    <label style={styles.lab} for="password">重读密码:</label><input style={styles.inp}  id='password' type="password"/>
                </div>


                <button  onClick={this.submit.bind(this)} style={{width:"200px",height:'40px',marginLeft:"70px",marginTop:'10px',background:"green",color:'white'}}>注册</button>
            </div>
        )

    }
}
export default Registered;

var styles = {
    inp:{
        height:'30px',
        lineHeight:'30px',
        fontSize:18,
        margin:'5px 80px',
        border:'1px solid black',

    },
    lab:{
        marginTop:10,
        marginLeft:10,
        display:'block',
        width:150
    }



}
