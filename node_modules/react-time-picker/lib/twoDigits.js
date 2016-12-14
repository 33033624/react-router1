'use strict';

module.exports = function twoDigits(value) {
		return value < 10 ? '0' + value : value;
};