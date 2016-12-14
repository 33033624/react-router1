'use strict';

var twoDigits     = require('./twoDigits')
var getFormatInfo = require('./getFormatInfo')

module.exports = function(name, value, formatOrInfo){

	var formatInfo = formatOrInfo

	if (!formatInfo || !formatInfo.hour || typeof formatInfo == 'string'){
		formatInfo = getFormatInfo(formatInfo)
	}

	if (!formatInfo){
		return
	}

	var info = formatInfo[name]

	if (value && name === 'meridian' && info.specified){
		return info.uppercase? value.toUpperCase(): value.toLowerCase()
	}

	return info.specified?
				info.len == 2?
					twoDigits(value):
					value
				:
				''
}