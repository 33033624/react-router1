'use strict';

var twoDigits      = require('./twoDigits')
var getFormatInfo  = require('./getFormatInfo')
var formatFunction = require('./format')

function identity(x){
	return x
}

module.exports = function(time, format){

	var hourFormat     = twoDigits
	var minuteFormat   = twoDigits
	var secondFormat   = twoDigits
	var meridianFormat = identity

	if (format){
		var formatInfo = typeof format == 'string'? getFormatInfo(format): format

		if (formatInfo.hour.specified){
			hourFormat = function(){
				return formatFunction('hour', time.hour, formatInfo)
			}
		}

		if (formatInfo.minute.specified){
			minuteFormat = function(){
				return formatFunction('minute', time.minute, formatInfo)
			}
		}

		if (formatInfo.second.specified){
			secondFormat = function(){
				return formatFunction('second', time.second, formatInfo)
			}
		}

		if (formatInfo.meridian.specified){
			meridianFormat = function(){
				return formatFunction('meridian', time.meridian, formatInfo)
			}
		}
	}

	var result = []

	if (time.hour != null){
		result.push(hourFormat(time.hour))
	}

	if (time.minute != null){
	 	result.push(minuteFormat(time.minute))
	}

	if (time.second != null){
		result.push(secondFormat(time.second))
	}

	var str = result.join(':')

	if (time.meridian){
		str += ' ' + meridianFormat(time.meridian)
	}

	return str
}