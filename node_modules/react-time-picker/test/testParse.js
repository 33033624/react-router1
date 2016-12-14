'use strict';

var parse = require('../src/parseTime')

describe('parse.strict', function(){

	it('should return as is 11:45:34 PM', function(){
		parse('11:45:34 PM', { strict: true})
			.should
			.eql({
				hour: 11,
				minute: 45,
				second: 34,
				meridian: 'PM'
			})
	})

	it('should return strict 13:85:96 PM', function(){
		parse('13:85:96 PM', { strict: true})
			.should
			.eql({
				hour: 0,
				minute: 0,
				second: 0,
				meridian: 'PM'
			})
	})

	it('should return strict 12:85:96 PM', function(){
		parse('12:85:96 PM', { strict: true})
			.should
			.eql({
				hour: 12,
				minute: 0,
				second: 0,
				meridian: 'PM'
			})
	})
})

describe('parse.notstrict', function(){

	it('should return as is 11:45:34 PM', function(){
		parse('11:45:34 PM')
			.should
			.eql({
				hour: 11,
				minute: 45,
				second: 34,
				meridian: 'PM'
			})
	})

	it('should overflow 13:85:96 PM', function(){
		parse('13:85:96 PM')
			.should
			.eql({
				hour: 2,
				minute: 26,
				second: 36,
				meridian: 'AM'
			})
	})

	it('should overflow 13:85:96 PM with overflowHourToMeridian:false', function(){
		parse('13:85:96 PM', {overflowHourToMeridian: false})
			.should
			.eql({
				hour: 2,
				minute: 26,
				second: 36,
				meridian: 'PM'
			})
	})

	it('should overflow 12:85:96 PM', function(){
		parse('12:85:96 PM')
			.should
			.eql({
				hour: 1,
				minute: 26,
				second: 36,
				meridian: 'AM'
			})
	})

	it('should overflow 12:85:96 PM with overflowHourToMeridian:false', function(){
		parse('12:85:96 PM', { overflowHourToMeridian: false })
			.should
			.eql({
				hour: 1,
				minute: 26,
				second: 36,
				meridian: 'PM'
			})
	})
})