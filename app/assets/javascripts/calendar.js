$(document).ready(function() {
    var createEvent = function(title, start, end, allDay) {
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
    };
    
    var updateEvent = function(event) {
	var url = "/events/" + event.id;
	var data = {_method: 'PUT',
		    event: {title: event.title,
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

    var select = function(start, end, allDay) {
	var title = window.prompt("title");
	if (title) {
	    createEvent(title, start, end, allDay);
	}
	calendar.fullCalendar('unselect');
    };

    var eventClick = function(event) {
	event.title = window.prompt("title", event.title);
	updateEvent(event);
    };

    var eventResize = function(event, dayDelta, minuteDelta, revertFunc) {
	updateEvent(event);
    };

    var eventDrop = function(event, dayDelta, minuteDelta, revertFunc) {
	updateEvent(event);
    };

    var calendar = $('#calendar').fullCalendar({
	events: '/events.json',
	selectable: true,
	selectHelper: true,
	ignoreTimezone: false,
	editable: true,
	select: select,
	eventClick: eventClick,
	eventResize: eventResize,
	eventDrop: eventDrop
    });
});
