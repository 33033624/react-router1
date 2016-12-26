/**
 * Created by super on 16/12/26.
 */

import React,{Component} from 'react';


export class SearchList extends Component{
    constructor(props){
        super();
    }

    componentDidMount(){

    }

    render(){
        const {searchList} = this.props;
        console.log(searchList);
        return (
            <ul style={{position:"fixed",height:200,width:200,zIndex:1000,background:'green'}}>
                {
                    searchList.map(function(item){
                        return <li>{item}</li>
                    })
                }
            </ul>
        )
    }
}
