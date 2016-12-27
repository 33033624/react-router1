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
                            <Link to='/app/零食' activeStyle={{color:'black'}}>
                                <i className='back back1'></i>
                                <p>零食</p>
                            </Link>

                        </li>
                        <li>
                            <Link to='/app/海购' activeStyle={{color:'black'}}>
                                <i className='back back2'></i>
                                <p>海购</p>
                            </Link>

                        </li>
                        <li>
                            <Link to='/app/美妆' activeStyle={{color:'black'}}>
                                <i className='back back3'></i>
                                <p>美妆</p>
                            </Link>

                        </li>
                        <li>
                            <Link to='/app/我的' activeStyle={{color:'black'}}>
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


