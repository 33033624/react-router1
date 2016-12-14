'use strict';

var React      = require('react')
var TimePicker = require('./src')

var VALUE = '03 AM'

var onChange = function(value, m, t){
	// console.log(value, m,t);
    picker.setProps({value: value})
}

var picker = React.render(
    <TimePicker
    	style={{margin: 20}}
    	format='H:m:s a'
        defaultValue={VALUE}
        onChange={onChange}
    />,
    document.getElementById('content')
)