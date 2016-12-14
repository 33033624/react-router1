'use strict'

var React  = require('react')
var moment = require('moment')
var assign = require('object-assign')

var FORMAT   = require('./utils/format')
var asConfig = require('./utils/asConfig')
var onEnter  = require('./onEnter')
var toMoment = require('./toMoment')

var TODAY

function emptyFn(){}

var MonthView = React.createClass({

  displayName: 'MonthView',

  /**
   * Formats the given date in the specified format.
   * @method format
   *
   * @param  {Date/String/Moment} value
   * @param  {String} [format] If none specified, #dateFormat will be used
   *
   * @return {String}
   */

  formatAsDay: function(moment, dayDisplayFormat){
    return moment.format(dayDisplayFormat || 'D')
  },

  getDefaultProps: function() {
    return asConfig()
  },

  getWeekStartMoment: function(value){
    var weekStartDay = this.weekStartDay
    var clone = this.toMoment(value).day(weekStartDay)

    return clone
  },

  /**
   * Returns all the days in the specified month.
   *
   * @param  {Moment/Date/Number} value
   * @return {Moment[]}
   */
  getDaysInMonth: function(value){
    var first  = this.toMoment(value).startOf('month')
    var beforeFirst = this.toMoment(value).startOf('month').add(-1, 'days')
    var start  = this.getWeekStartMoment(first)
    var result = []
    var i      = 0

    if (
        beforeFirst.isBefore(start)
        // and it doen't start with a full week before and the week has at least 1 day from current month (default)
        &&
        (this.props.alwaysShowPrevWeek || !start.isSame(first))
      ){
        start.add(-1, 'weeks')
    } 

    for (; i < 42; i++){
        result.push(this.toMoment(start))
        start.add(1, 'days')
    }

    return result
  },

  render: function() {

    var props = assign({}, this.props)

    this.toMoment = function(value, dateFormat){
        return toMoment(value, dateFormat || props.dateFormat, { locale: props.locale })
    }

    TODAY = +this.toMoment().startOf('day')

    var dateFormat = props.dateFormat
    var viewMoment = props.viewMoment = this.toMoment(props.viewDate, dateFormat)

    var weekStartDay = props.weekStartDay

    if (weekStartDay == null){
        weekStartDay = props.localeData._week? props.localeData._week.dow: null
    }

    this.weekStartDay = props.weekStartDay = weekStartDay

    if (props.minDate && moment.isMoment(props.minDate)){
        props.minDate.startOf('day');
    }

    props.minDate && (props.minDate = +this.toMoment(props.minDate, dateFormat))
    props.maxDate && (props.maxDate = +this.toMoment(props.maxDate, dateFormat))

    this.monthFirst = this.toMoment(viewMoment).startOf('month')
    this.monthLast  = this.toMoment(viewMoment).endOf('month')

    if (props.date){
        props.moment = this.toMoment(props.date).startOf('day')
    }

    var daysInView = this.getDaysInMonth(viewMoment)

    return (
        <div className="dp-table dp-month-view">
            {this.renderWeekDayNames()}
            {this.renderDays(props, daysInView)}
        </div>
    )
  },

  /**
   * Render the given array of days
   * @param  {Moment[]} days
   * @return {React.DOM}
   */
  renderDays: function(props, days) {
    var nodes = days.map(function(date){
        return this.renderDay(props, date)
    }, this)

    var len        = days.length
    var buckets    = []
    var bucketsLen = Math.ceil(len / 7)

    var i = 0

    for ( ; i < bucketsLen; i++){
        buckets.push(nodes.slice(i * 7, (i + 1) * 7))
    }

    return buckets.map(function(bucket, i){
      return <div key={"row" + i} className="dp-week dp-row">{bucket}</div>
    })
  },

  renderDay: function(props, date) {
    var dayText = FORMAT.day(date, props.dayFormat)
    var classes = ["dp-cell dp-day"]

    var dateTimestamp = +date

    if (dateTimestamp == TODAY){
      classes.push('dp-current')
    } else if (dateTimestamp < this.monthFirst){
      classes.push('dp-prev')
    } else if (dateTimestamp > this.monthLast){
      classes.push('dp-next')
    }

    var beforeMinDate

    if (props.minDate && date < props.minDate){
      classes.push('dp-disabled dp-before-min')
      beforeMinDate = true
    }

    var afterMaxDate
    if (props.maxDate && date > props.maxDate){
      classes.push('dp-disabled dp-after-max')
      afterMaxDate = true
    }

    if (dateTimestamp == props.moment){
      classes.push('dp-value')
    }

    var mom = this.toMoment(date)
    var onClick = this.handleClick.bind(this, props, date, dateTimestamp)

    var renderDayProps = {
      role     : 'link',
      tabIndex : 1,
      key      : dayText,
      text     : dayText,
      date     : mom,
      moment   : mom,
      className: classes.join(' '),
      style    : {},
      onClick  : onClick,
      onKeyUp  : onEnter(onClick),
      children : dayText
    }

    if (beforeMinDate){
      renderDayProps.isDisabled = true
      renderDayProps.beforeMinDate = true
    }
    if (afterMaxDate){
      renderDayProps.isDisabled = true
      renderDayProps.afterMaxDate = true
    }

    if (typeof props.onRenderDay === 'function'){
      renderDayProps = props.onRenderDay(renderDayProps)
    }

    var defaultRenderFunction = React.DOM.div
    var renderFunction = props.renderDay || defaultRenderFunction

    var result = renderFunction(renderDayProps)

    if (result === undefined){
      result = defaultRenderFunction(renderDayProps)
    }

    return result
  },

  getWeekDayNames: function(props) {
    props = props || this.props

    var names        = props.weekDayNames
    var weekStartDay = this.weekStartDay

    if (typeof names == 'function'){
      names = names(weekStartDay, props.locale)
    } else if (Array.isArray(names)){

      names = [].concat(names)

      var index = weekStartDay

      while (index > 0){
        names.push(names.shift())
        index--
      }
    }

    return names
  },

  renderWeekDayNames: function(){
    var names = this.getWeekDayNames()

    return (
      <div className="dp-row dp-week-day-names">
        {names.map( (name, index) => <div key={index} className="dp-cell dp-week-day-name">{name}</div>)}
      </div>
    )
  },

  handleClick: function(props, date, timestamp, event) {
    if (props.minDate && timestamp < props.minDate){
      return
    }
    if (props.maxDate && timestamp > props.maxDate){
      return
    }

    event.target.value = date

    ;(props.onChange || emptyFn)(date, event)
  }
})

MonthView.getHeaderText = function(moment, props) {
  return toMoment(moment, null, {locale: props.locale}).format('MMMM YYYY')
}

export default MonthView
