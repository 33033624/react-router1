/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import {navTo} from '../../utils.js';
const src = require('../../image/jd.jpg');
const src2 = require('../../image/jd2.jpg');
import {Recommended} from './public/recommended.js'
import {Like} from './public/like.js'
import {SearchList} from './public/seachList.js'
const src3 = require('../../image/recommended.jpg');
const src4 = require('../../image/recommended.jpg');
const src5 = require('../../image/jd3.jpg');


class First extends Component{
    constructor(props){
        super();
        this.state={
            sea:[]
        }
    }
    submit(){
        navTo.call(this,'/app/烘焙')
    }

    componentDidMount(){
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: 3000,
            effect : 'fade',
            pagination : '.swiper-pagination',
            loop : true,
        })







    }
    search() {
        /*当点击搜索按钮的时候通过ajax或者fetch向服务器发送请求*/

        this.sea = [
            '1',
            '2',
            '3'
        ]
        if (this.sea.length) {
            this.setState({
                sea:this.sea
            })


        }
    }
    render(){
        const {sea} = this.state;
        console.log(sea.length)

        return (
            <div style={{marginBottom:'220px'}}>

                <div className='seach_first'>
                    <input type="text" placeholder='请输入要搜索的内容' maxLength="10"/>
                    <span style={{width:"40px",height:"30px",position:'absolute',right:15,top:5,lineHeight:'30px',background:'lightcoral',textAlign:'center'}} onClick={this.search.bind(this)}>搜索</span>
                </div>

                    {
                        sea.length !==0 ?<SearchList searchList={sea} />:''
                    }

                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide"><img style={styles.swiper} src={src} alt=""/></div>
                        <div className="swiper-slide"><img style={styles.swiper} src={src2} alt=""/></div>
                        <div className="swiper-slide"><img style={styles.swiper} src={src} alt=""/></div>
                    </div>

                    <div className="swiper-pagination"></div>


                </div>


                <Recommended recommendText={{text1:'哈哈哈',text2:'是的话',text3:'速度和',text4:'收到'}} img={{img1:src3,img2:src4}}></Recommended>
                <Recommended recommendText={{text1:'哈哈哈',text2:'是的话',text3:'速度和',text4:'收到'}} img={{img1:src3,img2:src4}}></Recommended>
                <p style={{textAlign:"center",margin:'20px auto'}}>--------------猜你喜欢---------------</p>
                <Like likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src5}}></Like>

            </div>
        )
    }

}

const styles = {
    swiper:{
        height:'100%',
        width:'100%'
    }


}

export default First
