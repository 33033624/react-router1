'use strict';

function twoDigits(value){
	return value < 10?
			'0' + value:
			value
}

module.exports = function(time){
	var str = twoDigits(time.hour)

	if (time.minute != null){
	 	str += ':' + twoDigits(time.minute)
	}

	if (time.second != null){
		str += ':' + twoDigits(time.second)
	}

	if (time.meridian){
		str += ' ' + time.meridian
	}

	return str
}