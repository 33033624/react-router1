/**
 * Created by super on 16/12/27.
 */
import React,{Component} from 'react';
import {Link} from'react-router';
class Tab extends Component{
    constructor(props){
        super()
    }


    componentDidMount(){

    }


    render(){
        const {list} = this.props;
         return (

             <div className='tab_box'>
                <ul className='tab_list_box'>
                    {
                        list.map(function(item){

                            return <li className='tab'>
                                        <Link to={item.path}>
                                            <span>{item.contain}</span>
                                            <span className='go'></span>
                                        </Link>


                                    </li>
                                })



                    }


                </ul>
             </div>
         )




    }
}
export default Tab;
