/**
 * Created by super on 16/12/26.
 */
import React,{Component} from 'react';




export class Recommended extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    render (){
        const {recommendText,img}  = this.props;

        return (
            <div className='recommend'>
            <ul>
                <li>
                    <div className='text_box'>
                        <p className='recommend_text'>{recommendText.text1}</p>

                        <p className='recommend_tex2'>{recommendText.text2}</p>
                    </div>
                    <div className="recomended_img">
                        <img src={img.img1} alt=""/>

                    </div>
                </li>
                <li>
                    <div className='text_box'>
                        <p className='recommend_text'>{recommendText.text3}</p>

                        <p className='recommend_tex2'>{recommendText.text4}</p>
                    </div>
                    <div className='recomended_img'>
                        <img src={img.img2} alt=""/>

                    </div>

                </li>
            </ul>

        </div>
        )


    }






}