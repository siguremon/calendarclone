$(document).ready(function() {
    var select = function(start, end, allDay) {
	console.log('start:' + start);
	console.log('end:' + end);
	console.log('allDay:' + allDay);
	var title = window.prompt("title");
	var data = {event: {title: title,
			    start: start,
			    end: end, 
			    allDay: allDay}};
	$.ajax({
	    type: "POST",
	    url: "/events",
	    data: data,
	    success: function() {
		calendar.fullCalendar('refetchEvents');
	    }
	});
	calendar.fullCalendar('unselect');
    };

    var eventClick = function(event, jsEvent, view) {
	var title = window.prompt("title", event.title);
	var url = "/events/" + event.id;
	var data = {_method: 'PUT',
		    event: {title: title,
			    start: event.start,
			    end: event.end, 
			    allDay: event.allDay}};
	$.ajax({
	    type: "POST",
	    url: url,
	    data: data,
	    success: function() {
		calendar.fullCalendar('refetchEvents');
	    }
	});
    };

    var calendar = $('#calendar').fullCalendar({
	events: '/events.json',
	selectable: true,
	selectHelper: true,
	ignoreTimezone: false,
	select: select,
	eventClick: eventClick
    });
});
