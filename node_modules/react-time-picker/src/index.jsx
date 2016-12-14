'use strict'

var React     = require('react')
var assign    = require('object-assign')
var normalize = require('react-style-normalizer')
var moment    = require('moment')

var toUpperFirst = require('./toUpperFirst')

var getFormat     = require('./getFormat')
var getFormatInfo = require('./getFormatInfo')

var hasTouch = require('has-touch')

var EVENT_NAMES = require('react-event-names')

var WHITESPACE = '\u00a0'

function emptyFn(){}

var twoDigits     = require('./twoDigits')
var format        = require('./format')
var formatTime    = require('./formatTime')

function identity(v){ return v }

module.exports = React.createClass({

	displayName: 'ReactTimePicker',

	componentWillUnmount: function(){
		this.stopInterval()
	},

	getInitialState: function(){
		return {
			defaultValue: this.props.defaultValue,
			focused: {
				hour    : null,
				minute  : null,
				second  : null,
				meridian: null
			},
			overArrow: {
				hour: null,
				minute: null,
				second: null,
				meridian: null
			}
		}
	},

	getDefaultProps: function() {
		return {
			normalizeStyle: true,
			stopChangePropagation: true,
			useArrowKeys: true,

			//makes 15:78 be converted to 15:00, and not to 16:18
			strict: true,
			overflowHourToMeridian: true,

			step: 1,
			hourStep: null,
			minuteStep: null,
			secondStep: null,

			stepDelay: 60,
			showArrows: true,

			defaultStyle: {
				border: '1px solid gray',
				padding: 10,
				display: 'inline-flex',
				alignItems: 'center',
				boxSizing: 'border-box',
				flexFlow: 'row',
				width: 200
			},

			defaultArrowStyle: {
				cursor: 'pointer',
				userSelect: 'none',
				display: 'inline-block',
				alignSelf: 'stretch',
				textAlign: 'center'
			},

			defaultArrowOverStyle: {
				background: 'rgb(229, 229, 229)'
			},

			defaultArrowUpOverStyle: null,
			defaultArrowDownOverStyle: null,

			defaultArrowUpStyle: {
				marginBottom: 5
			},

			defaultArrowDownStyle: {
				marginTop: 5
			},

			defaultBoxStyle: {
				boxSizing : 'border-box',
				display   : 'flex',
				flexFlow  : 'column',
				alignItems: 'center'
			},

			defaultInputStyle: {
				boxSizing: 'border-box',
				width    : '100%',
				textAlign: 'center'
			},

			defaultSeparatorStyle: {
				flex: 'none'
			},

			defaultMeridianInputStyle: {
				cursor: 'pointer'
			},

			defaultMeridianInputProps: {
				// readOnly: true
			},

			// format: 'HHmmssa',
			renderHour: null,
			renderMinute: null,
			renderSecond: null,
			renderMeridian: null,

			defaultArrowFactory: React.DOM.span,

			arrowFactory: null,
			arrowUpFactory: null,
			arrowDownFactory: null,

			defaultInputFactory: React.DOM.input,
			inputFactory: null,

			hourInputFactory: null,
			minuteInputFactory: null,
			secondInputFactory: null,
			meridianInputFactory: null,

			timeToString: formatTime
		}
	},

	normalize: function(style) {
		return normalize(style)
	},

	render: function(){
		var props = this.prepareProps(this.props, this.state)

		if (!props.normalizeStyle){
			this.normalize = identity
		}

		var hour     = this.renderHour(props)
		var minute   = this.renderMinute(props)
		var second   = this.renderSecond(props)
		var meridian = this.renderMeridian(props)

		var separator       = props.separator || <span style={props.separatorStyle}>{WHITESPACE + ':' + WHITESPACE}</span>
		var hourSeparator   = hour && (minute || second || meridian)? props.hourSeparator || separator: null
		var minuteSeparator = minute && (second || meridian)? props.minuteSeparator || separator: null
		var secondSeparator = (second && meridian)? props.secondSeparator || separator: null


		return <div {...props}>
			{hour}
			{hourSeparator}
			{minute}
			{minuteSeparator}
			{second}
			{secondSeparator}
			{meridian}
		</div>
	},

	onArrowMouseEnter: function(props, dir, name, event) {
		var overArrow = this.state.overArrow

		Object.keys(overArrow).forEach(function(key){
			overArrow[key] = null
		})

		overArrow[name] = dir

		this.setState({})
	},

	onArrowMouseLeave: function(props, dir, name, event) {
		this.state.overArrow[name] = null

		this.setState({})
	},

	onArrowMouseDown: function(props, dir, name, event){

		event.preventDefault()

		if (name == 'meridian'){
			this.onArrowMeridianAction(props, dir, name)
			return
		}

		var target = hasTouch?
		                event.target:
		                window
		var eventName = hasTouch?
							'touchend':
							'click'

		target.addEventListener(eventName, this.onWindowClick)

		this.onArrowAction(props, dir, name)

		this.timeoutId = setTimeout(function(){
			this.startInterval(props, dir, name)
		}.bind(this), props.stepDelay)
	},

	onWindowClick: function(){
		this.stopInterval()
	},

	stopInterval: function(){
		clearTimeout(this.timeoutId)
		clearInterval(this.intervalId)
	},

	startInterval: function(props, dir, name){
		this.intervalId = setInterval(function(){
			this.onArrowAction(props, dir, name)
		}.bind(this), props.stepDelay)
	},

	onMeridianInputMouseDown: function(props, event){
		//prevent focus on mouse down on meridian input
		event.preventDefault()
		//the input can still be focused by tab navigation, we're okay with that

		this.onArrowMeridianAction(props, 1, 'meridian')
	},

	onArrowMeridianAction: function(props, dir, name){
		this.addTime('hour', dir * 12)
	},

	onArrowAction: function(props, dir, name) {

		var dirName = dir == 1? 'Up': 'Down'
		var methodName = 'onArrow' + dirName + toUpperFirst(name) + 'Action'

		if (typeof this[methodName] == 'function'){
			this[methodName](props)
		}

		methodName = 'onArrow' + toUpperFirst(name) + 'Action'

		if (typeof this[methodName] == 'function'){
			this[methodName](props, dir)
		}

		this.incValue(props, name, dir)
	},

	incValue: function(props, name, dir){

		var fieldFocused = this.state.focused[name]

		if (!fieldFocused || this.lastStateChange != name){
			dir = dir || 0

			var step     = props[name + 'Step'] || props.step
			var amount   = dir * step

			this.addTime(name, amount)

		} else {

			var value = parseInt(fieldFocused.value, 10)

			value += dir

			if (name == 'hour'){
				if (props.time.meridian == 'PM'){
					value += value < 12? 12: 0
				}
			}

			this.setTime(name, value)
		}

		this.lastStateChange = null
	},

	addTime: function(name, amount){
		this.setValue(
			moment(this.moment).add(amount, name)
		)
	},

	setTime: function(name, value){
		var clone = moment(this.moment)
		clone.set(name, value)

		this.setValue(clone)
	},

	setValue: function(moment){

		var props = this.p
		var time  = this.getTime(moment)

		var focused  = this.state.focused
		var newState = {}

		if (focused){
			Object.keys(focused).forEach(function(key){
				if (focused[key]){
					focused[key].value = this.format(props, key, time[key])
				}
			}, this)
		}

		var timeString = moment.format(props.format)

		if (this.props.value == null){
			this.setState({
				defaultValue: timeString
			})
		}

		;(this.props.onChange || emptyFn)(timeString, moment, assign({}, time))
	},

	format: function(props, name, value){
		var renderFn

		if (arguments.length < 3){
			value = props.time[name]
		}

		if (name != 'meridian'){
			renderFn = props['render' + toUpperFirst(name)]
		} else {
			renderFn = props.renderMeridian
		}

		if (!renderFn && typeof props.format == 'string'){
			var formatInfo = props.formatInfo
			renderFn = function(value, name){
				return format(name, value, formatInfo)
			}
		}

		if (!renderFn){
			renderFn = twoDigits
		}

		if (typeof renderFn == 'function'){
			value = renderFn(value, name, props)
		}

		return value
	},

	renderBox: function(props, name){
		var state = this.state
		var style      = props[name + 'Style']
		var inputStyle = props[name + 'InputStyle']
		var upperName  = toUpperFirst(name)

		var value

		if (!state.focused[name]){
			value = this.format(props, name)
		} else {
			value = state.focused[name].value
		}

		var arrowUp
		var arrowDown

		if (props.showArrows){
			var overArrow = this.state.overArrow[name]

			var arrowUpStyle = props.arrowUpStyle

			if (overArrow == 1){
				arrowUpStyle = assign({},
									props.arrowUpStyle,
									props.defaultArrowOverStyle,
									props.defaultArrowUpOverStyle,
									props.arrowOverStyle,
									props.arrowUpOverStyle
								)
			}

			var arrowUpProps = {
				mouseOver: overArrow == 1,
				style    : arrowUpStyle,
				children : '▲'
			}

			arrowUpProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, 1, name)
			arrowUpProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, 1, name)
			arrowUpProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, 1, name)

			var arrowDownStyle = props.arrowDownStyle

			if (overArrow == -1){
				arrowDownStyle = assign({},
									props.arrowDownStyle,
									props.defaultArrowOverStyle,
									props.defaultArrowDownOverStyle,
									props.arrowOverStyle,
									props.arrowDownOverStyle
								)
			}

			var arrowDownProps = {
				mouseOver: overArrow == -1,
				style    : arrowDownStyle,
				children : '▼'
			}

			arrowDownProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, -1, name)
			arrowDownProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, -1, name)
			arrowDownProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, -1, name)

			var defaultArrowFactory = props.defaultArrowFactory
			var arrowUpFactory = props.arrowUpFactory || props.arrowFactory || defaultArrowFactory
			var arrowDownFactory = props.arrowDownFactory || props.arrowFactory || defaultArrowFactory

			arrowUp = arrowUpFactory(arrowUpProps)

			if (arrowUp === undefined){
				arrowUp = defaultArrowFactory(arrowUpProps)
			}

			arrowDown = arrowDownFactory(arrowDownProps)
			if (arrowDown === undefined){
				arrowDown = defaultArrowFactory(arrowDownProps)
			}
		}

		var defaultInputFactory = props.defaultInputFactory
		var inputFactory = props[name + 'InputFactory'] || props.inputFactory || defaultInputFactory

		var defaultInputProps = props['default' + upperName + 'InputProps']
		var inputProps        = props[name + 'InputProps']

		var inputProps = assign({}, props.inputProps, defaultInputProps, inputProps, {
			timeName: name,
			style   : inputStyle,
			value   : value,
      		onBlur  : this.handleInputBlur.bind(this, props, name),
      		onChange: this.handleInputChange.bind(this, props, name),
      		onFocus : this.handleInputFocus.bind(this, props, name),
		})

		if (props.useArrowKeys){
			inputProps.onKeyDown = this.handleInputKeyDown.bind(this, props, name)
		}

		if (name == 'meridian'){
			inputProps.onMouseDown = this.onMeridianInputMouseDown.bind(this, props)
		}

		var input = inputFactory(inputProps)

		if (input === undefined){
			input = defaultInputFactory(inputProps)
		}


		return <div style={style}>
			{arrowUp}
			{input}
			{arrowDown}
		</div>
	},

	handleInputFocus: function(props, name, event){
		var focused = this.state.focused

		focused[name] = {
			value: this.format(props, name)
		}

		this.stopInterval()

		this.setState({})
	},

	handleInputBlur: function(props, name, event){

		this.incValue(props, name, 0)

		this.state.focused[name] = null
		this.setState({})
	},

	handleInputChange: function(props, name, event){
		if (this.state.focused[name]){
			this.state.focused[name].value = event.target.value
		}

		this.lastStateChange = name

		this.setState({})
		props.stopChangePropagation && event.stopPropagation()
  	},

  	/**
  	 * Called on keydown on all inputs, including meridian
  	 *
  	 * @param  {Object} props
  	 * @param  {String} name
  	 * @param  {Event} event
  	 */
  	handleInputKeyDown: function(props, name, event){

    	if (name == 'meridian'){
			var letter           = String.fromCharCode(event.keyCode)
			var isMeridianLetter = (letter == 'A' || letter == 'P')

    		if (
    			isMeridianLetter
    			||
    			(event.key == ' ')//space
    			||
    			(event.key == 'Enter')
    			||
    			(event.key == 'ArrowUp')
    			||
    			(event.key == 'ArrowDown')
    			||
    			(event.key == 'ArrowLeft')
    			||
    			(event.key == 'ArrowRight')
    		){

    			event.preventDefault()

	    		if (isMeridianLetter && (letter + 'M' == this.time.meridian)){
	    			return
	    		}

    			this.addTime('hour', 12)
    			return
    		}
    	}

		if (event.key === 'ArrowDown') {
	  		this.incValue(props, name, -1)
		}

		if (event.key === 'ArrowUp') {
	  		this.incValue(props, name, 1)
		}
  	},

  	renderHour: function(props) {
  		return this.renderBox(props, 'hour')
  	},

  	renderMinute: function(props) {
  		if (props.showMinute){
  			return this.renderBox(props, 'minute')
  		}
  	},

  	renderSecond: function(props) {
  		if (props.showSecond){
  			return this.renderBox(props, 'second')
  		}
  	},

  	renderMeridian: function(props) {
  		if (props.withMeridian){
  			return this.renderBox(props, 'meridian')
  		}
  	},

  	toMoment: function(value, format){
  		format = format || this.prepareFormat(this.props)

  		return moment(value, format)
  	},

	getTime: function(moment){

		var formatInfo = this.p.formatInfo
		var time       = {}

		if (formatInfo.hour.specified){
			time.hour = formatInfo.meridian.specified?
							moment.format('h') * 1:
							moment.hour()
		}

		if (formatInfo.minute.specified){
			time.minute = moment.minute()
		}

		if (formatInfo.second.specified){
			time.second = moment.second()
		}

		if (formatInfo.meridian.specified){
			time.meridian = moment.format('A')
		}

		return time
	},

	prepareFormat: function(props){
		var value  = props.value
		var format = props.format || getFormat(value) || 'HH:mm:ss'

		return format
	},

	prepareBoxes: function(props) {
		var formatInfo = props.formatInfo

		props.showSecond = formatInfo.second.specified
		props.showMinute = formatInfo.minute.specified
		props.withMeridian = formatInfo.meridian.specified
	},

	getValue: function() {
	    var value = this.props.value == null?
	                    this.state.defaultValue:
	                    this.props.value

	    return value
	},

	prepareProps: function(thisProps, state) {
		var props = this.p = assign({}, thisProps)

		props.value  = this.getValue()
		props.format = this.prepareFormat(props)
		props.formatInfo = getFormatInfo(props.format)

		this.moment = props.moment = this.toMoment(props.value, props.format)
		this.time   = props.time   = this.getTime(props.moment)

		this.prepareBoxes(props, state)
		this.prepareStyles(props, state)

		return props
	},

	prepareStyles: function(props, state) {

		props.style = this.prepareStyle(props, state)
		props.separatorStyle = this.prepareSeparatorStyle(props, state)
		this.prepareArrowStyles(props, state)

		this.prepareHourStyles(props, state)
		this.prepareMinuteStyles(props, state)
		this.prepareSecondStyles(props, state)
		this.prepareMeridianStyles(props, state)

	},

	prepareStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultStyle, props.style))
	},

	prepareSeparatorStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultSeparatorStyle, props.separatorStyle))
	},

	prepareArrowStyles: function(props, state) {
		props.arrowUpStyle = this.normalize(assign({}, props.defaultArrowStyle, props.defaultArrowUpStyle, props.arrowStyle, props.arrowUpStyle))
		props.arrowDownStyle = this.normalize(assign({}, props.defaultArrowStyle, props.defaultArrowDownStyle, props.arrowStyle, props.arrowDownStyle))
	},

	prepareHourStyles: function(props, state) {
		props.hourStyle = this.prepareHourStyle(props, state)
		props.hourInputStyle = this.prepareHourInputStyle(props, state)
	},

	prepareHourStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultHourStyle, props.boxStyle, props.hourStyle))
	},

	prepareHourInputStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultHourInputStyle, props.inputStyle, props.hourInputStyle))
	},

	prepareMinuteStyles: function(props, state) {
		props.minuteStyle = this.prepareMinuteStyle(props, state)
		props.minuteInputStyle = this.prepareMinuteInputStyle(props, state)
	},

	prepareMinuteStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultMinuteStyle, props.boxStyle, props.minuteStyle))
	},

	prepareMinuteInputStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultMinuteInputStyle, props.inputStyle, props.minuteInputStyle))
	},

	prepareSecondStyles: function(props, state) {
		if (props.showSecond){
			props.secondStyle = this.prepareSecondStyle(props, state)
			props.secondInputStyle = this.prepareSecondInputStyle(props, state)
		}
	},

	prepareSecondStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultSecondStyle, props.boxStyle, props.secondStyle))
	},

	prepareSecondInputStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultSecondInputStyle, props.inputStyle, props.secondInputStyle))
	},

	prepareMeridianStyles: function(props, state){
		if (props.withMeridian){
			props.meridianStyle = this.prepareMeridianStyle(props, state)
			props.meridianInputStyle = this.prepareMeridianInputStyle(props, state)
		}
	},

	prepareMeridianStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultMeridianStyle, props.boxStyle, props.meridianStyle))
	},

	prepareMeridianInputStyle: function(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultMeridianInputStyle, props.inputStyle, props.meridianInputStyle))
	}
})
