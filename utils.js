/**
 * Created by super on 16/12/26.
 */


import {hashHistory} from 'react-router'


/*
* nav使用方法
* 首先在组件中引入  然后我们使用navTo.bind(this,hash值即可完成跳转)
*
* */
export function navTo(path){
    this.props.history.replaceState(null, path);
}



