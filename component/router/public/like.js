/**
 * Created by super on 16/12/26.
 */

import React,{Component} from 'react';




export class Like extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    render (){
        const {likeText,likeImg}  = this.props;

        return (
            <div className='like'>
                <ul>
                    <li>

                        <div className="like_img">
                            <img src={likeImg.img1} alt=""/>

                        </div>
                        <p className='like_text'>{likeText.text1}</p>

                        <p className='like_tex2'>{likeText.text2}

                        <span className='same'>找相似</span>
                        </p>


                    </li>
                    <li>

                        <div className='like_img'>
                            <img src={likeImg.img2} alt=""/>

                        </div>

                        <p className='like_text'>{likeText.text3}</p>

                        <p className='like_tex2'>{likeText.text4}
                                <span  className='same'>找相似</span>
                        </p>



                    </li>
                </ul>

            </div>
        )
    }
}