/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
const style ={};


class Footer extends Component{
   constructor(props){
       super(props)
   }


  render(){
     return (
                <div className='fixed'>
                    <ul >
                        <li>
                            <Link to='/教程' activeStyle={{color:'black'}}>
                                <i className='back back1'></i>
                                <p>教程</p>
                            </Link>

                        </li>
                        <li>
                            <Link to='/烘焙' activeStyle={{color:'black'}}>
                                <i className='back back2'></i>
                                <p>烘焙圈</p>
                            </Link>

                        </li>
                        <li>
                            <Link to='/商城' activeStyle={{color:'black'}}>
                                <i className='back back3'></i>
                                <p>商城</p>
                            </Link>

                        </li>
                        <li>
                            <Link to='/我的' activeStyle={{color:'black'}}>
                                <i className='back back4'></i>
                                <p>我的</p>
                            </Link>

                        </li>

                    </ul>

                </div>

     )




  }




}
export default Footer


