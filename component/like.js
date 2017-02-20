/**
 * Created by super on 16/12/26.
 */

import React,{Component} from 'react';
import {Link} from 'react-router';
import {navTo}  from '../util/utils.js'





export class Like extends Component{
    constructor(props){
        super()
    }








    render(){
        const {likeText,likeImg}  = this.props;
        var {detailPath} = this.props;
         detailPath = '#'+detailPath


        return (
            <div className='like'>
                <ul>
                    <li>

                        <div className="like_img">
                            <img src={likeImg.img1} alt=""/>

                        </div>
                        <p className='like_text'>{likeText.text1}</p>
                        <p className='like_tex2'>{likeText.text2}
                            <a href={detailPath}><span  className='same' >找相似</span></a>
                        </p>


                    </li>
                    <li>

                        <div className='like_img'>
                            <img src={likeImg.img2} alt=""/>

                        </div>

                        <p className='like_text'>{likeText.text3}</p>

                        <p className='like_tex2'>{likeText.text4}
                            <a href={detailPath}><span  className='same' >找相似</span></a>
                        </p>



                    </li>
                </ul>

            </div>
        )
    }
}
