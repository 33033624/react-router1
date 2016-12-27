/**
 * Created by super on 16/12/27.
 */
import React,{Component} from 'react';
const src = require('../../image/details.jpg');



 class Detail extends Component{
    constructor(props){
        super();
        this.state = {
            source :''
        }
    }
    componentDidMount(){
       this.setState({
           source:src
       })
    }

    render(){
       const {source} = this.state;
        return (
            <div className='detail'>
                <ul className='detail_nav'>
                    <li>商品</li>
                    <li>详情</li>
                    <li>评价</li>
                </ul>
                <div className='detail_img_box'>
                    <img src={source} alt=""/>
                </div>
                <p style={{color:'#232326',fontSize:'14px',lineHeight:'20px',margin:'2px 5px'}}>
                    【超市】意大利进口 Balocco 百乐可 脆皮酥 焦糖味 200g
                </p>
                <div></div>
                <p style={{color:'#81838e',fontSize:'13px',lineHeight:'17px',margin:'11px 10px  '}}>自营进口食品  美味专享 年终劲爆促销 Happy Christmas</p>
            </div>

        )
    }
 }

export default Detail
