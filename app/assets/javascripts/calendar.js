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
		calendar.fullCalendar("refetchEvents");
	    }
	});
    };
    
    var updateEvent = function(event, revertFunc) {
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
		calendar.fullCalendar("refetchEvents");
	    },
	    error: revertFunc
	});
    };

    var deleteEvent = function(event) {
	var url = "/events/" + event.id;
	var data = {_method: 'DELETE'};
	$.ajax({
	    type: "POST",
	    url: url,
	    data: data,
	    success: function() {
		calendar.fullCalendar('refetchEvents');
	    },
	});
    };

    var select = function(start, end, allDay) {
	createDialog.find("#title").val("");
	createDialog.dialog("option", "buttons",
			    [{text: "OK",
			      click: function() {
				  var title = createDialog.find("#title").val();
				  if (title) {
				      createEvent(title, start, end, allDay);
				  }
				  createDialog.dialog("close");
			      }
			     },
			     {text: "Cancel", 
			      click: function() {
				  updateDialog.dialog("close");
			      }
			     }]);
	createDialog.dialog("open");
	calendar.fullCalendar("unselect");
    };

    var eventClick = function(event) {
	updateDialog.find("#title").val(event.title);
	updateDialog.dialog("option", "buttons", 
			    [{text: "OK", 
			      click: function() {
				  event.title = updateDialog.find("#title").val();
				  updateEvent(event, function(){});
				  updateDialog.dialog("close");
			      }
			     },
			     {text: "Delete", 
			      click: function() {
				  deleteEvent(event);
				  updateDialog.dialog("close");
			      }
			     },
			     {text: "Cancel", 
			      click: function() {
				  updateDialog.dialog("close");
			      }
			     }
			]);
	updateDialog.dialog("open");
    };

    var eventResize = function(event, dayDelta, minuteDelta, revertFunc) {
	updateEvent(event, revertFunc);
    };

    var eventDrop = function(event, dayDelta, minuteDelta, revertFunc) {
	updateEvent(event, revertFunc);
    };

    var calendar = $("#calendar").fullCalendar({
	events: "/events.json",
	selectable: true,
	selectHelper: true,
	ignoreTimezone: false,
	editable: true,
	select: select,
	eventClick: eventClick,
	eventResize: eventResize,
	eventDrop: eventDrop,
	timeFormat: {
	    agenda: "hh:mm{ - hh:mm}",
	    "": "HH:mm"
	},
	axisFormat: "HH:mm",
	header: {
	    left: 'prev,next today',
	    center: 'title',
	    right: 'month,agendaWeek,agendaDay'
	}
    });

    var createDialog = $("#eventdialog").dialog({
	autoOpen: false,
	modal: true,
	title: "Create Event"
    });

    var updateDialog = $("#eventdialog").dialog({
	autoOpen: false,
	modal: true,
	title: "Edit Event"
    });

});
