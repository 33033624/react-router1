/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import {Router,Route,IndexRoute,Link,IndexLink} from 'react-router';
import Header from './public/header.js';
import {Like} from './public/like.js';
const src = require('../../image/lingshi.jpg');
const src2 = require('../../image/jd2.jpg');
const src5 = require('../../image/jd6.jpg');
class Baking extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: 3000,
            effect : 'fade',
            pagination : '.swiper-pagination',
            loop : true,
        })


    }

    render(){

        return (
            <div>
                <Header mytitle='想吃吗？点击购买吧~~~'></Header>
                <div className='baking'>

                    <div className="swiper-container swiper-container2">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide"><img style={styles.swiper} src={src} alt=""/></div>
                            <div className="swiper-slide"><img style={styles.swiper} src={src2} alt=""/></div>
                            <div className="swiper-slide"><img style={styles.swiper} src={src} alt=""/></div>
                        </div>

                        <div className="swiper-pagination"></div>
                    </div>

                    <Like likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src5}} detailPath='/app/detail/200'></Like>
                    <Like likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src5}} detailPath='/app/detail/200'></Like>
                    <Like likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src5}} detailPath='/app/detail/200'></Like>
                    <Like likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src5}} detailPath='/app/detail/200'></Like>
                    <Like likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src5}} detailPath='/app/detail/200'></Like>

                </div>

            </div>
        )
    }

}

export default Baking

const styles = {
    swiper:{
        height:'100%',
        width:'100%'
    }


}
