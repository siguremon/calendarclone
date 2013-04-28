class Event < ActiveRecord::Base
  attr_accessible :allDay, :color, :end, :start, :title
end
