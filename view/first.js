/**
 * Created by super on 16/12/14.
 */
import React,{Component} from 'react';
import {navTo} from '../util/utils.js';
const src = require('../image/jd.jpg');
const src2 = require('../image/jd2.jpg');
import {SearchList,Like,Recommended} from '../component/index';
const src3 = require('../image/recommended.jpg');
const src4 = require('../image/recommended.jpg');
const src5 = require('../image/jd3.jpg');
const src6 = require('../image/jd6.jpg');



class First extends Component{
    constructor(props){
        super(props);
        this.state={
            sea:[],
            bg: "transparent"
        }
        console.log('constructor');
    }
    submit(){
        navTo.call(this,'/app/烘焙')
    }

    componentDidMount(){
      console.log('componentDidMount');
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: 3000,
            effect : 'fade',
            pagination : '.swiper-pagination',
            loop : true,
        })

        window.onscroll = (event) => {
          console.log(111);
        			let realHeight = document.documentElement.scrollTop || document.body.scrollTop;
        			let optatic = 0.8 * (realHeight/142);
        			if(optatic <= 0.8 ) {
        				this.setState({
        					bg: `rgba(234, 44, 44, ${optatic})`,
        				})
        			}
        		}

            var body=document.getElementsByTagName('body')[0];
            body.style.background = 'white';
          }
    shouldComponentUpdate(nextProps,nextState){
      console.log('shouldComponentUpdate');
      console.log('nextProps',nextProps);
      console.log('nextState',nextState);
      return true
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
        const {sea,bg} = this.state;
        console.log(bg)

        return (
            <div style={{marginBottom:'60px'}}>

                <div className='seach_first' style={{background:bg}}>
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

                <Like  likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src6}} detailPath='/app/detail/300'></Like>
                <Like  likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src6}}  detailPath='/app/detail/300'></Like>
                <Like likeText={{text1:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text2:'￥120.9',text3:'七匹狼 男士小钱包短款 休闲两折横款头层牛皮卡包多功能皮夹 送老公生日礼物 3A1313233-02啡色',text4:'￥12.11'}} likeImg={{img1:src5,img2:src6}}  detailPath='/app/detail/300' ></Like>

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
