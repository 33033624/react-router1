'use strict';

var parseTime      = require('parse-time')
var adjustOverflow = parseTime.adjustOverflow

var defaults = {}

function onInvalid(timeValue, config){

	timeValue.invalid.forEach(function(info){

		var name  = info.name
		var value = info.value * 1

		if (!isNaN(value)){
			timeValue[name] = value
		}
	})

	return adjustOverflow(timeValue, config)
}

module.exports = function(value, config){

	config = config || defaults

	value = value || ''

	if (typeof value == 'string'){
		value = parseTime(value, config)
	}

	var definedParts = {}

	if (value){

		config.withMeridian = value.meridian != null

		if (value.invalid){
			value.invalid.forEach(function(info){
				definedParts[info.name] = true
			})
		}

		if (!config.strict && value.invalid){
			value = onInvalid(value, config)
		}

		if (definedParts.hour){
			value.hour = value.hour || 0
		}

		if (definedParts.minute){
			value.minute = value.minute || 0
		}

		if (definedParts.second){
			value.second = value.second || 0
		}

		// value.hour   = value.hour || 0
		// value.minute = value.minute || 0
		// value.second = value.second || 0

		// if (config.strict && value.meridian && value.hour === 12){
		// 	if (value.minute !== undefined){
		// 		value.minute = 0
		// 	}
		// 	if (value.second !== undefined){
		// 		value.second = 0
		// 	}
		// }
	}

	var result = {
		hour  : value.hour
	}
	if (value.minute !== undefined){
		result.minute = value.minute
	}
	if (value.second !== undefined){
		result.second = value.second
	}

	if (config.withMeridian){
		result.meridian = value.meridian
	}

	return result
}