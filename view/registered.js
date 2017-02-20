/**
 * Created by lishupeng on 2016/12/25.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
import {navTo} from '../util/utils.js'
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
    componentDidMount(){
       var body=document.getElementsByTagName('body')[0];
        body.style.background = 'red';

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

                <div style={{marginTop:'20px'}}>

                    <div style={{...styles.inp,border:'none'}}>


                    </div>
                    <div style={styles.inp_box}>
                        <label style={styles.lab} for="name">姓名:</label><input style={styles.inp} id='name' type="text"/>

                    </div>

                    <div style={styles.inp_box}>
                        <label style={styles.lab} for="year">年龄:</label><input style={styles.inp} id='year' type="text"/>

                    </div>

                    <div style={styles.inp_box}>
                        <label style={styles.lab} for="sex">性别:</label><input style={styles.inp} id='sex' type="text"/>

                    </div>

                    <div style={styles.inp_box}>
                        <label style={styles.lab} for="work">职业:</label><input style={styles.inp} id='work' type="text"/>

                    </div>


                    <div style={styles.inp_box}>
                        <label style={styles.lab} for="card">身份证号码:</label><input style={styles.inp} id='card' type="text"/>

                    </div>

                    <div style={styles.inp_box}>
                        <label style={styles.lab} for="username">账号:</label><input style={styles.inp} id='username' type="text"/>

                    </div>



                    <div style={styles.inp_box}>
                        <label style={styles.lab} for="password">密码:</label><input style={styles.inp}  id='password' type="password"/>
                    </div>

                    <div style={styles.inp_box}>
                        <label style={styles.lab} for="password2">重复密码:</label><input style={{...styles.inp,marginBottom:'60px'}}  id='password2' type="password"/>
                    </div>


                    <button  onClick={this.submit.bind(this)} className='btn' style={{width:'100%',position:'fixed',bottom:0}}>注册</button>



                </div>


            </div>
        )

    }
}
export default Registered;

var styles = {
    inp:{
        display:'inline-block',
        height:'30px',
        lineHeight:'30px',
        fontSize:18,
        width:'200px',
        margin:'0 auto',
        border:'1px solid black',
        position:'absolute',
        left:'50%',
        marginLeft:'-100px',
        marginTop:'40px'


    },
    lab:{
        position:'absolute',
        top:'20px',
        marginTop:0,
       textIndent:'3em',
        display:'block',

    }
    ,
    inp_box:{
        height:'20px',
        width:'300px',
        margin:'20px auto',
        position:'relative',
        marginTop:'40px'
    }



}
