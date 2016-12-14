'use strict';

var update = require('parse-time').updateTime;

module.exports = function (time, name, value, config) {

	time = update(time, name, value, config);

	return time;
};