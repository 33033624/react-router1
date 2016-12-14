'use strict';

var moment = require('moment');
var React      = require('react/addons')
var TestUtils  = React.addons.TestUtils
var DatePicker = React.createFactory(require('../lib'))

var VALUE_CLASS = 'dp-value'

function render(node){
    return TestUtils.renderIntoDocument(node)
}

function findWithClass(root, cls){
    return TestUtils.findRenderedDOMComponentWithClass(root, cls)
}

function tryWithClass(root, cls){
    return TestUtils.scryRenderedDOMComponentsWithClass(root, cls)
}

describe('DatePicker', function(){

	it('renders selected date - also make sure no crash on null date', function(){

        require('./testdom')()

		var picker = render(
			DatePicker({
				date: '2014-04-03'
			})
		)

		var dateCell = findWithClass(picker, VALUE_CLASS)

		dateCell.getDOMNode()
            .textContent
            .should.equal('3')

        picker.setProps({
            date: '2014-04-20',
        })

        dateCell = findWithClass(picker, VALUE_CLASS)

        dateCell.getDOMNode()
            .textContent
            .should.equal('20')

        picker.setProps({
            date: null
        })

        tryWithClass(picker, VALUE_CLASS)
            .length
            .should
            .equal(0)

	})

    it('render defaultDate and make sure click on date works', function(){
        var picker = render(DatePicker({defaultDate: '2014-03-25'}))

        findWithClass(picker, VALUE_CLASS)
            .getDOMNode()
            .textContent
                .should
                .equal('25')


        var arr = TestUtils.findAllInRenderedTree(picker, function(cmp){
            return cmp.getDOMNode().textContent == '15'
        })

        arr.length
            .should
            .equal(1)


        TestUtils.Simulate.click(arr[0])

        findWithClass(picker, VALUE_CLASS)
            .getDOMNode()
            .textContent
            .should.equal('15')

    })

    it('weekDayNames should be rendered correctly, even if there are two identical labels', function(){
        var weekDayNames = ['S','M','T','W','T','F','S']
        var picker = render(DatePicker({
            defaultDate : '2014-03-25',
            weekDayNames: weekDayNames
        }))

        findWithClass(picker, 'dp-week-day-names')
            .getDOMNode()
            .textContent
                .should
                .equal(weekDayNames.join(''))

    })

    it('minDate should be correct when passed as moment instance - #41', function(){
        var minDate = moment('2015-07-15').add(1,'h');

        var picker = render(DatePicker({
            defaultDate: '2015-07-15',
            minDate: minDate
        }))

        var beforeDates = tryWithClass(picker, 'dp-before-min');
        var lastCell = beforeDates[beforeDates.length - 1];

        lastCell.getDOMNode()
            .textContent
            .should
            .equal('14')
    })

})