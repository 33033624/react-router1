/**
 * Created by super on 16/12/27.
 */
import React,{Component} from 'react';




 class Detail extends Component{
    constructor(props){
        super();
        this.state = {
            source :''
        }
    }
    componentDidMount(){
        /*可以获取到对应路由的参数*/
        const pro = this.props.params.pro;
        var src = '';
        switch (pro){
            case '0':{
                src=require('../../image/details.jpg');
                break;
            }
            case '100':{
                src=require('../../image/detail2.jpg');
                break;
            }
            case '200':{
                src=require('../../image/details.jpg');
                break;
            }
            case '300':{
                src=require('../../image/detail2.jpg');
                break;
            }
                default :{

                }
        }
       this.setState({
           source:src
       })
    }
     detail_click(e){
         console.log(this);


     }



    render(){
       const {source} = this.state;
        return (
            <div className='detail'>
                <ul className='detail_nav'>
                    <li className='action_detail' onClick={this.detail_click.bind(this)}>商品</li>
                    <li onClick={this.detail_click.bind(this)}>详情</li>
                    <li onClick={this.detail_click.bind(this)}>评价</li>
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
