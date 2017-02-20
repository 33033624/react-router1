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
        console.dir(searchList);
        return (
            <ul style={{position:"fixed",width:'100%',zIndex:1000,background:'white'}}>
                {
                    searchList.map(function(item){
                        return <li style={styles.lists}>{item}</li>
                    })
                }
            </ul>
        )
    }
}

const styles = {
    lists:{
        height:'40px',
        lineHeight:'40px',
        textIndent:'2em',
        borderBottom:'1px solid black',
        background:'lightgray',
        margin:'0 5%',
        listStyle:'none'
    }



}
