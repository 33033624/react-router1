/**
 * Created by lishupeng on 2016/12/25.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
import {navTo} from '../util/utils.js';
class FindPsw extends Component {

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

    componentDidMount(){
        var body=document.getElementsByTagName('body')[0];
        body.style.background = 'lightcyan';
    }



    render(){
        return (
            <div >

                <p className='head'>
                    <span style={{position:'absolute',fontSize:"20px",color:'black',height:40,width:60,left:0,top:0}} onClick={this.back.bind(this)}>返回</span>

                    找回密码</p>
                <div style={{...styles.inp,border:'none',marginTop:"10%"}} >


                </div>
                <div style={styles.inp_box}>
                    <label style={styles.lab} for="phone">手机号码:</label><input style={styles.inp} id='phone' type="text"/>

                </div>

                <div style={styles.inp_box}>
                    <label style={styles.lab} for="x_code">验证码:</label><input style={styles.inp} id='x_code' type="text"/>

                </div>

                <div style={styles.inp_box}>
                    <label style={styles.lab} for="newpsw">新密码:</label><input style={styles.inp} id='newpsw' type="text"/>

                </div>

                <div style={styles.inp_box}>
                    <label style={{...styles.lab,marginBottom:'60px'}} for="newpsw2">重复密码:</label><input style={styles.inp} id='newpsw2' type="text"/>

                </div>

                <button style={{marginTop:'80px'}} onClick={this.submit.bind(this)} className='btn'>确定提交</button>
            </div>
        )

    }
}
export default FindPsw;


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
